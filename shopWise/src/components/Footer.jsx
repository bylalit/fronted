

const Footer = () => {
  return (
    <footer className="w-100 font-sans position-relative">
      
      {/* 1. NEWSLETTER SECTION */}
      <div style={{ backgroundColor: '#f4f9f8' }} className="py-5 border-bottom">
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-3" style={{ color: '#0F2C59' }}>Join Our Newsletter</h2>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          
          {/* Form Input */}
          <div className="d-flex justify-content-center">
            <div className="input-group shadow-sm bg-white rounded-2 p-1" style={{ maxWidth: '550px', border: '1px solid #e2e8f0' }}>
              <input 
                type="email" 
                className="form-control border-0 bg-transparent shadow-none ps-3" 
                placeholder="Your email address" 
                aria-label="Your email address"
              />
              <button 
                className="btn text-white px-4 fw-medium border-0 rounded-2" 
                style={{ backgroundColor: '#0aa586' }} 
                type="button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT LINKS */}
      <div className="bg-white py-5">
        <div className="container py-4">
          <div className="row g-4 justify-content-between">
            
            {/* Column 1: Company Brand & Details */}
            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="fw-bold mb-4" style={{ color: '#0F2C59', letterSpacing: '-0.5px' }}>
                ShopWise
              </h3>
              <p className="text-muted lh-base mb-4" style={{ fontSize: '15px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nibh vehicula, facilisis magna ut, consectetur lorem.
              </p>
              <div className="d-flex flex-column gap-3 text-muted" style={{ fontSize: '15px' }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt text-success fs-5"></i>
                  <span>123 Fashion Street, New York, NY 10001</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone text-success fs-5"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope text-success fs-5"></i>
                  <span>hello@example.com</span>
                </div>
              </div>
            </div>

            {/* Column 2: Shop Links */}
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <h5 className="fw-bold mb-4" style={{ color: '#0F2C59', fontSize: '16px' }}>Shop</h5>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '15px' }}>
                <li><a href="#new-arrivals" className="text-muted text-decoration-none hover-link">New Arrivals</a></li>
                <li><a href="#bestsellers" className="text-muted text-decoration-none hover-link">Bestsellers</a></li>
                <li><a href="#womens" className="text-muted text-decoration-none hover-link">Women's Clothing</a></li>
                <li><a href="#mens" className="text-muted text-decoration-none hover-link">Men's Clothing</a></li>
                <li><a href="#accessories" className="text-muted text-decoration-none hover-link">Accessories</a></li>
                <li><a href="#sale" className="text-muted text-decoration-none hover-link">Sale</a></li>
              </ul>
            </div>

            {/* Column 3: Support Links */}
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <h5 className="fw-bold mb-4" style={{ color: '#0F2C59', fontSize: '16px' }}>Support</h5>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '15px' }}>
                <li><a href="#help" className="text-muted text-decoration-none hover-link">Help Center</a></li>
                <li><a href="#status" className="text-muted text-decoration-none hover-link">Order Status</a></li>
                <li><a href="#shipping" className="text-muted text-decoration-none hover-link">Shipping Info</a></li>
                <li><a href="#returns" className="text-muted text-decoration-none hover-link">Returns & Exchanges</a></li>
                <li><a href="#size-guide" className="text-muted text-decoration-none hover-link">Size Guide</a></li>
                <li><a href="#contact" className="text-muted text-decoration-none hover-link">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Company Links */}
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <h5 className="fw-bold mb-4" style={{ color: '#0F2C59', fontSize: '16px' }}>Company</h5>
              <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '15px' }}>
                <li><a href="#about" className="text-muted text-decoration-none hover-link">About Us</a></li>
                <li><a href="#careers" className="text-muted text-decoration-none hover-link">Careers</a></li>
                <li><a href="#press" className="text-muted text-decoration-none hover-link">Press</a></li>
                <li><a href="#affiliates" className="text-muted text-decoration-none hover-link">Affiliates</a></li>
                <li><a href="#responsibility" className="text-muted text-decoration-none hover-link">Responsibility</a></li>
                <li><a href="#investors" className="text-muted text-decoration-none hover-link">Investors</a></li>
              </ul>
            </div>

            {/* Column 5: App Download & Social Media */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="fw-bold mb-3" style={{ color: '#0F2C59', fontSize: '16px' }}>Download Our App</h5>
              <p className="text-muted mb-3" style={{ fontSize: '15px' }}>Shop on the go with our mobile app</p>
              
              {/* App Buttons */}
              <div className="d-flex gap-2 mb-4 flex-wrap">
                <button className="btn d-flex align-items-center gap-2 border rounded py-2 px-3 bg-light-hover" style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                  <i className="bi bi-apple fs-5 text-dark"></i>
                  <div className="text-start" style={{ lineHeight: '1' }}>
                    <small className="text-muted d-block" style={{ fontSize: '10px' }}>Download on the</small>
                    <span className="fw-semibold text-dark" style={{ fontSize: '14px' }}>App Store</span>
                  </div>
                </button>
                <button className="btn d-flex align-items-center gap-2 border rounded py-2 px-3 bg-light-hover" style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                  <i className="bi bi-google-play fs-5 text-dark"></i>
                  <div className="text-start" style={{ lineHeight: '1' }}>
                    <small className="text-muted d-block" style={{ fontSize: '10px' }}>GET IT ON</small>
                    <span className="fw-semibold text-dark" style={{ fontSize: '14px' }}>Google Play</span>
                  </div>
                </button>
              </div>

              {/* Social Icons */}
              <h6 className="text-muted fw-normal mb-3" style={{ fontSize: '15px' }}>Follow Us</h6>
              <div className="d-flex gap-2">
                {['facebook', 'instagram', 'twitter-x', 'tiktok', 'pinterest', 'youtube'].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={`#${social}`} 
                    className="d-flex align-items-center justify-content-center rounded-circle bg-light text-secondary text-decoration-none"
                    style={{ width: '36px', height: '36px', transition: '0.2s', fontSize: '14px' }}
                  >
                    <i className={`bi bi-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. SCROLL TO TOP FLOATING BUTTON */}
      <div className="position-absolute bottom-0 end-0 mb-4 me-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn text-white p-0 d-flex align-items-center justify-content-center rounded-2 shadow"
          style={{ backgroundColor: '#0aa586', width: '40px', height: '40px' }}
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up fs-5"></i>
        </button>
      </div>

    </footer>
  );
};

export default Footer;