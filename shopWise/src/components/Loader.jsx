
const Loader = () => {
  return (
    <>
      <style>{`
        @keyframes custom-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.96); }
        }
        .ring-outer {
          width: 70px;
          height: 70px;
          border: 3px solid transparent;
          border-top-color: #0AA586;
          border-bottom-color: #0AA586;
          border-radius: 50%;
          animation: custom-spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }
        .ring-inner {
          position: absolute;
          width: 50px;
          height: 50px;
          border: 3px solid transparent;
          border-left-color: #0F2C59;
          border-right-color: #0F2C59;
          border-radius: 50%;
          animation: custom-spin 0.8s linear infinite reverse;
        }
        .premium-pulse-text {
          animation: custom-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* ==================== HIGH-END OVERLAY WRAPPER ==================== */}
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.88)', 
          backdropFilter: 'blur(6px)',
          zIndex: 9999, 
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        <div className="d-flex flex-column align-items-center position-relative">
          
          <div className="d-flex align-items-center justify-content-center mb-4 position-relative" style={{ width: '80px', height: '80px' }}>
            <div className="ring-outer"></div>
            <div className="ring-inner"></div>
            <div className="position-absolute rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: '#0AA586' }}></div>
          </div>

          <div className="text-center premium-pulse-text mt-2">
            <h4 className="fw-extrabold mb-1" style={{ color: '#0F2C59', letterSpacing: '1px', fontSize: '22px', fontFamily: "'Poppins', sans-serif" }}>
              SHOP<span style={{ color: '#0AA586' }}>WISE</span>
            </h4>
            <div className="d-flex align-items-center justify-content-center gap-1.5 mt-1 text-muted" style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <span className="fw-semibold">Please wait</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Loader;