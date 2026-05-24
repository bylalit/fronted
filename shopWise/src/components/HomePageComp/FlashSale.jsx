
const FlashSale = () => {
  // Flash sale products mapped to match your screenshot layout
  const saleProducts = [
    {
      id: 1,
      discount: "-45%",
      title: "Premium Wireless Headphones",
      rating: 5,
      reviews: "317",
      price: 98,
      oldPrice: 179,
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80" // Backpack placeholder
    },
    {
      id: 2,
      discount: "-50%",
      title: "Smart Fitness Tracker Pro",
      rating: 5,
      reviews: "478",
      price: 60,
      oldPrice: 120,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80" // Shoe placeholder
    },
    {
      id: 3,
      discount: "-35%",
      title: "Lightweight Travel Backpack",
      rating: 4,
      reviews: "189",
      price: 136,
      oldPrice: 210,
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop&q=80" // Chair placeholder
    },
    {
      id: 4,
      discount: "-55%",
      title: "Artisan Porcelain Collection",
      rating: 5,
      reviews: "245",
      price: 43,
      oldPrice: 95,
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80" // Heels placeholder
    }
  ];

  return (
    <section className="w-100 py-5" style={{ backgroundColor: '#0f1e36' }}>
      <div className="container py-4">
        
        {/* ================= 1. FLASH SALE BANNER TIMER BLOCK ================= */}
        <div className="p-4 p-md-5 rounded-3 mb-5 border border-secondary border-opacity-25" style={{ backgroundColor: '#1a2e4c' }}>
          <div className="row g-4 align-items-center justify-content-between">
            
            {/* Left Content Column */}
            <div className="col-12 col-xl-5">
              <span 
                className="badge px-3 py-2 fw-semibold mb-3 d-inline-flex align-items-center gap-1.5" 
                style={{ backgroundColor: 'rgba(10, 165, 134, 0.15)', color: '#0AA586', fontSize: '12px' }}
              >
                <i className="bi bi-lightning-charge-fill"></i> Flash Sale — Up to 60% Off
              </span>
              <h2 className="text-white fw-bold mb-3" style={{ fontSize: '32px' }}>
                Exclusive Offers Just for You
              </h2>
              <p className="mb-0 style-desc" style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', maxWidth: '440px' }}>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Don't miss these limited-time savings.
              </p>
            </div>

            {/* Middle Countdown Timer Column */}
            <div className="col-12 col-md-auto text-center text-md-start">
              <div className="text-uppercase text-white-50 fw-semibold mb-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                <i className="bi bi-hourglass-split me-1"></i> Ends In:
              </div>
              <div className="d-flex justify-content-center justify-content-md-start gap-2">
                {[
                  { value: "220", unit: "Days" },
                  { value: "14", unit: "Hours" },
                  { value: "5", unit: "Minutes" },
                  { value: "17", unit: "Seconds" }
                ].map((time, idx) => (
                  <div 
                    key={idx} 
                    className="rounded border border-secondary border-opacity-50 p-2 text-center d-flex flex-column justify-content-center" 
                    style={{ backgroundColor: 'rgba(15, 30, 54, 0.4)', minWidth: '65px', minHeight: '65px' }}
                  >
                    <span className="text-white fw-bold fs-4 lh-1">{time.value}</span>
                    <span className="text-white-50 text-uppercase mt-1" style={{ fontSize: '9px' }}>{time.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Buttons Column */}
            <div className="col-12 col-md-auto d-flex flex-column gap-2 text-center text-md-start">
              <button className="btn text-white px-4 py-2 fw-medium border-0 d-inline-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}>
                <span>Claim Offer</span> <i className="bi bi-arrow-right"></i>
              </button>
              <button className="btn transparent text-white px-4 py-2 fw-medium border border-secondary border-opacity-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '5px', fontSize: '14px' }}>
                View All Items
              </button>
            </div>

          </div>
        </div>

        {/* ================= 2. FOUR-COLUMN OFFERS GRID ================= */}
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
          {saleProducts.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 border border-secondary border-opacity-25 rounded-3 overflow-hidden p-3" style={{ backgroundColor: '#14253f' }}>
                
                {/* Image Section Frame */}
                <div className="position-relative p-3 rounded-2 d-flex align-items-center justify-content-center bg-white bg-opacity-5" style={{ height: '220px' }}>
                  <span 
                    className="position-absolute top-0 start-0 m-2 badge rounded-2 px-2 py-1 fw-bold" 
                    style={{ backgroundColor: '#0AA586', color: '#ffffff', fontSize: '11px' }}
                  >
                    {product.discount}
                  </span>
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="img-fluid object-contain" 
                    style={{ maxHeight: '150px' }} 
                  />
                </div>

                {/* Meta Description Area */}
                <div className="pt-3 pb-1 px-1">
                  {/* Stars Rating Row */}
                  <div className="text-warning small mb-1 d-flex gap-0.5 align-items-center" style={{ fontSize: '11px' }}>
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                    <span className="text-white-50 ms-1">({product.reviews})</span>
                  </div>

                  {/* Title */}
                  <h6 className="text-white fw-medium mb-3 text-truncate" style={{ fontSize: '14px' }}>
                    {product.title}
                  </h6>

                  {/* Pricing Fields */}
                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span className="text-decoration-line-through text-white-50 small" style={{ fontSize: '12px' }}>
                      ${product.oldPrice}
                    </span>
                    <span className="fw-bold fs-5 text-success" style={{ color: '#0AA586' }}>
                      ${product.price}
                    </span>
                  </div>

                  {/* Embedded Custom Add To Cart Row Button */}
                  <button 
                    className="btn w-100 text-success bg-white bg-opacity-5 border border-success border-opacity-25 py-2 fw-medium d-flex align-items-center justify-content-center gap-2"
                    style={{ color: '#0AA586', fontSize: '13px', borderRadius: '5px' }}
                  >
                    <i className="bi bi-bag-plus"></i> Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FlashSale;