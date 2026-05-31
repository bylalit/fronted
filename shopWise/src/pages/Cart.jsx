import { useContext, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  // 🎯 Context controls ko call kiya
  const { cartData, getCart, addToCart, removeFromCart } = useContext(AuthContext);

  // Shipping Selection State
  const [shippingCost, setShippingCost] = useState(4.99);

  useEffect(() => {
    getCart(); // Page mount par real data pull hoga
  }, []);

  // 🎯 FIX 1: Safe Array management backend response ke mutabik
  const items = Array.isArray(cartData) ? cartData : (cartData?.items || []);

  // 🎯 FIX 2: Live values calculations on arrays data structure
  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.subtotal) || 0), 0);
  const totalItemsCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
  
  const estimatedTax = items.length > 0 ? 23.33 : 0.00; 
  const finalTotal = subtotal + shippingCost + estimatedTax;

  return (
    <>
      <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Cart</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="/" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted" aria-current="page">Cart</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. WORKSPACE GRID SUMMARY SECTION ================= */}
        <div className="container px-md-5 mt-5">
          {items.length === 0 ? (
            /* Empty State Box */
            <div className="text-center py-5 border border-dashed rounded-3 bg-light">
              <i className="bi bi-cart-x text-muted display-1"></i>
              <h4 className="mt-3 fw-bold text-secondary">Your shopping cart is empty!</h4>
              <p className="text-muted">Browse our collection and add premium products here.</p>
              <a href="/category" className="btn text-white fw-bold px-4 mt-2 border-0" style={{ backgroundColor: '#0AA586' }}>
                Shop Now
              </a>
            </div>
          ) : (
            <div className="row g-5">
              
              {/* LEFT ROW LAYER: Products Cart Table */}
              <div className="col-12 col-xl-8">
                <div className="table-responsive">
                  <table className="table align-middle border-bottom" style={{ minWidth: '680px' }}>
                    <thead>
                      <tr className="text-muted text-uppercase small bg-light border-top" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                        <th scope="col" className="py-3 ps-3">Product</th>
                        <th scope="col" className="py-3">Price</th>
                        <th scope="col" className="py-3">Quantity</th>
                        <th scope="col" className="py-3">Total</th>
                        <th scope="col" className="py-3 pe-3"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {items.map((item) => {
                        // 🎯 FIX 3: Key reference change to matching 'product_detail'
                        const product = item.product_detail;
                        if (!product) return null;

                        // Image resolution layer fallback checks
                        const primaryImg = product.images?.find(img => img.is_primary)?.image_url || product.images?.[0]?.image_url || product.images?.[0]?.image || "https://placeholder.com/150";

                        return (
                          <tr key={item.id} className="border-bottom">
                            {/* Thumbnail + Title Frame */}
                            <td className="py-4 ps-3">
                              <div className="d-flex align-items-center gap-3">
                                <div className="border rounded-2 p-2 bg-light text-center d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                  <img src={primaryImg} alt={product.title} className="img-fluid object-contain" style={{ maxHeight: '64px', mixBlendMode: 'multiply' }} />
                                </div>
                                <div style={{ maxWidth: "260px" }}>
                                  <h6 className="fw-bold text-dark mb-1 mb-md-2 text-truncate" style={{ fontSize: '15px' }} title={product.title}>
                                    {product.title}
                                  </h6>
                                  <div className="text-muted small fw-medium text-uppercase" style={{ fontSize: "11px" }}>
                                    Category: <span className="text-secondary">{product.category_name}</span>
                                  </div>
                                  {product.badge_tag && (
                                    <span className="badge rounded-pill px-2.5 py-1 mt-2 text-success fw-bold" style={{ backgroundColor: '#E2F2EE', fontSize: '10px' }}>
                                      {product.badge_tag}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            
                            {/* Unit Pricing */}
                            <td className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                              <div>${product.price}</div>
                              {product.old_price && (
                                <small className="text-muted text-decoration-line-through fw-medium" style={{ fontSize: '12px' }}>
                                  ${product.old_price}
                                </small>
                              )}
                            </td>

                            {/* Incrementor Hooks */}
                            <td>
                              <div className="input-group border rounded-2 bg-white" style={{ width: '100px', height: '36px' }}>
                                <button 
                                  className="btn btn-link text-dark text-decoration-none shadow-none px-2.5 py-0 border-0 fw-bold" 
                                  onClick={() => item.quantity > 1 ? addToCart(product.id, -1) : removeFromCart(product.id)}
                                >
                                  -
                                </button>
                                <span className="form-control text-center bg-transparent border-0 d-flex align-items-center justify-content-center fw-bold p-0" style={{ fontSize: '14px' }}>
                                  {item.quantity}
                                </span>
                                <button 
                                  className="btn btn-link text-dark text-decoration-none shadow-none px-2.5 py-0 border-0 fw-bold" 
                                  onClick={() => addToCart(product.id, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* Subtotal */}
                            <td className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                              ${parseFloat(item.subtotal).toFixed(2)}
                            </td>

                            {/* Delete single item action */}
                            <td className="pe-3 text-end">
                              <button 
                                className="btn text-muted p-0 border-0 text-hover-danger" 
                                onClick={() => removeFromCart(product.id)} 
                                title="Remove Item"
                              >
                                <i className="bi bi-trash fs-5"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                </div>

                {/* Navigation actions utility options */}
                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                  <a href="/category" className="btn btn-link text-success fw-bold text-decoration-none p-0 d-inline-flex align-items-center gap-1.5" style={{ color: '#0AA586', fontSize: '15px' }}>
                    <i className="bi bi-arrow-left"></i> Resume Browsing
                  </a>
                </div>
              </div>

              {/* RIGHT ROW LAYER: Order Summary Breakdown Sidebar Card */}
              <div className="col-12 col-xl-4">
                <div className="card p-4 rounded-3 bg-white border shadow-sm">
                  
                  {/* Header counts area */}
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                    <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '18px', color: '#0F2C59' }}>Order Summary</h4>
                    <span className="badge rounded-pill text-success px-2.5 py-1.5 fw-bold" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                      {totalItemsCount} items
                    </span>
                  </div>

                  {/* Promo Coupons Form */}
                  <div className="mb-4">
                    <label className="text-dark fw-bold small mb-2" style={{ fontSize: '13px' }}>Discount Code</label>
                    <div className="input-group border rounded-2 p-1 bg-white">
                      <input type="text" className="form-control border-0 bg-transparent shadow-none ps-2 fw-medium" placeholder="Enter coupon" style={{ fontSize: '14px' }} />
                      <button className="btn btn-success text-white px-4 fw-bold border-0" style={{ backgroundColor: '#0AA586', borderRadius: '5px' }} type="button">Redeem</button>
                    </div>
                  </div>

                  {/* Pricing breakups invoice rows ledger */}
                  <div className="d-flex flex-column gap-3 border-bottom pb-3 text-secondary" style={{ fontSize: '14.5px' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium">Subtotal</span>
                      <strong className="text-dark">${subtotal.toFixed(2)}</strong>
                    </div>
                    
                    {/* Shipping selection criteria rules */}
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">Shipping</span>
                        <strong className="text-dark">${shippingCost.toFixed(2)}</strong>
                      </div>
                      <div className="d-flex flex-column gap-2 ps-1 mt-2">
                        <label className="d-flex align-items-center gap-2 small cursor-pointer text-dark fw-medium">
                          <input type="radio" name="shipping" checked={shippingCost === 4.99} onChange={() => setShippingCost(4.99)} className="form-check-input shadow-none border" style={{ borderColor: '#0AA586' }} />
                          Standard — $4.99
                        </label>
                        <label className="d-flex align-items-center gap-2 small cursor-pointer text-secondary fw-medium">
                          <input type="radio" name="shipping" checked={shippingCost === 11.99} onChange={() => setShippingCost(11.99)} className="form-check-input shadow-none border" />
                          Priority — $11.99
                        </label>
                        <label className="d-flex align-items-center gap-2 small cursor-pointer text-secondary fw-medium">
                          <input type="radio" name="shipping" checked={shippingCost === 0.00} onChange={() => setShippingCost(0.00)} className="form-check-input shadow-none border" />
                          Free Shipping (Orders over $250)
                        </label>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium">Tax (est.)</span>
                      <strong className="text-dark">${estimatedTax.toFixed(2)}</strong>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium">Discount</span>
                      <strong className="text-success">-$0.00</strong>
                    </div>
                  </div>

                  {/* Absolute Final Totals Ledger Pricing Summary */}
                  <div className="d-flex justify-content-between align-items-center py-4">
                    <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>Total</span>
                    <span className="fw-extrabold text-dark h3 mb-0" style={{ color: '#0F2C59' }}>${finalTotal.toFixed(2)}</span>
                  </div>

                  {/* Checkout Actions Buttons CTA */}
                  <button className="btn w-100 text-white fw-bold py-2.5 border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm mb-4" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '15px' }}>
                    Proceed to Checkout <i className="bi bi-arrow-right"></i>
                  </button>

                  {/* Badges footer layer links */}
                  <div className="text-center mt-2 border-top pt-3">
                    <div className="text-uppercase text-muted fw-bold mb-2.5" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Accepted Payments</div>
                    <div className="d-flex justify-content-center gap-3 text-muted fs-4 opacity-50">
                      <i className="bi bi-credit-card"></i>
                      <i className="bi bi-paypal"></i>
                      <i className="bi bi-shield-lock"></i>
                      <i className="bi bi-wallet2"></i>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>

      </section>
    </>
  );
};

export default Cart;