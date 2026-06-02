import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link fallback structure updates
import { AuthContext } from "../../context/AuthContext";

const LookBack = () => {
  const url = "http://127.0.0.1:8000/api/category/";

  // Real database parameters store karne ke liye react state setup
  const [dbCategories, setDbCategories] = useState([]);
  const { setGlobalLoading } = useContext(AuthContext);

  const getCategory = async () => {
    setGlobalLoading(true); // 🔄 Global Full Screen Loader On
    try {
      let response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setDbCategories(data);
      }
    } catch (error) {
      console.error("Error fetching lookbook categories:", error);
    } finally {
      setGlobalLoading(false); // 🏁 Global Full Screen Loader Off
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // 🎯 FILTER LAYER: Backend payload me se sirf vahi elements filter honge jinka parent === null hai
  const parentCategories = dbCategories.filter((cat) => cat.parent === null);

  return (
    <section className="w-100 py-5 bg-white">
      <div className="container py-3">
        
        {/* ================= 1. WINTER LOOKBOOK BANNER ROW ================= */}
        <div className="row g-0 rounded-3 gap-2 overflow-hidden mb-5 border shadow-sm">
          {/* Left Side: Creative Image Box */}
          <div className="col-12 col-md-7 position-relative" style={{ minHeight: '380px' }}>
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
              <Link to="/category" className="btn text-white px-4 py-2 fw-medium border-0 d-inline-flex align-items-center gap-2 text-decoration-none" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}>
                <span>Explore Collection</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>


        {/* ================= 2. FOUR-COLUMN DYNAMIC CATEGORY GRID ================= */}
        {/* 🎯 FIXED: Purani local loading conditions ko hata kar safe direct response card loop locked kiya */}
        {parentCategories.length === 0 ? (
          <div className="text-center py-4 text-muted small">No parent categories available.</div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
            {parentCategories.map((cat) => {
              // FALLBACK IMAGE: Agar django admin panels me 'category_image' field khali hai toh layout safe crash safeguard active rahega
              const presentationImg = cat.category_image || "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400";

              return (
                <div className="col" key={cat.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                    
                    {/* Visual Frame */}
                    <div style={{ height: '260px', overflow: 'hidden' }} className="bg-light">
                      <img 
                        src={presentationImg} 
                        alt={cat.name} 
                        className="w-100 h-100 object-cover animate-fade"
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    </div>

                    {/* Info Text Area */}
                    <div className="p-4 border border-top-0 rounded-bottom-3">
                      <h5 className="fw-semibold mb-1 text-truncate" style={{ color: '#0F2C59', fontSize: '16px' }} title={cat.name}>
                        {cat.name}
                      </h5>
                      <p className="text-muted mb-3" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                        Global Main Department
                      </p>
                      
                      {/* View All dynamic action link redirects user to deep category view grids updates parameters */}
                      <Link 
                        to={`/category?id=${cat.id}`} 
                        className="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                        style={{ color: '#0AA586', fontSize: '13px' }}
                      >
                        <span>View Department</span> <i className="bi bi-arrow-right" style={{ fontSize: '11px' }}></i>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default LookBack;