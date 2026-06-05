import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const productUrl = "http://127.0.0.1:8000/api/product/" + id + "/";
  const reviewsUrl = `http://127.0.0.1:8000/api/reviews/?product_id=${id}`;

  const { wishlistItems, toggleWishlist, userProfile, addToCart, setGlobalLoading } = useContext(AuthContext);

  let [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [ratingStart, setRatingStart] = useState("5.0");
  const [quantity, setQuantity] = useState(1);

  // VARIANT MANAGEMENT STATES
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null);   
  const [currentVariant, setCurrentVariant] = useState(null);

  // 🆕 DYNAMIC LOCAL TIMER OVERLAY OBJECT STATE
  const [detailTimer, setDetailTimer] = useState("00:00:00");

  // 📦 1. Core Product Details Extraction
  const getProductDetails = async () => {
    setGlobalLoading(true); // Global dynamic glass filter loader on
    try {
      let response = await fetch(productUrl);
      response = await response.json();

      setProduct(response);

      const primaryImgObj = response?.images?.find((img) => img.is_primary);
      const fallbackImgUrl = response?.images?.[0]?.image_url || response?.images?.[0]?.image;
      const finalUrl = primaryImgObj?.image_url || primaryImgObj?.image || fallbackImgUrl;

      if (finalUrl) {
        setActiveImage(finalUrl);
      }

      if (response?.variants && response.variants.length > 0) {
        const firstVariant = response.variants[0];
        if (firstVariant.color_details) setSelectedColor(firstVariant.color_details);
        if (firstVariant.size_details) setSelectedSize(firstVariant.size_details);
        setCurrentVariant(firstVariant);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGlobalLoading(false);
    }
  };

  // Dynamic Reviews Filtering API Fetch
  const getProductReviews = async () => {
    try {
      const response = await fetch(reviewsUrl);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  // VARIANT LIVE MATRIX COMBINATION MATCHER LOGIC EFFECT
  useEffect(() => {
    if (product?.variants) {
      const matched = product.variants.find((v) => {
        const colorMatch = !selectedColor || v.color_details?.id === selectedColor.id;
        const sizeMatch = !selectedSize || v.size_details?.id === selectedSize.id;
        return colorMatch && sizeMatch;
      });
      setCurrentVariant(matched || null);
    }
  }, [selectedColor, selectedSize, product]);

  // 3. Submit Review Form Handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please log in to write a review!");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Review text message cannot be empty!");
      return;
    }

    setGlobalLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: id,
          rating_start: parseFloat(ratingStart),
          review_text: reviewText,
        }),
      });
      
      if (response.ok) {
        toast.success("Review posted successfully! ⭐");
        setReviewText(""); 
        setRatingStart("5.0"); 
        await getProductReviews(); 
      } else {
        toast.error("Something went wrong while posting your review.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed.");
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
    getProductReviews(); 
  }, [id]);

  // LIVE BACKEND TICKING ENGINE FOR SINGLE PRODUCT DISCOUNT TIMES
  useEffect(() => {
    if (!product?.active_offer || !product?.active_offer?.is_valid) return;

    const targetEndTime = new Date(product.active_offer.end_time).getTime();

    const ticker = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetEndTime - now;

      if (diff <= 0) {
        clearInterval(ticker);
        setDetailTimer("Expired");
        getProductDetails(); // Auto re-sync details block once countdown ticks off
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const daysStr = d > 0 ? `${d}d ` : "";
        setDetailTimer(`${daysStr}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} left`);
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, [product]);

  const [activeTab, setActiveTab] = useState("description");
  const isFavorite = wishlistItems?.some(item => item.product === product?.id);

  // EXTRACTING UNIQUE AVAILABLE COLORS & SIZES FOR THE SELECTION UI
  const availableVariants = product?.variants || [];
  
  const uniqueColors = Array.from(
    new Map(availableVariants.filter(v => v.color_details).map(v => [v.color_details.id, v.color_details])).values()
  );
  
  const uniqueSizes = Array.from(
    new Map(availableVariants.filter(v => v.size_details).map(v => [v.size_details.id, v.size_details])).values()
  );

  
  const hasOffer = product?.active_offer && product?.active_offer?.is_valid;
  
  // Base core calculations math
  const originalBasePrice = currentVariant?.variant_price ? currentVariant.variant_price : product?.price;
  
  const finalCalculatedPrice = hasOffer 
    ? (currentVariant?.variant_price 
        ? roundPrice(currentVariant.variant_price - (currentVariant.variant_price * product.active_offer.discount_percentage / 100))
        : product.discounted_price)
    : originalBasePrice;

  const displayOldPrice = hasOffer ? originalBasePrice : product?.old_price;
  const displayStock = currentVariant ? currentVariant.variant_stock : product?.stock_quantity;

  function roundPrice(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  return (
    <>
      <section className="w-100 pb-5" style={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: "'Poppins', sans-serif" }}>
        
        {/* 1. BREADCRUMB HEADER SECTION  */}
        <div className="py-4 border-bottom" style={{ backgroundColor: "#F8FAFC" }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: "#0F2C59", fontSize: "28px" }}>Product Details</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: "15px" }}>
                <li className="breadcrumb-item"><Link to="/" className="text-success text-decoration-none fw-medium" style={{ color: "#0AA586" }}>Home</Link></li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Product Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* 2. CORE BUYING CONTROLS FRAMEWORK */}
        <div className="container px-md-5 mt-5">
          <div className="row g-5">
            
            {/* LEFT ROW: Gallery Multi-Image Panel */}
            <div className="col-12 col-lg-6">
              <div className="card border rounded-3 overflow-hidden bg-light position-relative p-4 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "480px" }}>
                {/* 🎯 PROMO SPECIAL PERCENTAGE BADGES TOGGLE */}
                {hasOffer ? (
                  <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-3 py-2 fw-bold text-white bg-danger animate-pulse" style={{ fontSize: "13px", zIndex: 10 }}>
                    {product.active_offer.discount_percentage}% OFF
                  </span>
                ) : product?.badge_tag && product.badge_tag !== 'NONE' && (
                  <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-3 py-2 fw-bold text-white bg-danger" style={{ fontSize: "12px", zIndex: 10 }}>
                    {product.badge_tag}
                  </span>
                )}

                <img
                  src={activeImage || "https://placeholder.com/600x480"}
                  alt={product?.title || "Product presentation"}
                  className="img-fluid object-contain"
                  style={{ maxHeight: "420px", mixBlendMode: "multiply" }}
                />
              </div>

              {/* Dynamic Action Trigger Switcher Thumbnails */}
              <div className="d-flex gap-2 mt-3 justify-content-start overflow-auto pb-2">
                {product?.images?.map((img, index) => {
                  const currentImgUrl = img.image_url || img.image;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveImage(currentImgUrl)}
                      className="card p-1 bg-light rounded-2 border-2"
                      style={{
                        width: "85px",
                        height: "85px",
                        borderColor: activeImage === currentImgUrl ? "#0AA586" : "#E2E8F0",
                        cursor: "pointer",
                      }}
                    >
                      <img src={currentImgUrl} alt="Thumbnail" className="w-100 h-100" style={{ objectFit: "contain" }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT ROW: Pricing, Options & Specs Column */}
            <div className="col-12 col-lg-6">
              <div>
                <span className="badge rounded-pill px-3 py-2 fw-bold mb-3" style={{ backgroundColor: "#E2F2EE", color: "#0AA586", fontSize: "12px" }}>
                  {product?.category_name || "E-Commerce Item"}
                </span>
                
                {product?.brand_details && (
                  <span className="badge rounded-pill border px-3 py-2 fw-bold mb-3 ms-2 text-secondary bg-white">
                    Brand: {product.brand_details.name}
                  </span>
                )}

                <span className={`small fw-bold float-end d-flex align-items-center gap-1.5 ${displayStock > 0 ? "text-success" : "text-danger"}`} style={{ fontSize: "14px" }}>
                  <span className="rounded-circle d-inline-block" style={{ width: "8px", height: "8px", backgroundColor: displayStock > 0 ? "#198754" : "#dc3545" }}></span> 
                  {displayStock > 0 ? "In Stock" : "Out of Stock"}
                </span>

                <h1 className="fw-bold mb-3 text-dark lh-base" style={{ fontSize: "28px", color: "#0F2C59" }}>
                  {product?.title}
                </h1>

                {/* Rating Layer */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="text-warning small d-flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <span className="text-dark fw-bold small">5.0</span>
                  <span className="text-muted small border-start ps-2">{reviews.length} reviews</span>
                  <span className="text-danger small fw-bold border-start ps-2">{displayStock} quantities remaining</span>
                </div>

                {/* OFFER COUNTDOWN TIMING ROW STRIP BANNER */}
                {hasOffer && (
                  <div className="w-100 rounded-3 p-2 mb-3 d-flex align-items-center gap-5 border border-danger border-opacity-25" style={{ background: "linear-gradient(90deg, #fff3f3 0%, #ffebeb 100%)" }}>
                    <span className="badge bg-danger text-white px-2 py-1 fw-bold text-uppercase d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                      <i className="bi bi-lightning-fill"></i> {product.active_offer.title}
                    </span>
                    <span className="text-dark small fw-bold d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                      Ends In: <strong className="text-danger font-monospace fs-6 ms-0.5">{detailTimer}</strong>
                    </span>
                  </div>
                )}

                {/* Pricing Block Card */}
                <div className="card border-0 rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between flex-row flex-wrap gap-3" style={{ backgroundColor: "#F8FAFC" }}>
                  <div className="d-flex align-items-baseline gap-2">
                    {/* Switch layout styling based on active deal rules */}
                    <span className={`fw-extrabold h2 mb-0 ${hasOffer ? 'text-danger' : 'text-dark'}`} style={{ color: hasOffer ? "#dc3545" : "#0F2C59" }}>
                      ${finalCalculatedPrice}
                    </span>
                    {displayOldPrice && (
                      <span className="text-muted text-decoration-line-through text-md">
                        ${displayOldPrice}
                      </span>
                    )}
                  </div>
                  {displayOldPrice && (
                    <span className="badge border px-2.5 py-1.5 text-success fw-bold font-normal" style={{ backgroundColor: "#E2F2EE", borderColor: "#C6E7E1", fontSize: "12px" }}>
                      Save ${parseFloat(displayOldPrice - finalCalculatedPrice).toFixed(2)}
                    </span>
                  )}    
                </div>

                <p className="text-secondary small lh-base mb-4" style={{ fontSize: "14.5px" }}>
                  {product?.description}
                </p>

                {/* ==================== 🎨 DYNAMIC DUAL VARIANT INTERFACE ==================== */}
                
                {/* 1. Dynamic Color Swatch Picker Frame */}
                {uniqueColors.length > 0 && (
                  <div className="mb-4">
                    <div className="text-dark fw-bold small mb-2">
                      Color — <span className="text-muted fw-semibold">{selectedColor?.name || "Choose color"}</span>
                    </div>
                    <div className="d-flex gap-2">
                      {uniqueColors.map((colorObj) => (
                        <button
                          key={colorObj.id}
                          type="button"
                          onClick={() => setSelectedColor(colorObj)}
                          className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: colorObj.hex_code,
                            outline: selectedColor?.id === colorObj.id ? "3px solid #0AA586" : "1px solid #cbd5e1",
                            outlineOffset: "2px",
                            transition: "all 0.2s ease"
                          }}
                          title={colorObj.name}
                        >
                          {selectedColor?.id === colorObj.id && (
                            <i className="bi bi-check text-white fs-5 fw-bold" style={{ mixBlendMode: 'difference' }}></i>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Dynamic Size Badge Picker Frame */}
                {uniqueSizes.length > 0 && (
                  <div className="mb-4">
                    <div className="text-dark fw-bold small mb-2">
                      Size — <span className="text-muted fw-semibold">{selectedSize?.name || "Select Size"}</span>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {uniqueSizes.map((sizeObj) => (
                        <button
                          key={sizeObj.id}
                          type="button"
                          onClick={() => setSelectedSize(sizeObj)}
                          className="btn btn-sm px-3 py-1.5 fw-bold border rounded-2"
                          style={{
                            backgroundColor: selectedSize?.id === sizeObj.id ? "#0AA586" : "#FFFFFF",
                            color: selectedSize?.id === sizeObj.id ? "#FFFFFF" : "#4A5568",
                            borderColor: selectedSize?.id === sizeObj.id ? "#0AA586" : "#E2E8F0",
                            fontSize: "13px",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {sizeObj.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}

                {/* Actions Button Matrix */}
                <div className="row g-2 mb-4 align-items-center">
                  <div className="col-4 col-sm-3">
                    <div className="input-group border rounded-2 bg-white" style={{ height: "44px" }}>
                      <button className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                      <span className="form-control text-center bg-transparent border-0 d-flex align-items-center justify-content-center fw-bold p-0">{quantity}</span>
                      <button className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="col-8 col-sm-7">
                    <button 
                      className="btn btn-success w-100 text-white fw-bold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm" 
                      style={{ backgroundColor: "#0AA586", height: "44px", borderRadius: "6px" }}
                      onClick={() => product && addToCart(product.id, quantity)}
                      disabled={displayStock <= 0} 
                    >
                      <i className="bi bi-bag-plus"></i> {displayStock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                  <div className="col-12 col-sm-2 text-center text-sm-start">
                    <button onClick={() => toggleWishlist(product?.id)} className="btn border bg-white rounded-2 d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: "44px", height: "44px" }} title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}>
                      <i className={`bi bi-heart-fill ${isFavorite ? 'text-danger' : 'text-secondary'}`}></i>
                    </button>
                  </div>
                </div>

                <button className="btn btn-light bg-transparent border w-100 text-secondary py-2.5 fw-bold mb-4 d-flex align-items-center justify-content-center gap-1.5" style={{ borderRadius: "6px", fontSize: "14px" }}>
                  <i className="bi bi-lightning-charge"></i> Purchase Instantly
                </button>

                {/* Micro Guarantee Value Grid Props */}
                <div className="row g-2 border-top pt-4 text-muted" style={{ fontSize: "13px" }}>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-truck text-success fs-5"></i> Free shipping $75+</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-arrow-counterclockwise text-success fs-5"></i> 45-day returns</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-shield-check text-success fs-5"></i> 3-year warranty</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-headset text-success fs-5"></i> 24/7 support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DESCRIPTIONS & SPECIFICATIONS TAB PANELS */}
        <div className="container px-md-5 mt-5 pt-4">
          <div className="card border rounded-3 bg-white shadow-sm overflow-hidden">
            <div className="d-flex bg-light border-bottom text-muted fw-bold" style={{ fontSize: "15px" }}>
              <span onClick={() => setActiveTab("description")} className={`px-4 py-3 cursor-pointer ${activeTab === "description" ? "bg-white text-success border-bottom border-3 border-success" : ""}`} style={{ cursor: "pointer", color: activeTab === "description" ? "#0AA586" : "inherit" }}>Description</span>
              <span onClick={() => setActiveTab("specifications")} className={`px-4 py-3 cursor-pointer ${activeTab === "specifications" ? "bg-white text-success border-bottom border-3 border-success" : ""}`} style={{ cursor: "pointer", color: activeTab === "specifications" ? "#0AA586" : "inherit" }}>Specifications</span>
            </div>
            <div className="p-4 p-md-5">
              {activeTab === "description" && (
                <div className="row g-4 justify-content-between">
                  <div className="col-12 col-lg-7">
                    <h4 className="fw-bold mb-3" style={{ color: "#0F2C59" }}>About This Product</h4>
                    <p className="text-secondary small lh-base mb-4">{product?.description}</p>
                  </div>
                </div>
              )}
              {activeTab === "specifications" && (
                <div>
                  {product?.specifications?.length ? <h4 className="fw-bold mb-4" style={{ color: "#0F2C59" }}>Technical Specifications Information</h4> : <h5>No Information</h5>}
                  <table className="table table-striped table-bordered small">
                    <tbody>
                      {product?.specifications?.map((item, index) => (
                        <tr key={index}>
                          <td className="fw-bold w-25">{item.key_name}</td>
                          <td>{item.value_text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. LIVE REVIEWS & FEEDBACK WORKSPACE SECTION */}
        <div className="py-5 mt-5 border-top" style={{ backgroundColor: "#F8FAFC" }}>
          <div className="container px-md-5 py-2">
            <div className="row g-4">
              
              {/* LEFT FORM COLUMN */}
              <div className="col-12 col-md-5">
                {userProfile ? (
                  <div className="card p-4 border border-light shadow-sm rounded-3 bg-white">
                    <h4 className="fw-bold mb-3" style={{ color: "#0F2C59" }}>Write a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Your Rating Score</label>
                        <select 
                          className="form-select shadow-none bg-light fw-medium text-secondary" 
                          value={ratingStart} 
                          onChange={(e) => setRatingStart(e.target.value)}
                        >
                          <option value="5.0">⭐⭐⭐⭐⭐ (5.0)</option>
                          <option value="4.0">⭐⭐⭐⭐ (4.0)</option>
                          <option value="3.0">⭐⭐⭐ (3.0)</option>
                          <option value="2.0">⭐⭐ (2.0)</option>
                          <option value="1.0">⭐ (1.0)</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Review Message</label>
                        <textarea 
                          className="form-control shadow-none bg-light small fw-medium" 
                          rows="4" 
                          placeholder="Share your technical or quality details experience..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn text-white fw-bold w-100 border-0 shadow-sm py-2" style={{ backgroundColor: '#0AA586', fontSize: "14px" }}>
                        Submit Review
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="card p-4 text-center border border-light shadow-sm rounded-3 bg-white py-5">
                    <i className="bi bi-lock-fill text-muted mb-3" style={{ fontSize: "2.5rem" }}></i>
                    <h5 className="fw-bold text-dark mb-2">Want to write a review?</h5>
                    <p className="text-muted small px-3 mb-4">Only registered customers who have purchased this product can leave a review score.</p>
                    <Link to="/login" className="btn text-white btn-sm fw-bold px-4 py-2 border-0 align-self-center shadow-sm" style={{ backgroundColor: "#0AA586", borderRadius: "5px" }}>
                      Log In to Your Account
                    </Link>
                  </div>
                )}
              </div>

              {/* RIGHT LIST COLUMN */}
              <div className="col-12 col-md-7">
                <h3 className="fw-bold mb-4 text-dark" style={{ color: "#0F2C59" }}>
                  Product Reviews ({reviews.length})
                </h3>

                {reviews.length === 0 ? (
                  <div className="card border-0 p-4 rounded-3 text-center bg-white shadow-sm">
                     <p className="text-muted fw-semibold mb-0" style={{ fontSize: "14.5px" }}>No reviews yet for this product. Be the first to share your experience!</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3 overflow-auto px-1" style={{ maxHeight: '460px' }}>
                    {reviews.map((item) => (
                      <div className="card p-3 border-0 shadow-sm bg-white rounded-3" key={item.id}>
                        <div className="text-warning mb-2 d-flex gap-0.5 align-items-center" style={{ fontSize: '11px' }}>
                          {Array.from({ length: Math.floor(parseFloat(item.rating_start || 0)) }).map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          <span className="text-dark fw-bold small ms-1.5" style={{ fontSize: "12px" }}>({item.rating_start})</span>
                        </div>

                        <p className="text-secondary small lh-base mb-3" style={{ fontSize: "13.5px" }}>{item.review_text}</p>

                        <div className="d-flex align-items-center gap-2.5 border-top pt-2">
                          <img
                            src={"http://127.0.0.1:8000/media/"+item?.user_avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                            alt="avatar user"
                            className="rounded-circle"
                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="fw-bold mb-0 text-dark small" style={{ fontSize: "13px" }}>{item.user_name || "Verified Buyer"}</h6>
                            <small className="text-muted" style={{ fontSize: '11px' }}>
                              Posted on: {new Date(item.create_at).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;