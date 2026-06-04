import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { useNavigate, Link } from "react-router-dom";

const Favorites = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🆕 STATE FOR LIVE TICKING CARD TIMERS
  const [cardTimers, setCardTimers] = useState({});

  const productShowData = (id) => {
    navigate("/productDetails/" + id);
  };

  // 🎯 🆕 LIVE TIMER SYNC EFFECT FOR WISHLIST CARDS
  useEffect(() => {
    if (!wishlistItems || wishlistItems.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let updatedTimers = {};

      wishlistItems.forEach((item) => {
        const product = item.product_details;
        if (product && product.active_offer && product.active_offer.is_valid) {
          const endTime = new Date(product.active_offer.end_time).getTime();
          const difference = endTime - now;

          if (difference <= 0) {
            updatedTimers[product.id] = "Expired";
          } else {
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);
            
            updatedTimers[product.id] = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
          }
        }
      });

      setCardTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [wishlistItems]);

  return (
    <div className="container mt-4">
      <style>{`
            .product-card-wrap .hover-actions {
            opacity: 0;
            transition: all 0.3s ease-in-out;
            transform: translateY(10px);
            }
            .product-card-wrap:hover .hover-actions {
            opacity: 1;
            transform: translateY(0);
            }
            .action-icon-btn {
            width: 40px;
            height: 40px;
            background-color: white;
            color: #333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            transition: all 0.2s;
            }
            .action-icon-btn:hover {
            background-color: #0AA586;
            color: white !important;
            }
            .wishlist-top-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 36px;
            height: 36px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: transform 0.2s;
            z-index: 3;
            }
            .wishlist-top-btn:hover {
            transform: scale(1.1);
            }
        `}</style>

      {/* Upper Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3
          className="fw-bold mb-0 text-dark"
          style={{ color: "#0F2C59", fontSize: "22px" }}
        >
          Saved Favorites ({wishlistItems.length})
        </h3>
        {wishlistItems.length > 0 && (
          <button
            className="btn text-white fw-bold px-4 py-2 shadow-sm"
            style={{
              backgroundColor: "#0AA586",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            Move All to Cart
          </button>
        )}
      </div>

      {/* Empty State Handler */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-heart text-muted display-1"></i>
          <h4 className="mt-3 fw-bold text-secondary">
            Your wishlist is empty!
          </h4>
          <p className="text-muted">
            Explore items and tap the heart icon to save them here.
          </p>
        </div>
      ) : (
        /* Products Cards Layout Matrix Grid */
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
          {wishlistItems.map((item) => {
            const product = item.product_details;

            if (!product) return null;

            // 🆕 OFFER VALIDATION LOGIC FOR PRICES AND LABELS
            const hasOffer = product.active_offer && product.active_offer.is_valid;
            const displayPrice = hasOffer ? product.discounted_price : product.price;
            const oldPriceDisplay = hasOffer ? product.price : product.old_price;

            return (
              <div className="col" key={item.id}>
                <div className="card product-card-wrap h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                  {/* Product Frame Area */}
                  <div
                    className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ height: "280px" }}
                  >
                    {/* 🎯 🆕 RED FLASH SALE OFFER BADGE INJECTION */}
                    {hasOffer ? (
                      <span
                        className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2 text-white bg-danger animate-pulse"
                        style={{ fontSize: "11px" }}
                      >
                        {product.active_offer.discount_percentage}% OFF
                      </span>
                    ) : product.badge_tag && product.badge_tag !== "NONE" && (
                      <span
                        className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2 text-white bg-success"
                        style={{ fontSize: "11px" }}
                      >
                        {product.badge_tag}
                      </span>
                    )}

                    {/* Top corner static Heart Icon */}
                    <div
                      className="wishlist-top-btn border-0"
                      onClick={() => toggleWishlist(product.id)}
                      title="Remove from Wishlist"
                    >
                      <i className="bi bi-heart-fill text-danger fs-5"></i>
                    </div>

                    {/* Primary Image */}
                    <img
                      src={
                        product.images?.find((img) => img.is_primary)?.image_url || 
                        product.images?.[0]?.image_url || 
                        "https://placeholder.com/300"
                      }
                      alt={product.title}
                      className="w-100 h-100 animate-fade"
                      style={{
                        objectFit: "contain",
                        mixBlendMode: "multiply"
                      }}
                    />

                    {/* Hover Interaction Overlay */}
                    <div
                      className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1"
                      style={{ backgroundColor: "rgba(15, 44, 89, 0.2)" }}
                    >
                      <button
                        type="button"
                        className="action-icon-btn border-0"
                        title="Quick View"
                        onClick={() => productShowData(product.id)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom Meta Content */}
                  <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <span
                        className="text-muted fw-extrabold d-block mb-1 text-uppercase"
                        style={{ fontSize: "11px", letterSpacing: "0.5px" }}
                      >
                        {product.category_name}
                      </span>

                      {/* 🎯 🆕 INLINE FLEX CONTAINER: Title ke samne stop-watch countdown clock injection */}
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                        <h5
                          className="fw-bold mb-0 text-dark text-truncate flex-grow-1"
                          style={{ fontSize: "16px", cursor: 'pointer' }}
                          onClick={() => productShowData(product.id)}
                          title={product.title}
                        >
                          {product.title}
                        </h5>
                        {hasOffer && cardTimers[product.id] && (
                          <span 
                            className="badge text-danger border border-danger border-opacity-25 bg-danger bg-opacity-10 py-1 px-1.5 text-nowrap rounded d-flex align-items-center gap-1 flex-shrink-0" 
                            style={{ fontSize: '10px', letterSpacing: '0.5px', minWidth: '64px', justifyContent: 'center' }}
                          >
                            <i className="bi bi-clock-history small animate-pulse"></i>
                            {cardTimers[product.id]}
                          </span>
                        )}
                      </div>

                      {/* Rating Layer */}
                      <div
                        className="text-warning small d-flex align-items-center gap-1 mb-3"
                        style={{ fontSize: "13px" }}
                      >
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-black-50 opacity-25"></i>
                        <span className="text-muted ms-1 fw-medium">
                          (5.0)
                        </span>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <div className="d-flex align-items-center gap-2">
                        <span className={`fw-bold fs-5 m-0 ${hasOffer ? 'text-danger' : 'text-dark'}`}>
                          ${displayPrice}
                        </span>
                        {oldPriceDisplay && (
                          <span className="text-muted text-decoration-line-through small fw-medium m-0">
                            ${oldPriceDisplay}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={() => addToCart(product.id, 1)}
                        className="btn text-white fw-bold border-0 shadow-sm"
                        style={{
                          backgroundColor: "#0AA586",
                          borderRadius: "5px",
                          fontSize: "12px",
                          padding: "8px 14px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;