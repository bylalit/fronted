import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // 🆕 Redirect links ke liye Link import kiya
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const productUrl = "http://127.0.0.1:8000/api/product/" + id + "/";
  const reviewsUrl = `http://127.0.0.1:8000/api/reviews/?product_id=${id}`;

  // 🎯 Context se userProfile bhi nikal liya taaki login status track kar sakein
  const { wishlistItems, toggleWishlist, userProfile } = useContext(AuthContext);

  let [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [ratingStart, setRatingStart] = useState("5.0");

  // 📦 1. Core Product Details Extraction
  const getProductDetails = async () => {
    let response = await fetch(productUrl);
    response = await response.json();

    // console.log(response);

    setProduct(response);

    // FIX 1: Safely extracting image patterns across different naming variations
    const primaryImgObj = response?.images?.find((img) => img.is_primary);
    const fallbackImgUrl = response?.images?.[0]?.image_url || response?.images?.[0]?.image;
    const finalUrl = primaryImgObj?.image_url || primaryImgObj?.image || fallbackImgUrl;

    if (finalUrl) {
      setActiveImage(finalUrl);
    }
  };

  // 📦 2. Dynamic Reviews Filtering API Fetch
  const getProductReviews = async () => {
    try {
      const response = await fetch(reviewsUrl);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        // console.log(data);
        
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  // 📝 3. Submit Review Form Handler
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
        getProductReviews(); 
      } else {
        toast.error("Something went wrong while posting your review.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed.");
    }
  };

  useEffect(() => {
    getProductDetails();
    getProductReviews(); 
  }, [id]);

  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Obsidian");

  const isFavorite = wishlistItems?.some(item => item.product === product?.id);

  return (
    <>
      <section
        className="w-100 pb-5"
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* 1. BREADCRUMB HEADER SECTION  */}
        <div className="py-4 border-bottom" style={{ backgroundColor: "#F8FAFC" }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: "#0F2C59", fontSize: "28px" }}>
              Product Details
            </h2>
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
              <div
                className="card border rounded-3 overflow-hidden bg-light position-relative p-4 text-center d-flex align-items-center justify-content-center"
                style={{ minHeight: "480px" }}
              >
                <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-3 py-2 fw-bold text-white bg-danger" style={{ fontSize: "12px" }}>
                  -21%
                </span>

                {/* 🎯 FIX 2: Added structural checks for image URL display fallback mapping */}
                <img
                  src={activeImage || "https://placeholder.com/600x480"}
                  alt={product?.title || "Product presentation gear"}
                  className="img-fluid object-contain"
                  style={{ maxHeight: "420px", mixBlendMode: "multiply" }}
                />
              </div>

              {/* Dynamic Action Trigger Switcher Thumbnails */}
              <div className="d-flex gap-2 mt-3 justify-content-start overflow-auto pb-2">
                {product?.images?.map((img, index) => {
                  const currentImgUrl = img.image_url || img.image; // 🎯 Catching fields
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
                      <img
                        src={currentImgUrl}
                        alt="Thumbnail"
                        className="w-100 h-100"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT ROW: Pricing, Options & Specs Column */}
            <div className="col-12 col-lg-6">
              <div>
                <span className="badge rounded-pill px-3 py-2 fw-bold mb-3" style={{ backgroundColor: "#E2F2EE", color: "#0AA586", fontSize: "12px" }}>
                  Sound Equipment
                </span>
                <span className="text-success small fw-bold float-end d-flex align-items-center gap-1.5" style={{ fontSize: "14px" }}>
                  <span className="rounded-circle bg-success d-inline-block" style={{ width: "8px", height: "8px" }}></span> In Stock
                </span>

                <h1 className="fw-bold mb-3 text-dark lh-base" style={{ fontSize: "28px", color: "#0F2C59" }}>
                  {product?.title}
                </h1>

                {/* Rating Layer */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="text-warning small d-flex gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <span className="text-dark fw-bold small">4.6</span>
                  <span className="text-muted small border-start ps-2">143 ratings</span>
                  <span className="text-danger small fw-bold border-start ps-2">{product?.stock_quantity} remaining</span>
                </div>

                {/* Pricing Block Card */}
                <div className="card border-0 rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between flex-row flex-wrap gap-3" style={{ backgroundColor: "#F8FAFC" }}>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="fw-extrabold text-dark h2 mb-0" style={{ color: "#0F2C59" }}>
                      ${product?.price}
                    </span>
                    <span className="text-muted text-decoration-line-through text-md">
                      ${product?.old_price}
                    </span>
                  </div>
                  <span className="badge border px-2.5 py-1.5 text-success fw-bold font-normal" style={{ backgroundColor: "#E2F2EE", borderColor: "#C6E7E1", fontSize: "12px" }}>
                    Save $50.00
                  </span>
                </div>

                <p className="text-secondary small lh-base mb-4" style={{ fontSize: "14.5px" }}>
                  {product?.description}
                </p>

                {/* Color Choice Picker */}
                <div className="mb-4">
                  <div className="text-dark fw-bold small mb-2">
                    Color — <span className="text-muted fw-semibold">{selectedColor}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {[
                      { name: "Obsidian", color: "#0f172a" },
                      { name: "Alabaster", color: "#f1f5f9" },
                      { name: "Classic Blue", color: "#1d4ed8" },
                      { name: "Forest Green", color: "#14532d" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(item.name)}
                        className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                        style={{
                          width: "26px",
                          height: "26px",
                          backgroundColor: item.color,
                          outline: selectedColor === item.name ? "2px solid #0AA586" : "none",
                          outlineOffset: "2px",
                        }}
                      >
                        {selectedColor === item.name && (
                          <i className={`bi bi-check text-${item.name === "Alabaster" ? "dark" : "white"} small`}></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

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
                    <button className="btn w-100 text-white fw-bold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm" style={{ backgroundColor: "#0AA586", height: "44px", borderRadius: "6px" }}>
                      <i className="bi bi-bag-plus"></i> Add to Cart
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
              
              {/* 🟢 LEFT FORM COLUMN: Conditional Rendering Applied */}
              <div className="col-12 col-md-5">
                {/* 🎯 FIX 3: Conditional check block - userProfile hoga toh form dikhega, warna Login template card */}
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
                  /* 🔐 Elegant Out-of-Session Login Notice Shield Box */
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

              {/* 🔵 RIGHT LIST COLUMN: Active Database Reviews */}
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