
const LookBack = () => {
  // Category section data matching your screenshot cards
  const categories = [
    {
      id: 1,
      title: "Modern Menswear",
      count: "245 products",
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Everyday Essentials",
      count: "189 products",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Beauty Rituals",
      count: "112 products",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Travel Gear",
      count: "327 products",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="w-100 py-5 bg-white">
      <div className="container py-3">
        
        {/* ================= 1. WINTER LOOKBOOK BANNER ROW ================= */}
        <div className="row g-0 rounded-3 gap-2 overflow-hidden mb-5 border shadow-sm">
          {/* Left Side: Creative Image Box */}
          <div className="col-12 col-md-7 position-relative"  style={{ minHeight: '380px' }}>
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80" 
              alt="Creative designer lookbook" 
              className="w-100 h-100 object-cover position-absolute rounded-3 top-0 start-0"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right Side: Informative Text Card */}
          <div className="col-12 col-md-4 bg-white p-5 d-flex flex-column justify-content-center">
            <div>
              <span 
                className="badge rounded-pill px-3 py-1.5 fw-semibold mb-3" 
                style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '11px' }}
              >
                NEW SEASON
              </span>
              <h2 className="fw-bold mb-3" style={{ color: '#0F2C59', fontSize: '28px' }}>
                Winter Lookbook
              </h2>
              <p className="text-muted small lh-base mb-4">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae ultricies eget.
              </p>

              {/* Checklist Features */}
              <div className="d-flex flex-column gap-2 mb-4 text-secondary" style={{ fontSize: '14px' }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle text-success" style={{ color: '#0AA586' }}></i>
                  <span>Curated seasonal selections</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle text-success" style={{ color: '#0AA586' }}></i>
                  <span>Exclusive online availability</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle text-success" style={{ color: '#0AA586' }}></i>
                  <span>Complimentary shipping included</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="btn text-white px-4 py-2 fw-medium border-0 d-inline-flex align-items-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}>
                <span>Explore Collection</span> <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>


        {/* ================= 2. FOUR-COLUMN CATEGORY GRID ================= */}
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
          {categories.map((cat) => (
            <div className="col" key={cat.id}>
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                
                {/* Visual Frame */}
                <div style={{ height: '260px', overflow: 'hidden' }} className="bg-light">
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-100 h-100 object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>

                {/* Info Text Area */}
                <div className="p-4 border border-top-0 rounded-bottom-3">
                  <h5 className="fw-semibold mb-1" style={{ color: '#0F2C59', fontSize: '16px' }}>
                    {cat.title}
                  </h5>
                  <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                    {cat.count}
                  </p>
                  <a 
                    href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                    style={{ color: '#0AA586', fontSize: '13px' }}
                  >
                    <span>View All</span> <i className="bi bi-arrow-right" style={{ fontSize: '11px' }}></i>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LookBack
