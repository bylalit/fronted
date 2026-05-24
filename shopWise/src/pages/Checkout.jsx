import  { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Checkout = () => {
  const [paymentType, setPaymentType] = useState('card');

  return (
    <>
      <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Checkout</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Checkout</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. STEPPER PROGRESS BAR ================= */}
        <div className="container mt-5 px-md-5">
          <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mb-5" style={{ fontSize: '14px' }}>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border border-success fw-bold text-success" style={{ backgroundColor: '#E2F2EE' }}>
              <span className="badge rounded-circle bg-success text-white">1</span> Information
            </div>
            <div className="text-muted opacity-50"><i className="bi bi-chevron-right"></i></div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border text-muted fw-medium bg-light">
              <span className="badge rounded-circle bg-secondary text-white">2</span> Delivery
            </div>
            <div className="text-muted opacity-50"><i className="bi bi-chevron-right"></i></div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border text-muted fw-medium bg-light">
              <span className="badge rounded-circle bg-secondary text-white">3</span> Payment
            </div>
            <div className="text-muted opacity-50"><i className="bi bi-chevron-right"></i></div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 border text-muted fw-medium bg-light">
              <span className="badge rounded-circle bg-secondary text-white">4</span> Review
            </div>
          </div>

          {/* MAIN INTERACTIVE BILLING WORKSPACE GRID */}
          <div className="row g-5">
            
            {/* LEFT ROW: Core Intake Processing Form Data Fields */}
            <div className="col-12 col-xl-7">
              <form onSubmit={(e) => e.preventDefault()}>
                
                {/* Contact Block */}
                <div className="card p-4 rounded-3 border-0 bg-light bg-opacity-50 mb-4 border">
                  <h5 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: '#0F2C59' }}>
                    <i className="bi bi-person text-success"></i> Contact Information
                  </h5>
                  <p className="text-muted small mb-4">Provide your personal details for this order.</p>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1.5">First Name</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="Jane" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Last Name</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="Doe" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Email</label>
                      <input type="email" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="jane@example.com" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Phone</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="+1 (555) 000-0000" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                  </div>
                </div>

                {/* Shipping Address Block */}
                <div className="card p-4 rounded-3 border-0 bg-light bg-opacity-50 mb-4 border">
                  <h5 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: '#0F2C59' }}>
                    <i className="bi bi-geo-alt text-success"></i> Shipping Address
                  </h5>
                  <p className="text-muted small mb-4">Where should we deliver your order?</p>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-8">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Street Address</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="123 Main Street" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Apt / Suite</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="Optional" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-label small fw-bold text-secondary mb-1.5">City</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="New York" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-6 col-sm-4">
                      <label className="form-label small fw-bold text-secondary mb-1.5">State</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="NY" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-6 col-sm-4">
                      <label className="form-label small fw-bold text-secondary mb-1.5">ZIP Code</label>
                      <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="10001" style={{ borderRadius: '6px', fontSize: '14px' }} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-secondary mb-1.5">Country</label>
                      <select className="form-select bg-white shadow-none border py-2.5 px-3" style={{ borderRadius: '6px', fontSize: '14px', color: '#666' }}>
                        <option>Select a country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2 mt-4">
                    <label className="d-flex align-items-center gap-2 small cursor-pointer text-secondary fw-semibold">
                      <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} /> Save this address
                    </label>
                    <label className="d-flex align-items-center gap-2 small cursor-pointer text-secondary fw-semibold">
                      <input type="checkbox" className="form-check-input shadow-none border" defaultChecked style={{ width: '16px', height: '16px' }} /> Same as billing address
                    </label>
                  </div>
                </div>

                {/* Payment Channel Block Tabs Layout */}
                <div className="card p-4 rounded-3 border-0 bg-light bg-opacity-50 mb-4 border">
                  <h5 className="fw-bold mb-1 text-dark d-flex align-items-center gap-2" style={{ color: '#0F2C59' }}>
                    <i className="bi bi-credit-card text-success"></i> Payment Method
                  </h5>
                  <p className="text-muted small mb-4">All transactions are encrypted and secure.</p>

                  {/* Payment Type Selection Buttons */}
                  <div className="row g-2 mb-4">
                    <div className="col-4">
                      <button 
                        type="button" 
                        onClick={() => setPaymentType('card')}
                        className="btn w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-1.5 border" 
                        style={{ 
                          fontSize: '13px', 
                          borderRadius: '6px',
                          backgroundColor: paymentType === 'card' ? '#fff' : 'transparent',
                          borderColor: paymentType === 'card' ? '#0AA586' : '#e2e8f0',
                          color: paymentType === 'card' ? '#0AA586' : '#64748b',
                          boxShadow: paymentType === 'card' ? '0 1px 3px rgba(10,165,134,0.1)' : 'none'
                        }}
                      >
                        <i className="bi bi-credit-card-2-front"></i> Credit Card
                      </button>
                    </div>
                    <div className="col-4">
                      <button 
                        type="button" 
                        onClick={() => setPaymentType('paypal')}
                        className="btn w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-1.5 border" 
                        style={{ 
                          fontSize: '13px', 
                          borderRadius: '6px',
                          backgroundColor: paymentType === 'paypal' ? '#fff' : 'transparent',
                          borderColor: paymentType === 'paypal' ? '#0AA586' : '#e2e8f0',
                          color: paymentType === 'paypal' ? '#0AA586' : '#64748b'
                        }}
                      >
                        <i className="bi bi-paypal"></i> PayPal
                      </button>
                    </div>
                    <div className="col-4">
                      <button 
                        type="button" 
                        onClick={() => setPaymentType('apple')}
                        className="btn w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-1.5 border" 
                        style={{ 
                          fontSize: '13px', 
                          borderRadius: '6px',
                          backgroundColor: paymentType === 'apple' ? '#fff' : 'transparent',
                          borderColor: paymentType === 'apple' ? '#0AA586' : '#e2e8f0',
                          color: paymentType === 'apple' ? '#0AA586' : '#64748b'
                        }}
                      >
                        <i className="bi bi-apple"></i> Apple Pay
                      </button>
                    </div>
                  </div>

                  {paymentType === 'card' && (
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label small fw-bold text-secondary mb-1.5">Card Number</label>
                        <div className="position-relative">
                          <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3 pe-5" placeholder="4242 4242 4242 4242" style={{ borderRadius: '6px', fontSize: '14px' }} />
                          <div className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted d-flex gap-1 fs-5 opacity-50">
                            <i className="bi bi-credit-card"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <label className="form-label small fw-bold text-secondary mb-1.5">Expiry</label>
                        <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="MM / YY" style={{ borderRadius: '6px', fontSize: '14px' }} />
                      </div>
                      <div className="col-12 col-sm-4">
                        <label className="form-label small fw-bold text-secondary mb-1.5">Security Code</label>
                        <div className="position-relative">
                          <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3 pe-4" placeholder="CVC" style={{ borderRadius: '6px', fontSize: '14px' }} />
                          <i className="bi bi-question-circle text-muted opacity-50 position-absolute end-0 top-50 translate-middle-y me-2.5 cursor-pointer"></i>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <label className="form-label small fw-bold text-secondary mb-1.5">Name on Card</label>
                        <input type="text" className="form-control bg-white shadow-none border py-2.5 px-3" placeholder="Jane Doe" style={{ borderRadius: '6px', fontSize: '14px' }} />
                      </div>
                    </div>
                  )}

                  {paymentType === 'paypal' && <div className="p-3 text-center text-muted border border-dashed rounded-3 bg-white small">You will be redirected to PayPal ecosystem pipeline to finalize configuration safely.</div>}
                  {paymentType === 'apple' && <div className="p-3 text-center text-muted border border-dashed rounded-3 bg-white small">Apple Wallet access validation framework requested securely.</div>}
                </div>

                {/* Final Agreements and Terms */}
                <div className="mb-4 ps-1">
                  <label className="d-flex align-items-start gap-2 small cursor-pointer text-muted fw-medium lh-base">
                    <input type="checkbox" className="form-check-input shadow-none border mt-1" required style={{ width: '16px', height: '16px' }} />
                    <span>I agree to the <a href="#terms" className="text-success text-decoration-none fw-semibold">Terms of Service</a> and <a href="#privacy" className="text-success text-decoration-none fw-semibold">Privacy Policy</a></span>
                  </label>
                </div>

                <button type="submit" className="btn w-100 text-white fw-bold py-3 border-0 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '16px' }}>
                  <i className="bi bi-lock-fill"></i> Place Order — $240.96
                </button>
              </form>
            </div>

            {/* RIGHT ROW: Sticky Floating Itemised Invoice Sidebar Container */}
            <div className="col-12 col-xl-5">
              <div className="card p-4 rounded-3 bg-white border shadow-sm sticky-top" style={{ top: '24px' }}>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                  <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: '18px', color: '#0F2C59' }}>Order Summary</h4>
                  <span className="badge rounded-pill text-success px-2.5 py-1.5 fw-bold" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                    2 items
                  </span>
                </div>

                {/* Nested Item Rows List Mapping */}
                <div className="d-flex flex-column gap-3 mb-4 border-bottom pb-4">
                  
                  {/* Item 1 */}
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-2.5">
                      <div className="border rounded-2 p-1 bg-light text-center d-flex align-items-center justify-content-center position-relative" style={{ width: '60px', height: '60px' }}>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: '10px', padding: '4px 6px' }}>1</span>
                        <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&auto=format&fit=crop&q=80" alt="Glasses placeholder" className="img-fluid object-contain" style={{ maxHeight: '48px', mixBlendMode: 'multiply' }} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark text-truncate" style={{ fontSize: '14.5px', maxWidth: '220px' }}>Consectetur Vestibulum</h6>
                        <small className="text-muted d-block" style={{ fontSize: '12px' }}>Color: Charcoal · Size: M</small>
                      </div>
                    </div>
                    <span className="fw-bold text-dark" style={{ fontSize: '14.5px' }}>$89.99</span>
                  </div>

                  {/* Item 2 */}
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-2.5">
                      <div className="border rounded-2 p-1 bg-light text-center d-flex align-items-center justify-content-center position-relative" style={{ width: '60px', height: '60px' }}>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: '10px', padding: '4px 6px' }}>2</span>
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80" alt="Shoe placeholder" className="img-fluid object-contain" style={{ maxHeight: '48px', mixBlendMode: 'multiply' }} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark text-truncate" style={{ fontSize: '14.5px', maxWidth: '220px' }}>Praesent Elementum</h6>
                        <small className="text-muted d-block" style={{ fontSize: '12px' }}>Color: Pearl · Size: L</small>
                      </div>
                    </div>
                    <span className="fw-bold text-dark" style={{ fontSize: '14.5px' }}>$59.99</span>
                  </div>

                </div>

                {/* Promo Coupon Entry Field */}
                <div className="input-group border rounded-2 p-1 bg-white mb-4">
                  <input type="text" className="form-control border-0 bg-transparent shadow-none ps-2 fw-medium" placeholder="Promo code" style={{ fontSize: '14px' }} />
                  <button className="btn btn-link text-success text-decoration-none px-3 fw-bold border-0" style={{ color: '#0AA586' }} type="button">Apply</button>
                </div>

                {/* Ledger Financial Breakdown Itemization */}
                <div className="d-flex flex-column gap-3 border-bottom pb-3 text-secondary" style={{ fontSize: '14px' }}>
                  <div className="d-flex justify-content-between align-items-center"><span>Subtotal</span><strong className="text-dark">$209.97</strong></div>
                  <div className="d-flex justify-content-between align-items-center"><span>Shipping</span><strong className="text-dark">$9.99</strong></div>
                  <div className="d-flex justify-content-between align-items-center"><span>Tax (est.)</span><strong className="text-dark">$21.00</strong></div>
                </div>

                <div className="d-flex justify-content-between align-items-center py-4 border-bottom mb-3">
                  <span className="fw-bold text-dark" style={{ fontSize: '15px' }}>Total</span>
                  <span className="fw-extrabold text-dark h4 mb-0" style={{ color: '#0F2C59' }}>$240.96</span>
                </div>

                {/* Secure Trust Lock Layer Label */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2">
                  <div className="text-success small fw-semibold d-flex align-items-center gap-1.5" style={{ color: '#0AA586', fontSize: '13px' }}>
                    <i className="bi bi-shield-lock-fill"></i> Secure Checkout
                  </div>
                  <div className="d-flex gap-2 text-muted fs-5 opacity-40">
                    <i className="bi bi-credit-card"></i>
                    <i className="bi bi-paypal"></i>
                    <i className="bi bi-apple"></i>
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

export default Checkout;