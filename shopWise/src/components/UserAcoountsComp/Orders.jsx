import  { useState } from 'react';

const Orders = () => {
  // Interactive UI view toggles for the primary active order (#ORD-2025-4781)
  const [showTrack, setShowTrack] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {/* Header Grid Actions Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>Purchase History</h3>
        <div className="d-flex gap-2 align-items-center">
          <div className="input-group bg-white rounded-2 border p-1" style={{ maxWidth: '220px' }}>
            <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search small"></i></span>
            <input type="text" className="form-control bg-transparent border-0 shadow-none p-1 small" placeholder="Find an order..." style={{ fontSize: '13px' }} />
          </div>
          <button className="btn bg-white border px-3 py-2 text-secondary fw-semibold small d-flex align-items-center gap-1.5" style={{ fontSize: '13px', borderRadius: '6px' }}>
            <i className="bi bi-filter"></i> Filter
          </button>
        </div>
      </div>

      {/* ---------------- CARD 1: ACTIVE ORDER (#ORD-2025-4781) ---------------- */}
      <div className="card rounded-3 border bg-white shadow-sm overflow-hidden mb-4">
        
        {/* Upper Metadata Block */}
        <div className="p-4 border-bottom bg-white">
          <div className="row g-3 align-items-center justify-content-between">
            <div className="col-auto">
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '15px' }}>#ORD-2025-4781</h6>
              <small className="text-muted fw-medium">Mar 12, 2025</small>
              
              {/* Mini Thumbnail Row Overlay list matching images */}
              <div className="d-flex gap-1.5 mt-2.5">
                <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
            </div>
            <div className="col-auto text-sm-end text-start">
              <span className="badge rounded-pill px-3 py-1.5 fw-bold mb-2 d-inline-block" style={{ backgroundColor: '#FFF3E0', color: '#E65100', fontSize: '12px' }}>
                Processing
              </span>
              <div className="text-muted small fw-medium mb-1">3 items</div>
              <strong className="text-dark fs-5 fw-extrabold d-block" style={{ color: '#0F2C59' }}>$789.99</strong>
            </div>
          </div>

          {/* Action Route Interactive Buttons */}
          <div className="d-flex gap-2 justify-content-end mt-3 border-top pt-3">
            <button 
              onClick={() => setShowTrack(!showTrack)}
              className={`btn btn-sm px-3 py-2 fw-bold d-flex align-items-center gap-1.5 ${showTrack ? 'btn-success text-white border-0' : 'btn-light border text-secondary'}`}
              style={{ backgroundColor: showTrack ? '#0AA586' : 'transparent', fontSize: '13px', borderRadius: '5px' }}
            >
              <i className="bi bi-geo-alt"></i> Track
            </button>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={`btn btn-sm px-3 py-2 fw-bold ${showDetails ? 'btn-success text-white border-0' : 'btn-light border text-dark'}`} 
              style={{ backgroundColor: showDetails ? '#0AA586' : 'transparent', fontSize: '13px', borderRadius: '5px' }}
            >
              View Details
            </button>
          </div>
        </div>

        {/* DYNAMIC EXPANDABLE TRACKING LOGISTICS STEPS VIEW */}
        {showTrack && (
          <div className="p-4 bg-light border-bottom text-center">
            <div className="d-flex justify-content-between align-items-center mx-auto position-relative py-3 flex-wrap flex-sm-nowrap gap-4" style={{ maxWidth: '650px' }}>
              <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary bg-opacity-25 w-100 d-none d-sm-block" style={{ height: '3px', zIndex: 0 }}></div>
              <div className="position-absolute top-50 start-0 translate-middle-y bg-success w-50 d-none d-sm-block" style={{ height: '3px', zIndex: 0, backgroundColor: '#0AA586' }}></div>

              {[
                { step: 1, title: 'Confirmed', desc: 'Mar 12, 10:30 AM', done: true, icon: 'bi-check-lg' },
                { step: 2, title: 'Processing', desc: 'Mar 12, 2:45 PM', done: true, icon: 'bi-check-lg' },
                { step: 3, title: 'Packaging', desc: 'Mar 12, 4:15 PM', current: true, icon: 'bi-box-seam' },
                { step: 4, title: 'In Transit', desc: '--', icon: 'bi-truck' },
                { step: 5, title: 'Delivered', desc: '--', icon: 'bi-house-door' }
              ].map((node, i) => (
                <div key={i} className="d-flex flex-column align-items-center position-relative z-1 flex-grow-1" style={{ minWidth: '90px' }}>
                  <span 
                    className="rounded-circle d-flex align-items-center justify-content-center border border-2 text-white shadow-sm" 
                    style={{ 
                      width: '34px', 
                      height: '34px', 
                      backgroundColor: node.current ? '#E65100' : (node.done ? '#0AA586' : '#fff'),
                      borderColor: node.current ? '#E65100' : (node.done ? '#0AA586' : '#cbd5e1')
                    }}
                  >
                    <i className={`bi ${node.icon} ${!node.done && !node.current ? 'text-secondary' : 'text-white'}`} style={{ fontSize: '13px' }}></i>
                  </span>
                  <span className="fw-bold mt-2 text-dark d-block" style={{ fontSize: '12px' }}>{node.title}</span>
                  <small className="text-muted mt-0.5 d-block" style={{ fontSize: '10px' }}>{node.desc}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DYNAMIC EXPANDABLE DETAIL SHEET VIEW */}
        {showDetails && (
          <div className="p-4 bg-white border-top">
            <div className="row g-4">
              <div className="col-12 col-md-6 small text-secondary border-end">
                <h6 className="fw-bold text-muted text-uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Order Information</h6>
                <div className="d-flex justify-content-between mb-2"><span>Payment</span><strong className="text-dark">Credit Card (**** 4589)</strong></div>
                <div className="d-flex justify-content-between mb-4"><span>Shipping</span><strong className="text-dark">Express Delivery (2-3 days)</strong></div>
                
                <h6 className="fw-bold text-muted text-uppercase mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Delivery Address</h6>
                <div className="text-dark fw-medium lh-base">
                  Elena Mitchell<br />
                  742 Evergreen Terrace<br />
                  Unit 12A<br />
                  Chicago, IL 60614<br />
                  <span className="text-muted mt-1.5 d-block">+1 (555) 472-8391</span>
                </div>
              </div>

              <div className="col-12 col-md-6 small">
                <h6 className="fw-bold text-muted text-uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Items (3)</h6>
                <div className="d-flex flex-column gap-3 mb-4">
                  {[
                    { name: 'Vestibulum ante ipsum primis', sku: 'PRD-001', qty: 1, cost: 899.99, url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Fusce dapibus tellus cursus', sku: 'PRD-002', qty: 2, cost: 599.95, url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=60&auto=format&fit=crop&q=80' },
                    { name: 'Maecenas faucibus mollis', sku: 'PRD-003', qty: 1, cost: 129.99, url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=60&auto=format&fit=crop&q=80' }
                  ].map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center justify-content-between gap-2 border-bottom pb-2">
                      <div className="d-flex align-items-center gap-2">
                        <img src={item.url} alt="pic" className="border rounded bg-light p-0.5" style={{ width: '42px', height: '42px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        <div>
                          <span className="fw-semibold text-dark d-block text-truncate" style={{ maxWidth: '180px' }}>{item.name}</span>
                          <small className="text-muted d-block" style={{ fontSize: '10px' }}>SKU: {item.sku} · Qty: {item.qty}</small>
                        </div>
                      </div>
                      <strong className="text-dark">${item.cost}</strong>
                    </div>
                  ))}
                </div>

                <div className="d-flex flex-column gap-2 text-secondary pt-2">
                  <div className="d-flex justify-content-between"><span>Subtotal</span><span className="text-dark fw-medium">$1,929.93</span></div>
                  <div className="d-flex justify-content-between"><span>Shipping</span><span className="text-dark fw-medium">$15.99</span></div>
                  <div className="d-flex justify-content-between"><span>Tax</span><span className="text-dark fw-medium">$159.98</span></div>
                  <div className="d-flex justify-content-between border-top pt-2 fw-bold text-dark fs-6">
                    <span>Total</span><span style={{ color: '#0AA586' }}>$2,105.90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------- CARD 2: SHIPPED ORDER ---------------- */}
      <div className="card rounded-3 border bg-white shadow-sm p-4 mb-4">
        <div className="row g-3 align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '15px' }}>#ORD-2025-4756</h6>
            <small className="text-muted fw-medium">Mar 5, 2025</small>
            <div className="d-flex gap-1.5 mt-2.5">
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </div>
          </div>
          <div className="text-sm-end text-start">
            <span className="badge rounded-pill px-3 py-1.5 fw-bold mb-2 d-inline-block" style={{ backgroundColor: '#E3F2FD', color: '#1E88E5', fontSize: '12px' }}>
              Shipped
            </span>
            <div className="text-muted small fw-medium mb-1">2 items</div>
            <strong className="text-dark fs-5 fw-extrabold d-block" style={{ color: '#0F2C59' }}>$459.99</strong>
          </div>
        </div>
      </div>

      {/* ---------------- CARD 3: DELIVERED ORDER ---------------- */}
      <div className="card rounded-3 border bg-white shadow-sm p-4 mb-4">
        <div className="row g-3 align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '15px' }}>#ORD-2025-4738</h6>
            <small className="text-muted fw-medium">Feb 28, 2025</small>
            <div className="d-flex gap-1.5 mt-2.5">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </div>
          </div>
          <div className="text-sm-end text-start">
            <span className="badge rounded-pill px-3 py-1.5 fw-bold mb-2 d-inline-block" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontSize: '12px' }}>
              Delivered
            </span>
            <div className="text-muted small fw-medium mb-1">1 item</div>
            <strong className="text-dark fs-5 fw-extrabold d-block" style={{ color: '#0F2C59' }}>$129.99</strong>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end mt-3 border-top pt-3">
          <button className="btn btn-sm border text-success fw-bold px-3 py-2" style={{ borderColor: '#0AA586', color: '#0AA586', fontSize: '13px', borderRadius: '5px', backgroundColor: '#E2F2EE' }}><i className="bi bi-star"></i> Leave Review</button>
          <button className="btn btn-sm btn-light border px-3 py-2 text-dark fw-bold" style={{ fontSize: '13px', borderRadius: '5px' }}>View Details</button>
        </div>
      </div>

      {/* ---------------- CARD 4: CANCELLED ORDER ---------------- */}
      <div className="card rounded-3 border bg-white shadow-sm p-4 mb-4">
        <div className="row g-3 align-items-center justify-content-between">
          <div>
            <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '15px' }}>#ORD-2025-4720</h6>
            <small className="text-muted fw-medium">Feb 22, 2025</small>
            <div className="d-flex gap-1.5 mt-2.5 align-items-center">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=50&auto=format&fit=crop&q=80" alt="item" className="border rounded bg-light p-0.5" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              <span className="badge bg-light border text-muted px-2 py-2" style={{ fontSize: '12px', height: '36px', display: 'flex', alignItems: 'center' }}>+2</span>
            </div>
          </div>
          <div className="text-sm-end text-start">
            <span className="badge rounded-pill px-3 py-1.5 fw-bold mb-2 d-inline-block" style={{ backgroundColor: '#FFEBEE', color: '#C62828', fontSize: '12px' }}>
              Cancelled
            </span>
            <div className="text-muted small fw-medium mb-1">5 items</div>
            <strong className="text-dark fs-5 fw-extrabold d-block" style={{ color: '#0F2C59' }}>$1,299.99</strong>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end mt-3 border-top pt-3">
          <button className="btn btn-sm border text-danger fw-bold px-4 py-2" style={{ borderColor: '#FFCDD2', backgroundColor: '#FFEBEE', fontSize: '13px', borderRadius: '5px' }}>Reorder</button>
          <button className="btn btn-sm btn-light border px-3 py-2 text-dark fw-bold" style={{ fontSize: '13px', borderRadius: '5px' }}>View Details</button>
        </div>
      </div>

      {/* PAGINATION MATRIX BAR */}
      <div className="d-flex justify-content-center mt-5">
        <nav aria-label="Purchase navigation page items">
          <ul className="pagination pagination-sm mb-0 align-items-center gap-1">
            <li className="page-item disabled"><span className="page-link border rounded-2 px-2.5 py-1.5"><i className="bi bi-chevron-left"></i></span></li>
            <li className="page-item active"><span className="page-link border rounded-2 px-3 py-1.5 fw-bold" style={{ backgroundColor: '#0AA586', borderColor: '#0AA586' }}>1</span></li>
            <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#p2">2</a></li>
            <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#p3">3</a></li>
            <li className="page-item disabled"><span className="px-1 text-muted fw-bold">...</span></li>
            <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#p12">12</a></li>
            <li className="page-item"><a className="page-link border rounded-2 px-2.5 py-1.5 text-secondary" href="#p2"><i className="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Orders;