import  { useState } from 'react';

const Feedback = () => {
  // Feedback Reviews Data Array Template mapping precisely from the asset image
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      title: "Vestibulum ante ipsum primis",
      rating: 5,
      date: "Mar 8, 2025",
      text: "Cras justo odio, dapibus ut facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo.",
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&auto=format&fit=crop&q=80" // Tote bag placeholder
    },
    {
      id: 2,
      title: "Fusce dapibus tellus ac cursus",
      rating: 4,
      date: "Mar 1, 2025",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam pellentesque ornare.",
      img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&auto=format&fit=crop&q=80" // Chair placeholder
    }
  ]);

  // Remove Feedback Card Handler
  const handleDeleteFeedback = (id) => {
    setFeedbackList(prevList => prevList.filter(item => item.id !== id));
  };

  return (
    <div>
      {/* Upper Actions Toolbar Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>My Feedback</h3>
        <button className="btn bg-white border px-3 py-2 text-secondary fw-semibold small d-flex align-items-center gap-1.5" style={{ fontSize: '13px', borderRadius: '6px' }}>
          <i className="bi bi-sort-down"></i> Sort: Newest
        </button>
      </div>

      {/* Vertical List Stack Layout Container */}
      <div className="d-flex flex-column gap-4">
        {feedbackList.map((item) => (
          <div key={item.id} className="card p-4 border rounded-3 bg-white shadow-sm position-relative">
            <div className="row g-3">
              
              {/* Product Thumbnail Frame Box */}
              <div className="col-12 col-sm-auto text-center">
                <div className="border rounded-2 p-2 bg-light d-flex align-items-center justify-content-center mx-auto" style={{ width: '75px', height: '75px' }}>
                  <img src={item.img} alt="Product view" className="img-fluid object-contain" style={{ maxHeight: '60px', mixBlendMode: 'multiply' }} />
                </div>
              </div>

              {/* Central Review Context Description Area */}
              <div className="col-12 col-sm flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-1 mb-1">
                  <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '15.5px' }}>{item.title}</h6>
                  <span className="text-muted small fw-medium">{item.date}</span>
                </div>

                {/* Stars Generation Logic Panel */}
                <div className="text-warning small d-flex gap-0.5 mb-2.5" style={{ fontSize: '13px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`bi bi-star-fill ${i < item.rating ? 'text-warning' : 'text-black-50 opacity-25'}`}></i>
                  ))}
                  <span className="text-muted ms-1">({item.rating.toFixed(1)})</span>
                </div>

                {/* Main Body Copy Paragraph */}
                <p className="text-secondary lh-base mb-3" style={{ fontSize: '14px' }}>
                  {item.text}
                </p>

                {/* Interactive Tool Actions Lower Layer */}
                <div className="d-flex gap-3 align-items-center small" style={{ fontSize: '13.5px' }}>
                  <button type="button" className="btn p-0 border-0 text-muted hover-success d-inline-flex align-items-center gap-1.5 fw-semibold">
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDeleteFeedback(item.id)}
                    className="btn p-0 border-0 text-muted hover-danger d-inline-flex align-items-center gap-1.5 fw-semibold"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

        {feedbackList.length === 0 && (
          <div className="card p-5 text-center text-muted bg-white border shadow-sm rounded-3">
            <i className="bi bi-chat-left-dots fs-1 opacity-25 mb-2"></i>
            <p className="mb-0 fw-medium">No feedback submissions found matching your history records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;