import  { useState } from 'react';

const BestSellers = () => {
  const [activeTab, setActiveTab] = useState('trending');

  // Top Grid Products Data
  const bestSellersData = [
    {
      id: 1,
      badge: "Limited Edition",
      badgeBg: "#E2F2EE",
      badgeColor: "#0AA586",
      tag: "PREMIUM COLLECTION",
      rating: "4.2",
      reviews: "24",
      title: "Donec sollicitudin molestie malesuada viverra",
      colors: ["#4F46E5", "#0EA5E9", "#EC4899"],
      price: "$149.00",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      badge: "25% Off",
      badgeBg: "#FEE2E2",
      badgeColor: "#EF4444",
      tag: "BEST SELLER",
      rating: "4.7",
      reviews: "58",
      title: "Pellentesque in ipsum lacinia orci rutrum",
      colors: ["#1E293B", "#F59E0B", "#A855F7"],
      price: "$165.00",
      oldPrice: "$220.00",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80",
      showActionIcons: true
    },
    {
      id: 3,
      badge: "",
      tag: "NEW ARRIVAL",
      rating: "3.8",
      reviews: "12",
      title: "Quisque velit nisi pretium ut lacinia",
      colors: ["#EF4444", "#0EA5E9", "#22C55E"],
      price: "$89.00",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80" // Running shoe placeholder
    },
    {
      id: 4,
      badge: "Trending",
      badgeBg: "#FEF3C7",
      badgeColor: "#D97706",
      tag: "EDITOR'S PICK",
      rating: "4.9",
      reviews: "71",
      title: "Sed porttitor lectus nibh vivamus magna",
      colors: ["#64748B", "#6366F1", "#F97316"],
      price: "$199.00",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop&q=80"
    }
  ];

  // Tabbed Section Products Data
  const tabbedProductsData = [
    {
      id: 5,
      badge: "New",
      badgeBg: "#0AA586",
      badgeColor: "#ffffff",
      rating: "4.5",
      reviews: "31",
      title: "Handcrafted Tote",
      price: "$92.00",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      badge: "",
      rating: "5.0",
      reviews: "53",
      title: "Sapphire Stud Set",
      price: "$44.50",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 7,
      badge: "",
      rating: "4.0",
      reviews: "22",
      title: "Cotton Weave Top",
      price: "$49.00",
      oldPrice: null,
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 8,
      badge: "-15%",
      badgeBg: "#EF4444",
      badgeColor: "#ffffff",
      rating: "4.7",
      reviews: "45",
      title: "Woven Crossbody Pouch",
      price: "$68.00",
      oldPrice: "$80.00",
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="w-100 py-5 bg-white">
      
      {/* ================= SECTION 1: TOP BEST SELLERS GRID ================= */}
      <div className="container mb-5 pb-4">
        {/* Header Title */}
        <div className="text-center mb-5">
          <h2 className="fw-bold position-relative d-inline-block pb-2" style={{ color: '#0F2C59' }}>
            Best Sellers
            <span className="position-absolute bottom-0 start-50 translate-middle-x bg-success rounded" style={{ width: '40px', height: '3px', backgroundColor: '#0AA586' }}></span>
          </h2>
          <p className="text-muted small mt-3">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        {/* Best Sellers Grid */}
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
          {bestSellersData.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100 border rounded-3 overflow-hidden bg-white shadow-sm position-relative">
                
                {/* Image Wrap Frame */}
                <div className="position-relative p-4 bg-light d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                  {prod.badge && (
                    <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-medium" style={{ backgroundColor: prod.badgeBg, color: prod.badgeColor, fontSize: '11px' }}>
                      {prod.badge}
                    </span>
                  )}
                  
                  {/* Floating Action Buttons (Like on Item 2) */}
                  {prod.showActionIcons && (
                    <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
                      <button className="btn bg-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center border" style={{ width: '32px', height: '32px' }}><i className="bi bi-heart text-secondary" style={{ fontSize: '13px' }}></i></button>
                      <button className="btn bg-white rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center border" style={{ width: '32px', height: '32px' }}><i className="bi bi-eye text-secondary" style={{ fontSize: '13px' }}></i></button>
                    </div>
                  )}

                  <img src={prod.img} alt={prod.title} className="img-fluid object-contain" style={{ maxHeight: '160px', mixBlendMode: 'multiply' }} />
                </div>

                {/* Card Meta Content */}
                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-muted fw-semibold" style={{ fontSize: '11px', letterSpacing: '0.3px' }}>{prod.tag}</span>
                      <span className="text-warning small d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                        <i className="bi bi-star-fill"></i> <span className="text-dark fw-medium">{prod.rating}</span> <span className="text-muted">({prod.reviews})</span>
                      </span>
                    </div>
                    <h6 className="fw-semibold mb-3 lh-base text-dark text-truncate-2" style={{ fontSize: '14px', height: '40px', overflow: 'hidden' }}>
                      {prod.title}
                    </h6>
                  </div>

                  {/* Color Variant Circles */}
                  <div className="d-flex gap-1.5 mb-3">
                    {prod.colors.map((color, i) => (
                      <span key={i} className="rounded-circle border" style={{ width: '14px', height: '14px', backgroundColor: color, cursor: 'pointer', border: '2px solid white', outline: '1px solid #cbd5e1' }}></span>
                    ))}
                  </div>

                  {/* Pricing and Cart Actions Footer */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="fw-bold fs-5" style={{ color: prod.oldPrice ? '#0AA586' : '#0F2C59' }}>{prod.price}</span>
                      {prod.oldPrice && <span className="text-muted text-decoration-line-through x-small" style={{ fontSize: '12px' }}>{prod.oldPrice}</span>}
                    </div>
                    <button className="btn text-white p-0 d-flex align-items-center justify-content-center rounded-2" style={{ backgroundColor: '#0AA586', width: '35px', height: '35px' }}>
                      <i className="bi bi-bag-plus fs-5"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ================= SECTION 2: BOTTOM TABBED FILTER PRODUCT GRID ================= */}
      <div className="container mt-4 pt-2">
        {/* Tab Headers */}
        <div className="d-flex gap-4 border-bottom mb-4 pb-2 text-muted fw-medium" style={{ fontSize: '15px' }}>
          <span 
            onClick={() => setActiveTab('trending')}
            className={`pb-2 cursor-pointer d-flex align-items-center gap-1.5 ${activeTab === 'trending' ? 'text-success border-bottom border-2 border-success fw-semibold' : ''}`}
            style={{ color: activeTab === 'trending' ? '#0AA586' : 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-fire"></i> Trending Now
          </span>
          <span 
            onClick={() => setActiveTab('rated')}
            className={`pb-2 cursor-pointer d-flex align-items-center gap-1.5 ${activeTab === 'rated' ? 'text-success border-bottom border-2 border-success fw-semibold' : ''}`}
            style={{ color: activeTab === 'rated' ? '#0AA586' : 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-lightbulb"></i> Highest Rated
          </span>
          <span 
            onClick={() => setActiveTab('picked')}
            className={`pb-2 cursor-pointer d-flex align-items-center gap-1.5 ${activeTab === 'picked' ? 'text-success border-bottom border-2 border-success fw-semibold' : ''}`}
            style={{ color: activeTab === 'picked' ? '#0AA586' : 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-bookmark-check"></i> Hand-Picked
          </span>
        </div>

        {/* Tab Filter Grid */}
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
          {tabbedProductsData.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100 border-0 bg-transparent position-relative">
                
                {/* Image Section */}
                <div className="position-relative p-4 rounded-3 bg-light d-flex align-items-center justify-content-center mb-3" style={{ height: '250px' }}>
                  {prod.badge && (
                    <span className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1" style={{ backgroundColor: prod.badgeBg, color: prod.badgeColor, fontSize: '11px' }}>
                      {prod.badge}
                    </span>
                  )}
                  <img src={prod.img} alt={prod.title} className="img-fluid object-contain" style={{ maxHeight: '170px', mixBlendMode: 'multiply' }} />
                </div>

                {/* Text Content Metadata Section */}
                <div className="px-1">
                  <div className="text-warning small d-flex align-items-center gap-1 mb-1" style={{ fontSize: '12px' }}>
                    <i className="bi bi-star-fill"></i> <span className="text-dark fw-medium">{prod.rating}</span> <span className="text-muted">({prod.reviews})</span>
                  </div>
                  <h6 className="fw-semibold text-dark mb-2 text-truncate" style={{ fontSize: '15px', color: '#0F2C59' }}>
                    {prod.title}
                  </h6>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="fw-bold fs-6 text-dark">{prod.price}</span>
                    {prod.oldPrice && <span className="text-muted text-decoration-line-through small" style={{ fontSize: '12px' }}>{prod.oldPrice}</span>}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default BestSellers;