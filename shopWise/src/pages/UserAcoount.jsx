import  { useContext, useState } from 'react';
import Favorites from '../components/UserAcoountsComp/Favorites';   
import Payments from '../components/UserAcoountsComp/Payments';     
import Feedback from '../components/UserAcoountsComp/Feedback';     
import Locations from '../components/UserAcoountsComp/Locations';   
import Preferences from '../components/UserAcoountsComp/Preferences';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Orders from '../components/UserAcoountsComp/Orders';
import { AuthContext } from '../context/AuthContext';

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('Orders'); 

  const { userProfile } = useContext(AuthContext);

  const menuItems = [
    { name: 'Orders', icon: 'bi-bag-check' },
    { name: 'Favorites', icon: 'bi-heart' },
    { name: 'Payments', icon: 'bi-credit-card-2-front' },
    { name: 'Feedback', icon: 'bi-chat-left-text' },
    { name: 'Locations', icon: 'bi-geo-alt' },
    { name: 'Preferences', icon: 'bi-sliders' }
  ];

  return (
    <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Poppins', sans-serif" }}>
      
      <div className="py-4 border-bottom bg-white text-center">
        <div className="container">
          <h1 className="fw-bold mb-2" style={{ color: '#0F2C59', fontSize: '32px' }}>Account</h1>
          <p className="text-muted small mb-0">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>
      </div>

      <div className="container mt-5 px-md-4">
        <div className="row g-4">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="col-12 col-lg-3">
            <div className="card p-4 border rounded-3 bg-white shadow-sm text-center">
              <div className="position-relative d-inline-block mx-auto mb-3">
                <img 
                  src={userProfile?.profile_image}
                  alt="Profile Avatar" 
                  className="rounded-circle border border-3"
                  style={{ width: '90px', height: '90px', objectFit: 'cover', borderColor: '#E2E8F0' }}
                />
                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle d-flex align-items-center justify-content-center text-white border border-2 border-white" style={{ width: '22px', height: '22px', fontSize: '12px' }}>
                  <i className="bi bi-check-lg"></i>
                </span>
              </div>
              
              <h5 className="fw-bold text-dark mb-4 " style={{ fontSize: '18px' }}>{userProfile?.first_name} {userProfile?.last_name}</h5>

              <div className="row g-0 border rounded-3 py-2 bg-light mb-4">
                <div className="col-4 border-end">
                  <strong className="text-dark d-block h5 mb-0 fw-bold">3</strong>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Orders</small>
                </div>
                <div className="col-4 border-end">
                  <strong className="text-dark d-block h5 mb-0 fw-bold">12</strong>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Saved</small>
                </div>
                <div className="col-4">
                  <strong className="text-dark d-block h5 mb-0 fw-bold">8</strong>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Reviews</small>
                </div>
              </div>

              <div className="d-flex flex-column gap-1 text-start">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(item.name)}
                    className="btn w-100 py-2 px-3 fw-semibold border-0 d-flex align-items-center gap-3 rounded-3"
                    style={{
                      fontSize: '14px',
                      backgroundColor: activeTab === item.name ? '#E2F2EE' : 'transparent',
                      color: activeTab === item.name ? '#0AA586' : '#64748b'
                    }}
                  >
                    <i className={`bi ${item.icon} fs-5`}></i>
                    <span>{item.name}</span>
                  </button>
                ))}
                <hr className="my-2 opacity-25" />
                <button className="btn w-100 py-2 px-3 fw-bold border-0 d-flex align-items-center gap-3 text-danger rounded-3" style={{ fontSize: '14px' }}>
                  <i className="bi bi-box-arrow-left fs-5"></i> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT WORKSPACE ================= */}
          <div className="col-12 col-lg-9">
            {activeTab === 'Orders' && <Orders />}
            {activeTab === 'Favorites' && <Favorites />}
            {activeTab === 'Payments' && <Payments />}
            {activeTab === 'Feedback' && <Feedback />}
            {activeTab === 'Locations' && <Locations />}
            {activeTab === 'Preferences' && <Preferences />}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AccountDashboard;