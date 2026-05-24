

const HeroSection = () => {
  return (
    <>
        <section className="w-100 py-5" style={{ backgroundColor: '#F8FAFC' }}>
            <div className="container py-4">
                <div className="row g-4 align-items-center">
                
                    {/* LEFT SIDE: Text Contents & Call to Actions */}
                    <div className="col-12 col-xl-5 pe-xl-5">
                        {/* Tag */}
                        <span 
                        className="badge rounded-pill px-3 py-2 fw-semibold mb-3" 
                        style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px', letterSpacing: '0.5px' }}
                        >
                        CURATED SELECTION
                        </span>
                        
                        {/* Main Heading */}
                        <h1 className="display-4 fw-bold mb-4" style={{ color: '#0F2C59', lineHeight: '1.2' }}>
                        Discover What<br />Defines Modern Living
                        </h1>
                        
                        {/* Description Paragraph */}
                        <p className="text-muted mb-5 fs-6 lh-base" style={{ maxWidth: '450px' }}>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="d-flex flex-wrap gap-3 mb-5">
                        <button className="btn text-white px-4 py-2 fw-medium border-0 shadow-sm" style={{ backgroundColor: '#0AA586', borderRadius: '6px' }}>
                            Browse Items
                        </button>
                        <button className="btn btn-light bg-white border px-4 py-2 fw-medium text-secondary d-flex align-items-center gap-2" style={{ borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                            <i className="bi bi-arrow-right"></i> <span>See All Categories</span>
                        </button>
                        </div>
                        
                        {/* Trust Badges */}
                        <div className="d-flex flex-wrap gap-3 text-muted align-items-center" style={{ fontSize: '13px' }}>
                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-truck text-secondary"></i> Free Shipping
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-shield-check text-secondary"></i> Verified Quality
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-arrow-left-right text-secondary"></i> Easy Returns
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-chat-dots text-secondary"></i> 24/7 Support
                        </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Grid Grid Cards */}
                    <div className="col-12 col-xl-7">
                        <div className="row g-4">
                        
                        {/* Card 1: Precision Audio Hub */}
                        <div className="col-12 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                            <div className="position-relative p-4 text-center bg-light d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                                <span className="position-absolute top-0 start-0 m-3 badge bg-white text-secondary border px-2 py-1.5 fw-normal" style={{ fontSize: '11px' }}>
                                Best Seller
                                </span>
                                <img 
                                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80" 
                                alt="Precision Audio Hub" 
                                className="img-fluid object-contain"
                                style={{ maxHeight: '180px' }}
                                />
                            </div>
                            <div className="p-4">
                                <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '16px' }}>Precision Audio Hub</h5>
                                <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold fs-5 text-success" style={{ color: '#0AA586' }}>$219</span>
                                <span className="text-muted text-decoration-line-through small">$299</span>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Card 2: Smart Wearable Pro */}
                        <div className="col-12 col-sm-6">
                            <div className="card h-100 shadow-sm rounded-3 overflow-hidden bg-white" style={{ border: '1px solid #C6E7E1' }}>
                            <div className="position-relative p-4 text-center d-flex align-items-center justify-content-center" style={{ height: '240px', backgroundColor: '#F8FAFC' }}>
                                <span className="position-absolute top-0 start-0 m-3 badge px-2 py-1.5 fw-medium" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '11px' }}>
                                Trending Now
                                </span>
                                <img 
                                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80" 
                                alt="Smart Wearable Pro" 
                                className="img-fluid object-contain"
                                style={{ maxHeight: '140px' }}
                                />
                            </div>
                            <div className="p-4">
                                <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '16px' }}>Smart Wearable Pro</h5>
                                <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold fs-5 text-success" style={{ color: '#0AA586' }}>$159</span>
                                <span className="text-muted text-decoration-line-through small">$229</span>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Card 3: Horizontal Essential Daily Companion */}
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                            <div className="row g-0 align-items-center">
                                <div className="col-12 col-sm-5 position-relative p-4 text-center bg-light d-flex align-items-center justify-content-center" style={{ minHeight: '220px' }}>
                                <span className="position-absolute top-0 start-0 m-3 badge bg-white text-secondary border px-2 py-1.5 fw-normal" style={{ fontSize: '11px' }}>
                                    Just Launched
                                </span>
                                <img 
                                    src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80" 
                                    alt="Essential Daily Companion" 
                                    className="img-fluid object-contain"
                                    style={{ maxHeight: '170px' }}
                                />
                                </div>
                                <div className="col-12 col-sm-7 p-4">
                                <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '16px' }}>Essential Daily Companion</h5>
                                <p className="text-muted small mb-3 lh-base" style={{ maxWidth: '400px' }}>
                                    Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus curabitur.
                                </p>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold fs-5 text-success" style={{ color: '#0AA586' }}>$99</span>
                                    <span className="text-muted text-decoration-line-through small">$149</span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    </>
  )
}

export default HeroSection
