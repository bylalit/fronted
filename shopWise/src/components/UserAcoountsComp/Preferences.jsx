import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Preferences = () => {
  // Notification Toggle States
  const [notifications, setNotifications] = useState({
    order: true,
    deals: false,
    digest: true
  });
  
  // 🎯 Context se setGlobalLoading ko destructure kiya
  const { userProfile, getUser, setGlobalLoading } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
    }

    setGlobalLoading(true); 
    const url = "http://127.0.0.1:8000/api/user/me/";

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone
            })
        });

        if (response.ok) {
            toast.success("Profile updated successfully! ✨");
            await getUser(); 
        } else {
            toast.error("Failed to update profile. Please check the fields.");
        }
    } catch (error) {
        console.error("Profile update error:", error);
        toast.error("Server connection failed.");
    } finally {
        setGlobalLoading(false); 
    }
  };

  return (
    <div>
      <h3 className="fw-bold mb-4 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>Account Preferences</h3>

      {/* SECTION 1: PERSONAL DETAILS */}
      <div className="card p-4 border rounded-3 bg-white shadow-sm mb-4">
        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#0F2C59', fontSize: '17px' }}>
          <i className="bi bi-person-vcard text-success"></i> Personal Details
        </h5>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">First Name</label>
              <input 
                type="text" 
                className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" 
                defaultValue={userProfile?.first_name} 
                style={{ borderRadius: '6px', fontSize: '14px' }} 
                {...register("first_name")}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">Last Name</label>
              <input 
                type="text" 
                className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" 
                defaultValue={userProfile?.last_name} 
                style={{ borderRadius: '6px', fontSize: '14px' }} 
                {...register("last_name")}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">Email Address</label>
              <input 
                type="email" 
                className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" 
                defaultValue={userProfile?.email} 
                style={{ borderRadius: '6px', fontSize: '14px' }} 
                {...register("email")}    
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">Phone Number</label>
              <input 
                type="text" 
                className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" 
                defaultValue={userProfile?.phone} 
                style={{ borderRadius: '6px', fontSize: '14px' }} 
                {...register("phone")}
              />
            </div>
          </div>
          <div className="text-end">
            <button type="submit" className="btn text-white fw-bold px-4 py-2 mt-2" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: NOTIFICATION SETTINGS */}
      <div className="card p-4 border rounded-3 bg-white shadow-sm mb-4">
        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#0F2C59', fontSize: '17px' }}>
          <i className="bi bi-bell text-success"></i> Notification Settings
        </h5>
        
        <div className="d-flex flex-column gap-4">
          {/* Toggle 1 */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14.5px' }}>Order Notifications</h6>
              <p className="text-muted small mb-0">Stay updated on your order progress and shipping status.</p>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input shadow-none" type="checkbox" checked={notifications.order} onChange={() => setNotifications({...notifications, order: !notifications.order})} style={{ width: '42px', height: '21px', cursor: 'pointer' }} />
            </div>
          </div>
          
          {/* Toggle 2 */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14.5px' }}>Deals & Offers</h6>
              <p className="text-muted small mb-0">Get notified about special discounts, sales, and seasonal promotions.</p>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input shadow-none" type="checkbox" checked={notifications.deals} onChange={() => setNotifications({...notifications, deals: !notifications.deals})} style={{ width: '42px', height: '21px', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Toggle 3 */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14.5px' }}>Weekly Digest</h6>
              <p className="text-muted small mb-0">Receive a curated weekly email summary of trending items.</p>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input shadow-none" type="checkbox" checked={notifications.digest} onChange={() => setNotifications({...notifications, digest: !notifications.digest})} style={{ width: '42px', height: '21px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SECURITY */}
      <div className="card p-4 border rounded-3 bg-white shadow-sm mb-4">
        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#0F2C59', fontSize: '17px' }}>
          <i className="bi bi-shield-lock text-success"></i> Security
        </h5>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary mb-1.5">Current Password</label>
            {/* 🎯 FIXED: Removed typo dclassName to className */}
            <input type="password" className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" placeholder="••••••••" style={{ borderRadius: '6px', fontSize: '14px' }} />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">New Password</label>
              <input type="password" className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" placeholder="Min. 8 characters" style={{ borderRadius: '6px', fontSize: '14px' }} />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-bold text-secondary mb-1.5">Confirm Password</label>
              <input type="password" className="form-control bg-light bg-opacity-25 shadow-none border py-2 px-3" placeholder="Re-enter password" style={{ borderRadius: '6px', fontSize: '14px' }} />
            </div>
          </div>
          <div className="text-end mt-4">
            <button className="btn text-white fw-bold px-4 py-2" style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '14px' }}>
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 4: DANGER ZONE */}
      <div className="card p-4 border rounded-3 bg-white shadow-sm" style={{ borderLeft: '5px solid #ef4444' }}>
        <div className="d-flex align-items-start gap-3">
          <div className="text-danger fs-4">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div className="flex-grow-1">
            <h5 className="fw-bold mb-1 text-danger" style={{ fontSize: '17px' }}>Danger Zone</h5>
            <p className="text-muted small mb-3">Permanently remove your account and all associated data. This action cannot be reversed.</p>
            <button className="btn btn-outline-danger fw-bold px-4 py-2" style={{ borderRadius: '6px', fontSize: '13px' }}>
              Delete My Account
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Preferences;