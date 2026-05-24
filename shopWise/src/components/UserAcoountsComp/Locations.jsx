import { useState } from 'react';

const Locations = () => {
  // Address parameters data mapping directly from your user screen mockup asset
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      isPrimary: true,
      icon: "bi-house-heart",
      street: "1428 Elm Street",
      suite: "Apt 4B",
      cityStateZip: "Denver, CO 80202",
      country: "United States",
      recipient: "Elena Mitchell",
      phone: "+1 (555) 472-8391"
    },
    {
      id: 2,
      label: "Workplace",
      isPrimary: false,
      icon: "bi-building",
      street: "350 Fifth Avenue",
      suite: "Suite 1500",
      cityStateZip: "Portland, OR 97201",
      country: "United States",
      recipient: "Elena Mitchell",
      phone: "+1 (555) 639-2105"
    }
  ]);

  // Set Primary Address Trigger Handler
  const handleSetPrimary = (id) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isPrimary: addr.id === id
      }))
    );
  };

  // Remove Address Item Handler
  const handleRemoveAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div>
      {/* Top Action Header Bar Grid Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>Saved Locations</h3>
        <button className="btn text-white fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
          <i className="bi bi-plus-lg"></i> New Address
        </button>
      </div>

      {/* Grid Layout Cards Stack Row */}
      <div className="row g-4 row-cols-1 row-cols-md-2">
        {addresses.map((addr) => (
          <div className="col" key={addr.id}>
            <div 
              className="card h-100 p-4 border rounded-3 bg-white transition-all position-relative"
              style={{ 
                borderColor: addr.isPrimary ? '#0AA586' : '#E2E8F0',
                boxShadow: addr.isPrimary ? '0 4px 12px rgba(10, 165, 134, 0.08)' : '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              
              {/* Card Meta Label Badge Strip Layer */}
              <div className="d-flex justify-content-between align-items-start mb-3.5">
                <div className="d-flex align-items-center gap-2.5">
                  <div className="rounded-3 d-flex align-items-center justify-content-center border" style={{ width: '40px', height: '40px', backgroundColor: '#F8FAFC', color: addr.isPrimary ? '#0AA586' : '#64748b' }}>
                    <i className={`bi ${addr.icon} fs-5`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '15.5px' }}>{addr.label}</h6>
                    {addr.isPrimary && (
                      <span className="text-success text-uppercase fw-extrabold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Primary</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Content Address Fields Summary Text Block */}
              <div className="text-secondary lh-base mb-4 small" style={{ fontSize: '14.5px' }}>
                <div className="text-dark fw-medium">{addr.street}</div>
                <div>{addr.suite}</div>
                <div>{addr.cityStateZip}</div>
                <div>{addr.country}</div>
                
                {/* Secondary Meta Information */}
                <div className="mt-3 pt-2 border-top text-muted style-meta-sub" style={{ fontSize: '13px' }}>
                  <div className="d-flex align-items-center gap-2 mb-1"><i className="bi bi-person text-secondary"></i> {addr.recipient}</div>
                  <div className="d-flex align-items-center gap-2"><i className="bi bi-telephone text-secondary"></i> {addr.phone}</div>
                </div>
              </div>

              {/* Tools Actions Lower Anchor Links Toolbar */}
              <div className="d-flex gap-3 align-items-center mt-auto border-top pt-3 small" style={{ fontSize: '13.5px' }}>
                <button type="button" className="btn p-0 border-0 text-muted hover-success d-inline-flex align-items-center gap-1.5 fw-semibold">
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => handleRemoveAddress(addr.id)}
                  className="btn p-0 border-0 text-muted hover-danger d-inline-flex align-items-center gap-1.5 fw-semibold"
                >
                  <i className="bi bi-trash"></i> Remove
                </button>

                {!addr.isPrimary && (
                  <button 
                    type="button" 
                    onClick={() => handleSetPrimary(addr.id)}
                    className="btn p-0 border-0 text-success ms-auto fw-bold d-inline-flex align-items-center gap-1"
                    style={{ color: '#0AA586' }}
                  >
                    Set Primary
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

export default Locations;