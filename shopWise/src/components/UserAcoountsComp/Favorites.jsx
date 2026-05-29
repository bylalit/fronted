import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // 👈 Path folder ke mutabik sahi hai
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  // 🎯 FIX 1: Context se wishlistItems aur toggleWishlist DONO ko sahi se nikal liya
  const { wishlistItems, toggleWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  const productShowData = (id) => {
    navigate("/productDetails/"+id);
  }

  return (
    <div className="container mt-4">
        {/* Dynamic CSS Injection for Hover Effects (Same as RightSide) */}
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
            /* 🆕 Single page style absolute heart icon style */
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
            z-index: 3; /* Badge ke upar rahega */
            }
            .wishlist-top-btn:hover {
            transform: scale(1.1);
            }
        `}</style>

      {/* Upper Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>
          Saved Favorites ({wishlistItems.length})
        </h3>
        {wishlistItems.length > 0 && (
          <button className="btn text-white fw-bold px-4 py-2 shadow-sm" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
            Move All to Cart
          </button>
        )}
      </div>

      {/* Empty State Handler: Agar wishlist khali ho */}
      {wishlistItems.length === 0 ? (
         <div className="text-center py-5">
            <i className="bi bi-heart text-muted display-1"></i>
            <h4 className="mt-3 fw-bold text-secondary">Your wishlist is empty!</h4>
            <p className="text-muted">Explore items and tap the heart icon to save them here.</p>
         </div>
      ) : (
         /* Products Cards Layout Matrix Grid (Same UI as RightSide) */
         <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
            {wishlistItems.map((item) => {
               // 🛡️ Django Serializer se product details nikali
               const product = item.product_details;

               // Fail-safe check: Agar kisi reason se product data na ho toh crash na ho
               if (!product) return null;

               return (
                 <div className="col" key={item.id}>
                   <div className="card product-card-wrap h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                     
                     {/* Product Frame Area */}
                     <div className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '280px' }}>
                       {product.badge_tag && (
                         <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2" style={{ backgroundColor: '#198754', color: '#fff', fontSize: '11px' }}>
                           {product.badge_tag}
                         </span>
                       )}

                       {/* 🆕 FIX 2: Card ke top corner par Single Product details page jaisa static Heart Icon lagaya */}
                       <div 
                         className="wishlist-top-btn border-0" 
                         onClick={() => toggleWishlist(product.id)}
                         title="Remove from Wishlist"
                       >
                         <i className="bi bi-heart-fill text-danger fs-5"></i>
                       </div>

                       {/* Primary Image Extraction Logic */}
                       <img 
                         src={product.images?.find((img) => img.is_primary)?.image_url || "https://placeholder.com/300"} 
                         alt={product.title} 
                         className="w-100 h-100 object-cover rounded-2" 
                         style={{ objectFit: 'cover', objectPosition: 'top center' }} 
                       />

                       {/* Hover Interaction Overlay (Same as RightSide) */}
                       <div className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1" style={{ backgroundColor: 'rgba(15, 44, 89, 0.2)' }}>
                         {/* Quick View Button (Eye Icon) */}
                         <button className="action-icon-btn border-0" title="Quick View" onClick={() => productShowData(product.id)}>
                           <i className="bi bi-eye-fill"></i>
                         </button>
                       </div>
                     </div>

                     {/* Card Bottom Meta Content */}
                     <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                       <div>
                         <span className="text-muted fw-extrabold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                           {product.category_name}
                         </span>

                         <h5 className="fw-bold mb-2 text-truncate" style={{ color: '#0F2C59', fontSize: '17px' }}>
                           {product.title}
                         </h5>

                         {/* Rating Layer */}
                         <div className="text-warning small d-flex align-items-center gap-1 mb-3" style={{ fontSize: '13px' }}>
                           <i className="bi bi-star-fill text-warning"></i>
                           <i className="bi bi-star-fill text-warning"></i>
                           <i className="bi bi-star-fill text-warning"></i>
                           <i className="bi bi-star-fill text-warning"></i>
                           <i className="bi bi-star-fill text-black-50 opacity-25"></i>
                           <span className="text-muted ms-1 fw-medium">(120 reviews)</span>
                         </div>
                       </div>

                       {/* Price & Action Row */}
                       <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                         <div className="d-flex align-items-center gap-2">
                           <span className="fw-bold fs-5 text-dark m-0">${product.price}</span>
                           {product.old_price && (
                             <span className="text-muted text-decoration-line-through small fw-medium m-0">${product.old_price}</span>
                           )}
                         </div>

                         {/* Add to Cart Button */}
                         <button className="btn text-white fw-bold border-0 shadow-sm" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '12px', padding: '8px 14px', whiteSpace: 'nowrap' }}>
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
