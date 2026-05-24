

const Favorites = () => {
  const favoriteItems = [
    {
      id: 1,
      title: "Vestibulum ante ipsum primis",
      rating: 4.5,
      price: 79.99,
      oldPrice: 99.99,
      discount: "-20%",
      status: "Available",
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Fusce dapibus tellus ac cursus",
      rating: 4.0,
      price: 149.99,
      oldPrice: null,
      discount: "",
      status: "Available",
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Maecenas faucibus mollis interdum",
      rating: 5.0,
      price: 199.99,
      oldPrice: null,
      discount: "",
      status: "Sold Out",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div>
      {/* Upper Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>Saved Favorites</h3>
        <button className="btn text-white fw-bold px-4 py-2 shadow-sm" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
          Move All to Cart
        </button>
      </div>

      {/* Grid Layout Matrix */}
      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
        {favoriteItems.map((item) => (
          <div className="col" key={item.id}>
            <div className="card h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column p-3">
              
              {/* Product Frame Area */}
              <div className="position-relative p-3 bg-light rounded-2 text-center d-flex align-items-center justify-content-center overflow-hidden mb-3" style={{ height: '220px' }}>
                {item.discount && (
                  <span className="position-absolute top-0 start-0 m-2 badge rounded-2 px-2 py-1 fw-bold text-white bg-danger" style={{ fontSize: '11px' }}>
                    {item.discount}
                  </span>
                )}
                {item.status === "Sold Out" && (
                  <span className="position-absolute top-0 start-0 m-2 badge rounded-2 px-2 py-1 fw-semibold text-secondary bg-white border" style={{ fontSize: '11px' }}>
                    Sold Out
                  </span>
                )}
                <img src={item.img} alt={item.title} className="img-fluid object-contain" style={{ maxHeight: '160px', mixBlendMode: 'multiply' }} />
              </div>

              {/* Text Description Details */}
              <div className="d-flex flex-column justify-content-between flex-grow-1">
                <div>
                  <h6 className="fw-bold mb-1 text-dark text-truncate-2" style={{ fontSize: '14.5px', height: '42px', overflow: 'hidden', lineHeight: '1.4' }}>{item.title}</h6>
                  <div className="text-warning small d-flex align-items-center gap-1 mb-3" style={{ fontSize: '12px' }}>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                    <span className="text-muted ms-1">({item.rating})</span>
                  </div>
                </div>

                {/* Price Label Details */}
                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <span className="fw-bold fs-5 text-dark">${item.price}</span>
                  {item.oldPrice && <span className="text-muted text-decoration-line-through small">${item.oldPrice}</span>}
                </div>

                {/* Action Trigger Buttons Footer */}
                <div className="d-flex gap-2 align-items-center mt-auto">
                  {item.status === "Sold Out" ? (
                    <button className="btn btn-light border bg-white text-secondary fw-semibold py-2 px-3 flex-grow-1" style={{ fontSize: '13px', borderRadius: '5px' }}>
                      Notify Me
                    </button>
                  ) : (
                    <button className="btn text-white fw-bold py-2 px-3 flex-grow-1 border-0" style={{ backgroundColor: '#0AA586', fontSize: '13px', borderRadius: '5px' }}>
                      Add to Cart
                    </button>
                  )}
                  <button className="btn btn-light border rounded-2 p-0 d-flex align-items-center justify-content-center text-danger bg-white" style={{ width: '38px', height: '38px', borderColor: '#FFCDD2' }} title="Delete">
                    <i className="bi bi-x-lg fs-6"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;