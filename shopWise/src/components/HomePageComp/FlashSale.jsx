import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Route link redirection ke liye navigate hook use kiya
import { AuthContext } from "../../context/AuthContext";

const FlashSale = () => {
  const url = "http://127.0.0.1:8000/api/product/?on_sale=true";
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();
  
  const { setGlobalLoading, addToCart, wishlistItems, toggleWishlist } = useContext(AuthContext);

  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [cardTimers, setCardTimers] = useState({});

  const getSaleProducts = async () => {
    setGlobalLoading(true);
    try {
      let response = await fetch(url);
      if (response.ok) {
        const data = await response.json();        
        const activeDeals = data.results || data;        
        setSaleProducts(activeDeals.slice(0, 8));
      }
    } catch (error) {
      console.error("Error loading flash sale data array:", error);
    } finally {
      setGlobalLoading(false);
    }
  };
  
  useEffect(() => {
    getSaleProducts();
  }, []);

  const productShowData = (id) => {
    navigate("/productDetails/" + id);
  };

  useEffect(() => {
    if (saleProducts.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let updatedCardTimers = {};

      saleProducts.forEach((product) => {
        const pEndTime = new Date(product.active_offer.end_time).getTime();
        const pDiff = pEndTime - now;

        if (pDiff <= 0) {
          updatedCardTimers[product.id] = "Expired";
        } else {
          const h = Math.floor((pDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((pDiff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((pDiff % (1000 * 60)) / 1000);
          
          updatedCardTimers[product.id] = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        }
      });
      setCardTimers(updatedCardTimers);

      const targetEndTime = new Date(saleProducts[0].active_offer.end_time).getTime();
      const difference = targetEndTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        getSaleProducts();
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0")
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [saleProducts]);

  // Backend se real structural promo title extract logic
  const activeOfferTitle = saleProducts.length > 0 ? saleProducts[0].active_offer.title : "Flash Sale";

  return (
    <>
      <style>{`
        .sale-card-frame .hover-action-layer {
          opacity: 0;
          transition: all 0.3s ease-in-out;
          transform: translateY(-8px);
        }
        .sale-card-frame:hover .hover-action-layer {
          opacity: 1;
          transform: translateY(0);
        }
        .sale-icon-btn {
          width: 36px;
          height: 36px;
          background-color: #ffffff;
          color: #14253f;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.15);
          transition: all 0.2s ease;
        }
        .sale-icon-btn:hover {
          background-color: #0AA586;
          color: #ffffff !important;
        }
      `}</style>

      <section className="w-100 py-5" style={{ backgroundColor: '#0f1e36' }}>
        <div className="container py-4">
          
          {/* ================= 1. FLASH SALE BANNER TIMER BLOCK ================= */}
          <div className="p-4 p-md-5 rounded-3 mb-5 border border-secondary border-opacity-25" style={{ backgroundColor: '#1a2e4c' }}>
            <div className="row g-4 align-items-center justify-content-between">
              
              {/* Left Content Column */}
              <div className="col-12 col-xl-5">
                <span 
                  className="badge px-3 py-2 fw-semibold mb-3 d-inline-flex align-items-center gap-1.5 text-uppercase" 
                  style={{ backgroundColor: 'rgba(10, 165, 134, 0.15)', color: '#0AA586', fontSize: '12px', letterSpacing: '0.5px' }}
                >
                  <i className="bi bi-lightning-charge-fill"></i> {activeOfferTitle} — Limited Time Offer
                </span>
                <h2 className="text-white fw-bold mb-3" style={{ fontSize: '32px' }}>
                  Exclusive Offers Just for You
                </h2>
                <p className="mb-0 style-desc" style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', maxWidth: '440px' }}>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Don't miss these limited-time savings.
                </p>
              </div>

              {/* Middle Countdown Timer Column */}
              <div className="col-12 col-md-auto text-center text-md-start">
                <div className="text-uppercase text-white-50 fw-semibold mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                  <i className="bi bi-hourglass-split me-1"></i> Ends In:
                </div>
                <div className="d-flex justify-content-center justify-content-md-start gap-2">
                  {[
                    { value: timeLeft.days, unit: "Days" },
                    { value: timeLeft.hours, unit: "Hours" },
                    { value: timeLeft.minutes, unit: "Minutes" },
                    { value: timeLeft.seconds, unit: "Seconds" }
                  ].map((time, idx) => (
                    <div 
                      key={idx} 
                      className="rounded border border-secondary border-opacity-50 p-2 text-center d-flex flex-column justify-content-center" 
                      style={{ backgroundColor: 'rgba(15, 30, 54, 0.4)', minWidth: '65px', minHeight: '65px' }}
                    >
                      <span className="text-white fw-bold fs-4 lh-1">{time.value}</span>
                      <span className="text-white-50 text-uppercase mt-1" style={{ fontSize: '9px' }}>{time.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Action Buttons Column */}
              <div className="col-12 col-md-auto d-flex flex-column gap-2 text-center text-md-start">
                <button type="button" className="btn text-white px-4 py-2 fw-medium border-0 d-inline-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}>
                  <Link to="/sale-product" className="text-white text-decoration-none">Claim Offer</Link> <i className="bi bi-arrow-right"></i>
                </button>
                <Link to="/sale-product" type="button" className="btn transparent text-white px-4 py-2 fw-medium border border-secondary border-opacity-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '5px', fontSize: '14px' }}>
                  View All Items
                </Link>
              </div>

            </div>
          </div>

          {/* ================= 2. FOUR-COLUMN DYNAMIC OFFERS GRID ================= */}
          {saleProducts.length === 0 ? (
            <div className="text-center py-5 text-muted border border-secondary border-opacity-25 rounded-3 bg-white bg-opacity-5">
              <i className="bi bi-percent display-3 text-secondary opacity-50 mb-3"></i>
              <h5>Abhi koi products active discounts par nahi hain!</h5>
              <p className="small text-white-50">Kripya admin panel se naye deal parameters inject karein.</p>
            </div>
          ) : (
            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
              {saleProducts.map((product) => {
                const primaryImgUrl = product.images?.find((img) => img.is_primary)?.image_url || product.images?.[0]?.image_url || "https://placeholder.com/240";
                const discountLabel = `-${product.active_offer.discount_percentage}%`;
                
                const isFavorite = wishlistItems?.some(item => item.product === product.id);

                return (
                  <div className="col" key={product.id}>
                    <div className="card h-100 sale-card-frame border border-secondary border-opacity-25 rounded-3 overflow-hidden p-3" style={{ backgroundColor: '#14253f' }}>
                      
                      {/* Image Section Frame */}
                      <div className="position-relative p-3 rounded-2 d-flex align-items-center justify-content-center bg-white bg-opacity-5" style={{ height: '220px', overflow: 'hidden' }}>
                        <span 
                          className="position-absolute top-0 start-0 m-2 badge rounded-2 px-2 py-1 fw-bold" 
                          style={{ backgroundColor: '#0AA586', color: '#ffffff', fontSize: '11px', zIndex: 5 }}
                        >
                          {discountLabel}
                        </span>
                        
                        <img 
                          src={primaryImgUrl} 
                          alt={product.title} 
                          className="img-fluid object-contain w-100 h-100" 
                          style={{ maxHeight: '150px' }} 
                        />

                        {/* Heart & Quick View dual icons layout floating action overlays */}
                        <div className="hover-action-layer position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: 'rgba(15, 30, 54, 0.65)' }}>
                          <button 
                            type="button" 
                            className="sale-icon-btn border-0" 
                            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <i className={`bi bi-heart-fill ${isFavorite ? 'text-danger' : 'text-muted'}`}></i>
                          </button>
                          <button 
                            type="button" 
                            className="sale-icon-btn border-0" 
                            title="Quick View"
                            onClick={() => productShowData(product.id)}
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
                        </div>
                      </div>

                      {/* Meta Description Area */}
                      <div className="pt-3 pb-1 px-1">
                        {/* Stars Rating Row */}
                        <div className="text-warning small mb-1 d-flex gap-0.5 align-items-center" style={{ fontSize: '11px' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                          <span className="text-white-50 ms-1">(317)</span>
                        </div>

                        {/* TITLE & INLINE RIGHT COUNTDOWN TIME STRUCTURE */}
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                          <h6 className="text-white fw-medium mb-0 text-truncate flex-grow-1" style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => productShowData(product.id)} title={product.title}>
                            {product.title}
                          </h6>
                          {cardTimers[product.id] && (
                            <span 
                              className="badge text-danger border border-danger border-opacity-25 bg-danger bg-opacity-10 py-1 px-1.5 text-nowrap rounded d-flex align-items-center gap-1 flex-shrink-0" 
                              style={{ fontSize: '10px', letterSpacing: '0.5px', minWidth: '64px', justifyContent: 'center' }}
                            >
                              <i className="bi bi-clock-history small animate-pulse"></i>
                              {cardTimers[product.id]}
                            </span>
                          )}
                        </div>

                        {/* Pricing Fields */}
                        <div className="d-flex align-items-baseline gap-2 mb-3">
                          <span className="text-decoration-line-through text-white-50 small" style={{ fontSize: '12px' }}>
                            ${product.price}
                          </span>
                          <span className="fw-bold fs-5 text-success" style={{ color: '#0AA586' }}>
                            ${product.discounted_price}
                          </span>
                        </div>

                        {/* Embedded Custom Add To Cart Row Button */}
                        <button 
                          type="button"
                          onClick={() => addToCart(product.id, 1)}
                          className="btn w-100 text-success bg-white bg-opacity-5 border border-success border-opacity-25 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                          style={{ color: '#0AA586', fontSize: '13px', borderRadius: '5px' }}
                        >
                          <i className="bi bi-bag-plus"></i> Add to Cart
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default FlashSale;