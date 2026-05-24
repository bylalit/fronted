import  { useState } from 'react';

const ProductDetails = () => {
  // Image switcher state gallery mechanics
  const imagesList = [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80", // Main tan bag view
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80", // Alternate inner close-up
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80", // Model holding style context
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80", // Flat lay display
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80"  // Detailed hardware view
  ];

  const [activeImage, setActiveImage] = useState(imagesList[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Obsidian');

  // Review Mock Data mapped precisely to match your asset template values
  const testimonials = [
    {
      id: 1,
      rating: 5,
      isHalfStar: false,
      text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum ante ipsum.",
      name: "Sophia Hartwell",
      role: "Brand Strategist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      rating: 5,
      isHalfStar: false,
      text: "Curabitur pretium tincidunt lacus nulla gravida orci a odio dignissim congue rutrum at lorem et iaculis amet consequat vestibulum nulla facilisi morbi tempus.",
      name: "Marcus Ellison",
      role: "VP of Engineering",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80",
      highlightBorder: true
    },
    {
      id: 3,
      rating: 4,
      isHalfStar: true,
      text: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor maecenas faucibus mollis interdum tempor.",
      name: "Leona Mitchell",
      role: "Operations Lead",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      rating: 5,
      isHalfStar: false,
      text: "Donec ullamcorper nulla non metus auctor fringilla integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
      name: "Julian Prescott",
      role: "Creative Director",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      rating: 5,
      isHalfStar: false,
      text: "Aenean lacinia bibendum nulla sed consectetur praesent commodo cursus magna vel scelerisque nisl consectetur et vivamus sagittis lacus augue.",
      name: "Clara Jennings",
      role: "Product Architect",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      highlightBorder: true
    },
    {
      id: 6,
      rating: 5,
      isHalfStar: false,
      text: "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus etiam porta.",
      name: "Owen Blackwood",
      role: "Platform Analyst",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <>
      <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Product Details</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Product Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. CORE BUYING CONTROLS FRAMEWORK ================= */}
        <div className="container px-md-5 mt-5">
          <div className="row g-5">
            
            {/* LEFT ROW: Gallery Multi-Image Workspace Panel */}
            <div className="col-12 col-lg-6">
              <div className="card border rounded-3 overflow-hidden bg-light position-relative p-4 text-center d-flex align-items-center justify-content-center" style={{ minHeight: '480px' }}>
                <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-3 py-2 fw-bold text-white bg-danger" style={{ fontSize: '12px' }}>
                  -21%
                </span>
                <img 
                  src={activeImage} 
                  alt="Primary presentation gear" 
                  className="img-fluid object-contain"
                  style={{ maxHeight: '420px', mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Dynamic Action Trigger Switcher Thumbnails */}
              <div className="d-flex gap-2.5 mt-3 justify-content-start overflow-auto pb-2">
                {imagesList.map((imgUrl, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`card p-1 bg-light rounded-2 cursor-pointer border-2`}
                    style={{ 
                      width: '85px', 
                      height: '85px', 
                      borderColor: activeImage === imgUrl ? '#0AA586' : '#E2E8F0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={imgUrl} alt="Thumbnail view" className="w-100 h-100 object-contain" style={{ mixBlendMode: 'multiply' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ROW: Pricing, Options & Specs Column */}
            <div className="col-12 col-lg-6">
              <div>
                <span className="badge rounded-pill px-3 py-2 fw-bold mb-3" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                  Sound Equipment
                </span>
                <span className="text-success small fw-bold float-end d-flex align-items-center gap-1.5" style={{ fontSize: '14px' }}>
                  <span className="rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px' }}></span> In Stock
                </span>

                <h1 className="fw-bold mb-3 text-dark lh-base" style={{ fontSize: '28px', color: '#0F2C59' }}>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                </h1>

                {/* Rating Layer */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="text-warning small d-flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <span className="text-dark fw-bold small">4.6</span>
                  <span className="text-muted small border-start ps-2">143 ratings</span>
                  <span className="text-danger small fw-bold border-start ps-2">18 remaining</span>
                </div>

                {/* Pricing Block Card Container */}
                <div className="card border-0 rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between flex-row flex-wrap gap-3" style={{ backgroundColor: '#F8FAFC' }}>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="fw-extrabold text-dark h2 mb-0" style={{ color: '#0F2C59' }}>$189.99</span>
                    <span className="text-muted text-decoration-line-through text-md">$239.99</span>
                  </div>
                  <span className="badge border px-2.5 py-1.5 text-success fw-bold font-normal" style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', fontSize: '12px' }}>
                    Save $50.00
                  </span>
                </div>

                <p className="text-secondary small lh-base mb-4" style={{ fontSize: '14.5px' }}>
                  Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                </p>

                {/* Color Choice Picker Swatch */}
                <div className="mb-4">
                  <div className="text-dark fw-bold small mb-2">Color — <span className="text-muted fw-semibold">{selectedColor}</span></div>
                  <div className="d-flex gap-2">
                    {[
                      { name: 'Obsidian', color: '#0f172a' },
                      { name: 'Alabaster', color: '#f1f5f9' },
                      { name: 'Classic Blue', color: '#1d4ed8' },
                      { name: 'Forest Green', color: '#14532d' }
                    ].map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedColor(item.name)}
                        className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '26px', 
                          height: '26px', 
                          backgroundColor: item.color,
                          outline: selectedColor === item.name ? '2px solid #0AA586' : 'none',
                          outlineOffset: '2px'
                        }}
                      >
                        {selectedColor === item.name && <i className={`bi bi-check text-${item.name === 'Alabaster' ? 'dark' : 'white'} small`}></i>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Counter Input Box / Button Actions Row */}
                <div className="row g-2 mb-4 align-items-center">
                  <div className="col-4 col-sm-3">
                    <div className="input-group border rounded-2 bg-white" style={{ height: '44px' }}>
                      <button className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                      <span className="form-control text-center bg-transparent border-0 d-flex align-items-center justify-content-center fw-bold p-0">{quantity}</span>
                      <button className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="col-8 col-sm-7">
                    <button className="btn w-100 text-white fw-bold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm" style={{ backgroundColor: '#0AA586', height: '44px', borderRadius: '6px' }}>
                      <i className="bi bi-bag-plus"></i> Add to Cart
                    </button>
                  </div>
                  <div className="col-12 col-sm-2 text-center text-sm-start">
                    <button className="btn border bg-white rounded-2 d-inline-flex align-items-center justify-content-center text-secondary shadow-sm" style={{ width: '44px', height: '44px' }} title="Wishlist">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>

                {/* Secondary Express Action Route Button */}
                <button className="btn btn-light bg-transparent border w-100 text-secondary py-2.5 fw-bold mb-4 d-flex align-items-center justify-content-center gap-1.5" style={{ borderRadius: '6px', fontSize: '14px' }}>
                  <i className="bi bi-lightning-charge"></i> Purchase Instantly
                </button>

                {/* Micro Guarantee Value Grid Props */}
                <div className="row g-2 border-top pt-4 text-muted" style={{ fontSize: '13px' }}>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-truck text-success fs-5"></i> Free shipping $75+</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-arrow-counterclockwise text-success fs-5"></i> 45-day returns</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-shield-check text-success fs-5"></i> 3-year warranty</div>
                  <div className="col-6 d-flex align-items-center gap-2"><i className="bi bi-headset text-success fs-5"></i> 24/7 support</div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ================= 3. DESCRIPTIONS & TECHNICAL SPECIFICATIONS TAB PANELS ================= */}
        <div className="container px-md-5 mt-5 pt-4">
          <div className="card border rounded-3 bg-white shadow-sm overflow-hidden">
            
            {/* Headers Toggles */}
            <div className="d-flex bg-light border-bottom text-muted fw-bold" style={{ fontSize: '15px' }}>
              <span onClick={() => setActiveTab('description')} className={`px-4 py-3 cursor-pointer ${activeTab === 'description' ? 'bg-white text-success border-bottom border-3 border-success' : ''}`} style={{ cursor: 'pointer', color: activeTab === 'description' ? '#0AA586' : 'inherit' }}>Description</span>
              <span onClick={() => setActiveTab('specifications')} className={`px-4 py-3 cursor-pointer ${activeTab === 'specifications' ? 'bg-white text-success border-bottom border-3 border-success' : ''}`} style={{ cursor: 'pointer', color: activeTab === 'specifications' ? '#0AA586' : 'inherit' }}>Specifications</span>
              <span onClick={() => setActiveTab('feedback')} className={`px-4 py-3 cursor-pointer ${activeTab === 'feedback' ? 'bg-white text-success border-bottom border-3 border-success' : ''}`} style={{ cursor: 'pointer', color: activeTab === 'feedback' ? '#0AA586' : 'inherit' }}>Feedback (143)</span>
            </div>

            {/* Inner Interactive Details Container */}
            <div className="p-4 p-md-5">
              {activeTab === 'description' && (
                <div className="row g-4 justify-content-between">
                  <div className="col-12 col-lg-7">
                    <h4 className="fw-bold mb-3" style={{ color: '#0F2C59' }}>About This Product</h4>
                    <p className="text-secondary small lh-base mb-4">
                      Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.
                    </p>
                    <h5 className="fw-bold mb-3 text-dark">Feature Highlights</h5>
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <div className="card p-3 border rounded-3 bg-light d-flex flex-row gap-3 align-items-start">
                          <i className="bi bi-waveform text-success fs-4"></i>
                          <div><h6 className="fw-bold text-dark mb-1">Premium Sound</h6><small className="text-muted d-block" style={{ fontSize: '11px' }}>Temporibus autem quibusdam officiis debitis rerum</small></div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="card p-3 border rounded-3 bg-light d-flex flex-row gap-3 align-items-start">
                          <i className="bi bi-battery-charging text-success fs-4"></i>
                          <div><h6 className="fw-bold text-dark mb-1">Extended Battery</h6><small className="text-muted d-block" style={{ fontSize: '11px' }}>Saepe eveniet ut et voluptates repudiandae sint</small></div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="card p-3 border rounded-3 bg-light d-flex flex-row gap-3 align-items-start">
                          <i className="bi bi-bluetooth text-success fs-4"></i>
                          <div><h6 className="fw-bold text-dark mb-1">Seamless Pairing</h6><small className="text-muted d-block" style={{ fontSize: '11px' }}>Itaque earum rerum hic tenetur sapiente delectus</small></div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="card p-3 border rounded-3 bg-light d-flex flex-row gap-3 align-items-start">
                          <i className="bi bi-gem text-success fs-4"></i>
                          <div><h6 className="fw-bold text-dark mb-1">Ergonomic Design</h6><small className="text-muted d-block" style={{ fontSize: '11px' }}>Aut reiciendis voluptatibus maiores alias consequatur</small></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Included Checklist Column Box Sidebar */}
                  <div className="col-12 col-lg-4">
                    <div className="card p-4 rounded-3 border-0" style={{ backgroundColor: '#F8FAFC' }}>
                      <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#0F2C59' }}>
                        <i className="bi bi-box-seam text-success"></i> What's Included
                      </h5>
                      <ul className="list-unstyled d-flex flex-column gap-3 mb-0 text-secondary" style={{ fontSize: '14px' }}>
                        {["Premium Audio Device", "Protective Travel Case", "USB-C Charging Cable", "3.5mm AUX Connector", "Setup Manual", "Warranty Certificate"].map((item, key) => (
                          <li key={key} className="d-flex align-items-center gap-2">
                            <i className="bi bi-check-circle text-success fw-bold"></i> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h4 className="fw-bold mb-4" style={{ color: '#0F2C59' }}>Technical Specifications</h4>
                  <table className="table table-striped table-bordered small">
                    <tbody>
                      <tr><td className="fw-bold w-25">Connectivity</td><td>Wireless Bluetooth 5.2 / 3.5mm Jack</td></tr>
                      <tr><td className="fw-bold">Battery Life</td><td>Up to 40 Hours Active Playback</td></tr>
                      <tr><td className="fw-bold">Charging Port</td><td>USB Type-C Fast Charging</td></tr>
                      <tr><td className="fw-bold">Water Resistance</td><td>IPX4 Splashproof Rating</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <h4 className="fw-bold mb-3" style={{ color: '#0F2C59' }}>User Submissions Summary</h4>
                  <p className="text-muted small">Showing highest ranking feedback verified records across the global network pipeline channels.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ================= 4. TESTIMONIAL REVIEWS GRID PLUG-IN TEMPLATE ================= */}
        <div className="bg-light py-5 mt-5 border-top">
          <div className="container px-md-5 py-2">
            <div className="row mb-4"><div className="col-12"><h3 className="fw-bold" style={{ color: '#0F2C59' }}>Product Reviews</h3></div></div>
            <div className="row g-4 row-cols-1 row-cols-md-2">
              {testimonials.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card h-100 p-4 border shadow-sm bg-white rounded-3" style={{ borderColor: item.highlightBorder ? '#C6E7E1' : '#E2E8F0' }}>
                    <div className="text-warning mb-3 d-flex gap-0.5" style={{ fontSize: '14px' }}>
                      {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (<i key={i} className="bi bi-star-fill"></i>))}
                      {item.isHalfStar && <i className="bi bi-star-half"></i>}
                    </div>
                    <p className="text-secondary lh-base mb-4" style={{ fontSize: '14.5px' }}>{item.text}</p>
                    <hr className="text-muted opacity-25 my-3" />
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.img} alt={item.name} className="rounded-circle object-cover" style={{ width: '42px', height: '42px', objectFit: 'cover' }} />
                      <div>
                        <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14.5px' }}>{item.name}</h6>
                        <small className="text-muted" style={{ fontSize: '12px' }}>{item.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section> 
    </>
  );
};

export default ProductDetails;