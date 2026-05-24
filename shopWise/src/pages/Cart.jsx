import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Cart = () => {
  // 1. Core Shopping Cart Item State array
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Donec quam felis ultricies",
      color: "Slate",
      size: "M",
      price: 74.50,
      oldPrice: null,
      quantity: 1,
      badge: "",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&auto=format&fit=crop&q=80" // Hoodie placeholder
    },
    {
      id: 2,
      title: "Curabitur ullamcorper nisi",
      color: "Cream",
      size: "L",
      price: 58.00,
      oldPrice: 70.99,
      quantity: 2,
      badge: "Save 18%",
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&auto=format&fit=crop&q=80" // Tote bag placeholder
    },
    {
      id: 3,
      title: "Aenean commodo ligula eget",
      color: "Onyx",
      size: "S",
      price: 42.75,
      oldPrice: null,
      quantity: 1,
      badge: "",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80" // Sneaker placeholder
    }
  ]);

  // 2. Shipping Options Selection State
  const [shippingCost, setShippingCost] = useState(4.99);

//   // 3. Testimonial Reviews Mock Data Asset Pipeline
//   const testimonials = [
//     {
//       id: 1,
//       rating: 5,
//       isHalfStar: false,
//       text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum ante ipsum.",
//       name: "Sophia Hartwell",
//       role: "Brand Strategist",
//       img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
//     },
//     {
//       id: 2,
//       rating: 5,
//       isHalfStar: false,
//       text: "Curabitur pretium tincidunt lacus nulla gravida orci a odio dignissim congue rutrum at lorem et iaculis amet consequat vestibulum nulla facilisi morbi tempus.",
//       name: "Marcus Ellison",
//       role: "VP of Engineering",
//       img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80",
//       highlightBorder: true
//     },
//     {
//       id: 3,
//       rating: 4,
//       isHalfStar: true,
//       text: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor maecenas faucibus mollis interdum tempor.",
//       name: "Leona Mitchell",
//       role: "Operations Lead",
//       img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
//     },
//     {
//       id: 4,
//       rating: 5,
//       isHalfStar: false,
//       text: "Donec ullamcorper nulla non metus auctor fringilla integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
//       name: "Julian Prescott",
//       role: "Creative Director",
//       img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
//     },
//     {
//       id: 5,
//       rating: 5,
//       isHalfStar: false,
//       text: "Aenean lacinia bibendum nulla sed consectetur praesent commodo cursus magna vel scelerisque nisl consectetur et vivamus sagittis lacus augue.",
//       name: "Clara Jennings",
//       role: "Product Architect",
//       img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
//       highlightBorder: true
//     },
//     {
//       id: 6,
//       rating: 5,
//       isHalfStar: false,
//       text: "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus etiam porta.",
//       name: "Owen Blackwood",
//       role: "Platform Analyst",
//       img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
//     }
//   ];

  // Quantity handlers
  const updateQty = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + amount;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const estimatedTax = 23.33; // Mock state matching layout template
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted" aria-current="page">Cart</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. WORKSPACE GRID SUMMARY SECTION ================= */}
        <div className="container px-md-5 mt-5">
          <div className="row g-5">
            
            {/* LEFT ROW LAYER: Products Cart Matrix Table */}
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
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-bottom">
                        {/* Thumbnail + Title Descriptive Frame */}
                        <td className="py-4 ps-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="border rounded-2 p-2 bg-light text-center d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                              <img src={item.img} alt={item.title} className="img-fluid object-contain" style={{ maxHeight: '64px', mixBlendMode: 'multiply' }} />
                            </div>
                            <div>
                              <h6 className="fw-bold text-dark mb-1 mb-md-2" style={{ fontSize: '15px' }}>{item.title}</h6>
                              <div className="text-muted small fw-medium">
                                Color: <span className="text-secondary me-2">{item.color}</span> Size: <span className="text-secondary">{item.size}</span>
                              </div>
                              {item.badge && (
                                <span className="badge rounded-pill px-2.5 py-1 mt-2 text-success fw-bold" style={{ backgroundColor: '#E2F2EE', fontSize: '11px' }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        {/* Unit Pricing */}
                        <td className="fw-bold text-dark" style={{ fontSize: '15px' }}>
                          <div>${item.price.toFixed(2)}</div>
                          {item.oldPrice && <small className="text-muted text-decoration-line-through fw-medium" style={{ fontSize: '12px' }}>${item.oldPrice}</small>}
                        </td>

                        {/* Interactive Incrementor Controls */}
                        <td>
                          <div className="input-group border rounded-2 bg-white" style={{ width: '100px', height: '36px' }}>
                            <button className="btn btn-link text-dark text-decoration-none shadow-none px-2.5 py-0 border-0 fw-bold" onClick={() => updateQty(item.id, -1)}>-</button>
                            <span className="form-control text-center bg-transparent border-0 d-flex align-items-center justify-content-center fw-bold p-0" style={{ fontSize: '14px' }}>{item.quantity}</span>
                            <button className="btn btn-link text-dark text-decoration-none shadow-none px-2.5 py-0 border-0 fw-bold" onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>
                        </td>

                        {/* Evaluated Total */}
                        <td className="fw-bold text-dark" style={{ fontSize: '16px' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>

                        {/* Remove Action Trigger */}
                        <td className="pe-3">
                          <button className="btn text-muted p-0 border-0 hover-danger" onClick={() => removeItem(item.id)} title="Remove Item">
                            <i className="bi bi-trash fs-5"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Back to Browsing / Clear All Actions Button Row */}
              <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                <a href="#browse" className="btn btn-link text-success fw-bold text-decoration-none p-0 d-inline-flex align-items-center gap-1.5" style={{ color: '#0AA586', fontSize: '15px' }}>
                  <i className="bi bi-arrow-left"></i> Resume Browsing
                </a>
                <button className="btn border border-danger text-danger bg-transparent fw-bold px-4 py-2" style={{ borderRadius: '6px', fontSize: '14px' }} onClick={() => setCartItems([])}>
                  Clear All
                </button>
              </div>
            </div>

            {/* RIGHT ROW LAYER: Order Breakdown Sidebar Reciept Container */}
            <div className="col-12 col-xl-4">
              <div className="card p-4 rounded-3 bg-white border shadow-sm">
                
                {/* Header title */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                  <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '18px', color: '#0F2C59' }}>Order Summary</h4>
                  <span className="badge rounded-pill text-success px-2.5 py-1.5 fw-bold" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                    {totalItemsCount} items
                  </span>
                </div>

                {/* Promo Code Input Fields */}
                <div className="mb-4">
                  <label className="text-dark fw-bold small mb-2" style={{ fontSize: '13px' }}>Discount Code</label>
                  <div className="input-group border rounded-2 p-1 bg-white">
                    <input type="text" className="form-control border-0 bg-transparent shadow-none ps-2 fw-medium" placeholder="Enter coupon" style={{ fontSize: '14px' }} />
                    <button className="btn btn-success text-white px-4 fw-bold border-0" style={{ backgroundColor: '#0AA586', borderRadius: '5px' }} type="button">Redeem</button>
                  </div>
                </div>

                {/* Subtotals Pricing Breakdown Lists Rows */}
                <div className="d-flex flex-column gap-3 border-bottom pb-3 text-secondary" style={{ fontSize: '14.5px' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-medium">Subtotal</span>
                    <strong className="text-dark">${subtotal.toFixed(2)}</strong>
                  </div>
                  
                  {/* Detailed Interactive Shipping Choices */}
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
                        Free (Orders $250+)
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

                {/* Grand Absolute Financial Total */}
                <div className="d-flex justify-content-between align-items-center py-4">
                  <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>Total</span>
                  <span className="fw-extrabold text-dark h3 mb-0" style={{ color: '#0F2C59' }}>${finalTotal.toFixed(2)}</span>
                </div>

                {/* Final Checkout Route CTA Action Trigger */}
                <button className="btn w-100 text-white fw-bold py-2.5 border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm mb-4" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '15px' }}>
                  Proceed to Checkout <i className="bi bi-arrow-right"></i>
                </button>

                {/* Micro Icon Verification Badges Footer Row */}
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
        </div>


      </section>
    </>
  );
};

export default Cart;