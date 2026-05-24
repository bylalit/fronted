import { useState } from 'react';

const Payments = () => {
  // Saved Credit/Debit Cards State Array Template mapping
  const [cards, setCards] = useState([
    {
      id: 1,
      number: "•••• •••• •••• 4589",
      expires: "09/2026",
      type: "Visa",
      isDefault: true
    },
    {
      id: 2,
      number: "•••• •••• •••• 7821",
      expires: "05/2025",
      type: "Mastercard",
      isDefault: false
    }
  ]);

  // Set Default Card Trigger Action Handler
  const handleSetDefault = (id) => {
    setCards(prevCards =>
      prevCards.map(card => ({
        ...card,
        isDefault: card.id === id
      }))
    );
  };

  // Remove Card Handler
  const handleRemoveCard = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <div>
      {/* Upper Actions Toolbar Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>Payment Methods</h3>
        <button className="btn text-white fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
          <i className="bi bi-plus-lg"></i> Add Card
        </button>
      </div>

      {/* Grid Layout Cards Array Panels Row */}
      <div className="row g-4 row-cols-1 row-cols-md-2">
        {cards.map((card) => (
          <div className="col" key={card.id}>
            <div 
              className="card h-100 p-4 border rounded-3 bg-white transition-all position-relative"
              style={{ 
                borderColor: card.isDefault ? '#0AA586' : '#E2E8F0',
                boxShadow: card.isDefault ? '0 4px 12px rgba(10, 165, 134, 0.08)' : '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              
              {/* Upper Brand Labels Badges Row */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="fs-3 text-secondary opacity-75">
                  <i className="bi bi-credit-card-2-front-fill" style={{ color: card.isDefault ? '#0AA586' : 'inherit' }}></i>
                </div>
                <div className="d-flex gap-1.5 align-items-center">
                  {card.isDefault && (
                    <span className="badge rounded-pill px-2.5 py-1 fw-bold text-success" style={{ backgroundColor: '#E2F2EE', fontSize: '11px' }}>
                      Default
                    </span>
                  )}
                  <span className="badge rounded-2 px-2.5 py-1 fw-medium text-secondary bg-light border text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.3px' }}>
                    {card.type}
                  </span>
                </div>
              </div>

              {/* Central Card Number Assets Layer */}
              <div className="mb-4">
                <h4 className="fw-semibold text-secondary mb-2" style={{ letterSpacing: '2px', fontSize: '20px', wordSpacing: '4px' }}>
                  {card.number}
                </h4>
                <div className="text-muted small fw-medium" style={{ fontSize: '13px' }}>
                  Expires {card.expires}
                </div>
              </div>

              {/* Bottom Interactive Dashboard Routes Anchor Buttons */}
              <div className="d-flex gap-3 align-items-center mt-auto border-top pt-3 small" style={{ fontSize: '13.5px' }}>
                <button type="button" className="btn p-0 border-0 text-muted hover-success d-inline-flex align-items-center gap-1.5 fw-semibold">
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => handleRemoveCard(card.id)}
                  className="btn p-0 border-0 text-muted hover-danger d-inline-flex align-items-center gap-1.5 fw-semibold"
                >
                  <i className="bi bi-trash"></i> Remove
                </button>
                
                {!card.isDefault && (
                  <button 
                    type="button" 
                    onClick={() => handleSetDefault(card.id)}
                    className="btn p-0 border-0 text-success ms-auto fw-bold d-inline-flex align-items-center gap-1"
                    style={{ color: '#0AA586' }}
                  >
                    Set Default
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;