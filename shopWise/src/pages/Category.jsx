import React from 'react';

const Category = () => {
  // Mock Data mimicking the image layout matches exactly
  const products = [
    {
      id: 1,
      tag: "",
      category: "EVERYDAY WEAR",
      title: "Aliquam Tincidunt",
      rating: 5,
      reviews: 42,
      price: 145.00,
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      tag: "Just Arrived",
      tagBg: "#E2F2EE",
      tagColor: "#0AA586",
      category: "MEN'S COLLECTION",
      title: "Vivamus Euismod",
      rating: 4,
      reviews: 29,
      price: 112.00,
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      tag: "-25%",
      tagBg: "#FEE2E2",
      tagColor: "#EF4444",
      category: "FASHION PICKS",
      title: "Nulla Facilisi",
      rating: 5,
      reviews: 57,
      price: 74.00,
      oldPrice: 99.00,
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      tag: "Just Arrived",
      tagBg: "#E2F2EE",
      tagColor: "#0AA586",
      category: "ACCESSORIES",
      title: "Interdum Malesuada",
      rating: 4.5,
      reviews: 31,
      price: 58.00,
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      tag: "",
      category: "OUTERWEAR",
      title: "Aenean Placerat",
      rating: 4,
      reviews: 39,
      price: 79.00,
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80"
    }
  ];

  const colors = ["#000000", "#ffffff", "#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#F97316", "#EC4899", "#78350F"];
  const brands = [
    { name: "Nike", count: 24 }, { name: "Adidas", count: 18 }, { name: "Puma", count: 12 },
    { name: "Reebok", count: 9 }, { name: "Under Armour", count: 7 }, { name: "New Balance", count: 6 },
    { name: "Converse", count: 5 }, { name: "Vans", count: 4 }
  ];

  return (
    <>
      {/* Dynamic CSS Injection for Hover Effects */}
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
      `}</style>

      <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* =================  BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Category</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Category</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= MAIN CONTENT SECTION (Sidebar + Grid) ================= */}
        <div className="container px-md-5 mt-5" >
          <div className="row g-4">
            
            {/* ==================== LEFT SIDEBAR FILTER CONTROLS ==================== */}
            <div className="col-12 col-lg-4">
              
              {/* 1. Category Tree Card */}
              <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
                <h5 className="fw-bold mb-4 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Categories</h5>
                
                <div className="d-flex flex-column gap-3" style={{ fontSize: '15px' }}>
                  <div>
                    <div className="d-flex justify-content-between text-dark fw-bold cursor-pointer align-items-center mb-2">
                      <span>Clothing</span>
                      <i className="bi bi-chevron-up text-muted small"></i>
                    </div>
                    <div className="d-flex flex-column gap-2 ps-3 text-muted fw-medium">
                      <span className="cursor-pointer text-success">Men's Wear</span>
                      <span className="cursor-pointer text-dark">Women's Wear</span>
                      <span className="cursor-pointer text-dark">Kids' Clothing</span>
                      <span className="cursor-pointer text-dark">Accessories</span>
                    </div>
                  </div>

                  <hr className="my-1 opacity-25" />

                  <div>
                    <div className="d-flex justify-content-between text-muted fw-semibold cursor-pointer align-items-center mb-2">
                      <span>Electronics</span>
                      <i className="bi bi-chevron-down small"></i>
                    </div>
                  </div>

                  {["Home & Kitchen", "Beauty & Personal Care", "Sports & Outdoors", "Books", "Toys & Games"].map((text, i) => (
                    <React.Fragment key={i}>
                      <hr className="my-1 opacity-25" />
                      <div className="d-flex justify-content-between text-muted fw-semibold cursor-pointer align-items-center">
                        <span>{text}</span>
                        <i className="bi bi-chevron-down small"></i>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 2. Color Filter Card */}
              <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
                <h5 className="fw-bold mb-3 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Filter by Color</h5>
                <div className="d-flex flex-wrap gap-2 mb-4 pt-2">
                  {colors.map((color, idx) => (
                    <button 
                      key={idx} 
                      className="rounded-circle border position-relative" 
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        backgroundColor: color, 
                        borderColor: color === '#ffffff' ? '#cbd5e1' : 'transparent',
                        outline: '1px solid #e2e8f0'
                      }}
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm btn-light border px-3 fw-semibold text-secondary" style={{ fontSize: '13px' }}>Clear All</button>
                  <button className="btn btn-sm text-white px-3 fw-semibold" style={{ backgroundColor: '#0AA586', fontSize: '13px' }}>Apply Filter</button>
                </div>
              </div>

              {/* 3. Brand Filter Card */}
              <div className="card border-0 p-4 rounded-3 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
                <h5 className="fw-bold mb-3 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Filter by Brand</h5>
                <div className="input-group border rounded-2 mb-3 bg-light p-1">
                  <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                  <input type="text" className="form-control bg-transparent border-0 shadow-none p-1 fw-medium" placeholder="Search brands..." style={{ fontSize: '14px' }} />
                </div>

                <div className="d-flex flex-column gap-2.5 mb-4 overflow-auto" style={{ maxHeight: '220px', fontSize: '15px' }}>
                  {brands.map((brand, idx) => (
                    <label key={idx} className="d-flex mb-2 justify-content-between align-items-center cursor-pointer text-secondary fw-medium">
                      <div className="d-flex align-items-center gap-2">
                        <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} />
                        <span>{brand.name}</span>
                      </div>
                      <span className="text-muted small fw-bold">({brand.count})</span>
                    </label>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm text-success p-0 border-0 fw-bold" style={{ color: '#0AA586', fontSize: '14px' }}>Apply Filter</button>
                  <button className="btn btn-sm text-muted p-0 border-0 fw-medium" style={{ fontSize: '14px' }}>Clear All</button>
                </div>
              </div>

            </div>

            {/* ==================== RIGHT PRODUCTS GRID & CONFIG BAR ==================== */}
            <div className="col-12 col-lg-8">
              
              {/* Top Toolbar Utilities Panel */}
              <div className="card border-0 p-3 rounded-3 mb-4 bg-white shadow-sm border">
                <div className="row g-3 align-items-center justify-content-between">
                  
                  {/* Search Input */}
                  <div className="col-12 col-md-5">
                    <div className="input-group border rounded-2 bg-light p-1">
                      <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                      <input type="text" className="form-control bg-transparent border-0 shadow-none ps-1 fw-medium" placeholder="Search products, categories, brands..." style={{ fontSize: '14px' }} />
                    </div>
                  </div>

                  {/* Grid / List Layout Toggles */}
                  <div className="col-auto d-flex align-items-center gap-3">
                    <span className="text-muted small fw-bold">VIEW</span>
                    <div className="btn-group border rounded-2" style={{ overflow: 'hidden' }}>
                      <button className="btn btn-success btn-sm px-2.5 py-1.5 border-0" style={{ backgroundColor: '#0AA586' }}><i className="bi bi-grid-3x3-gap-fill text-white"></i></button>
                      <button className="btn btn-light btn-sm px-2.5 py-1.5 border-0 bg-white"><i className="bi bi-list text-secondary"></i></button>
                    </div>
                    <button className="btn btn-success text-white fw-bold px-4 border-0" style={{ backgroundColor: '#0AA586', height: '38px', borderRadius: '5px', fontSize: '14px' }}>Search</button>
                  </div>

                </div>

                {/* Filters Option Dropdowns */}
                <div className="row g-2 mt-3 pt-2 border-top align-items-end">
                  <div className="col-6 col-sm-3">
                    <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Price Range</label>
                    <select className="form-select border shadow-none bg-light fw-semibold text-secondary" style={{ fontSize: '14px', padding: '8px' }}>
                      <option>All Prices</option>
                    </select>
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Sort By</label>
                    <select className="form-select border shadow-none bg-light fw-semibold text-secondary" style={{ fontSize: '14px', padding: '8px' }}>
                      <option>Featured</option>
                    </select>
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Items Per Page</label>
                    <select className="form-select border shadow-none bg-light fw-semibold text-secondary" style={{ fontSize: '14px', padding: '8px' }}>
                      <option>12 items</option>
                    </select>
                  </div>
                  <div className="col-6 col-sm-3">
                    <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-1.5 text-secondary fw-semibold" style={{ fontSize: '14px', padding: '9px' }}>
                      <i className="bi bi-arrow-counterclockwise"></i> Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Badges */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 px-1">
                <div className="d-flex flex-wrap align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <span className="text-muted fw-bold">Active filters:</span>
                  <span className="badge border rounded-pill px-3 py-2 text-success font-normal d-flex align-items-center gap-2 fw-semibold" style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}>
                    Electronics <i className="bi bi-x cursor-pointer fs-6"></i>
                  </span>
                  <span className="badge border rounded-pill px-3 py-2 text-success font-normal d-flex align-items-center gap-2 fw-semibold" style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}>
                    $50 to $100 <i className="bi bi-x cursor-pointer fs-6"></i>
                  </span>
                </div>
                <span className="text-muted cursor-pointer hover-danger small fw-bold" style={{ fontSize: '14px' }}>Reset All</span>
              </div>

              {/* Products Cards Layout Matrix Grid */}
              <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5">
                {products.map((prod) => (
                  <div className="col" key={prod.id}>
                    <div className="card product-card-wrap h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                      
                      {/* Top Image Frame with Hover Action Overlay */}
                      <div className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '280px' }}>
                        {prod.tag && (
                          <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2" style={{ backgroundColor: prod.tagBg, color: prod.tagColor, fontSize: '11px' }}>
                            {prod.tag}
                          </span>
                        )}
                        <img src={prod.img} alt={prod.title} className="w-100 h-100 object-cover rounded-2" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                        
                        {/* HOVER INTERACTION OVERLAY ROW */}
                        <div className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1" style={{ backgroundColor: 'rgba(15, 44, 89, 0.2)' }}>
                          <button className="action-icon-btn border-0" title="Add to Wishlist">
                            <i className="bi bi-heart-fill"></i>
                          </button>
                          <button className="action-icon-btn border-0" title="Quick View">
                            <i className="bi bi-eye-fill"></i>
                          </button>
                        </div>
                      </div>

                      {/* Card Bottom Meta Content */}
                      <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                          <span className="text-muted fw-extrabold d-block mb-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>{prod.category}</span>
                          <h5 className="fw-bold mb-2 text-truncate" style={{ color: '#0F2C59', fontSize: '17px' }}>{prod.title}</h5>
                          
                          <div className="text-warning small d-flex align-items-center gap-1 mb-3" style={{ fontSize: '13px' }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i key={i} className={`bi bi-star-fill ${i < Math.floor(prod.rating) ? 'text-warning' : 'text-black-50 opacity-25'}`}></i>
                            ))}
                            <span className="text-muted ms-1 fw-medium">({prod.reviews} reviews)</span>
                          </div>
                        </div>

                        {/* Pricing and Add-to-Cart Row */}
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                          <div className="d-flex align-items-baseline gap-1.5">
                            <span className="fw-bold fs-4 text-dark">${prod.price.toFixed(2)}</span>
                            {prod.oldPrice && <span className="text-muted text-decoration-line-through small fw-medium">${prod.oldPrice.toFixed(2)}</span>}
                          </div>
                          <button className="btn text-white px-3 py-2 fw-bold border-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '13px' }}>
                            Add to Cart
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Interface Control Footer */}
              <div className="card border-0 p-3 rounded-3 bg-white shadow-sm border d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center gap-3">
                <span className="text-muted fw-medium style-text-results" style={{ fontSize: '14px' }}>Page <strong className="text-dark fw-bold">1</strong> of <strong className="text-dark fw-bold">10</strong> · Showing results</span>
                
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <nav aria-label="Product navigation page items">
                    <ul className="pagination pagination-sm mb-0 align-items-center gap-1">
                      <li className="page-item disabled"><span className="page-link border rounded-2 px-2.5 py-1.5"><i className="bi bi-arrow-left"></i></span></li>
                      <li className="page-item active"><span className="page-link border rounded-2 px-3 py-1.5 fw-bold" style={{ backgroundColor: '#0AA586', borderColor: '#0AA586' }}>1</span></li>
                      <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page2">2</a></li>
                      <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page3">3</a></li>
                      <li className="page-item disabled"><span className="px-1 text-muted fw-bold">...</span></li>
                      <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page9">9</a></li>
                      <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page10">10</a></li>
                      <li className="page-item"><a className="page-link border rounded-2 px-2.5 py-1.5 text-secondary" href="#page2"><i className="bi bi-arrow-right"></i></a></li>
                    </ul>
                  </nav>

                  <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '14px' }}>
                    <span className="text-muted fw-medium">Go to</span>
                    <input type="text" className="form-control text-center border shadow-none bg-transparent fw-bold" defaultValue="1" style={{ width: '42px', height: '34px', borderRadius: '5px' }} />
                    <button className="btn btn-sm btn-light border px-3 fw-bold" style={{ height: '34px' }}>Go</button>
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

export default Category;