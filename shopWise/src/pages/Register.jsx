import { Link, useNavigate } from "react-router-dom";
import {  useForm  } from 'react-hook-form'
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { setGlobalLoading } = useContext(AuthContext);

    const url = "http://127.0.0.1:8000/api/user/";

    const onSubmit = async (data)=> {
        setGlobalLoading(true);
        // console.log(data);
        if(data.password !== data.comform_password){
            toast.error("Password and Comfirm Password do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('password', data.password);
        formData.append('phone', data.phone);
        
        if(data.profile_image && data.profile_image[0]){
            formData.append('profile_image', data.profile_image[0]);
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if(response.ok){
            const result = await response.json();
            toast.success("Register Succfully!")
            navigate('/login');
        }else{
            const errorData = await response.json();
            // console.log("Server Error:", errorData);
            
            if(errorData.email){
                toast.error("This email is already register!")
            }
            else if(errorData.phone){
                toast.error("This number is already register!")
            }else{
                toast.error("Register failed. Pleaase check your details.");
            }
        }
        setGlobalLoading(false);
    }

  return (
    <>
      <section className="w-100 pb-3" style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{backgroundColor: '#F8FAFC'}}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Register</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Register</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. SIGN UP CORE INPUT INTERFACE ================= */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-7">
              <div className="card p-4 p-md-5 border rounded-3 bg-white shadow-sm">
                
                {/* Header Title Accent */}
                <div className="text-center mb-4">
                  <span className="badge rounded-pill px-3 py-2 fw-bold mb-3" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                    Create Your Account
                  </span>
                  <h1 className="fw-bold text-dark mb-2" style={{ color: '#0F2C59', fontSize: '32px' }}>Start Shopping Smarter</h1>
                  <p className="text-muted small">Unlock personalized deals, faster checkout, and member-only perks.</p>
                </div>

                {/* Perquisite Benefit Micro Grid Row */}
                <div className="d-flex flex-wrap gap-2 justify-content-center mb-4 text-muted" style={{ fontSize: '13px' }}>
                  <div className="d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded bg-light border"><i className="bi bi-truck text-success"></i> Complimentary first shipment</div>
                  <div className="d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded bg-light border"><i className="bi bi-percent text-success"></i> Members-only savings</div>
                  <div className="d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded bg-light border"><i className="bi bi-clock-history text-success"></i> Priority access to drops</div>
                  <div className="d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded bg-light border"><i className="bi bi-arrow-counterclockwise text-success"></i> Effortless returns</div>
                </div>

                {/* Third-Party Social OAuth Integrations */}
                <div className="row g-2 mb-4">
                  <div className="col-12 col-sm-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', borderRadius: '6px' }}>
                      <i className="bi bi-google text-danger"></i> Google
                    </button>
                  </div>
                  <div className="col-12 col-sm-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', borderRadius: '6px' }}>
                      <i className="bi bi-facebook text-primary"></i> Facebook
                    </button>
                  </div>
                  <div className="col-12 col-sm-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', borderRadius: '6px' }}>
                      <i className="bi bi-apple text-dark"></i> Apple
                    </button>
                  </div>
                </div>

                {/* Split Mid Separator */}
                <div className="position-relative text-center my-4">
                  <hr className="text-muted opacity-25" />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-uppercase text-muted fw-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    Or Continue With Email
                  </span>
                </div>

                {/* Intake Form Fields */}
                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row g-3 mb-2">
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>First Name</label>
                        <input 
                            type="text" 
                            className="form-control shadow-none py-2.5 px-3" 
                            placeholder="First Name" 
                            style={{ borderRadius: '6px', fontSize: '14px' }} 
                            {...register("first_name")}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Last Name</label>
                        <input 
                            type="text" 
                            className="form-control shadow-none py-2.5 px-3" 
                            placeholder="Last Name" 
                            style={{ borderRadius: '6px', fontSize: '14px' }}
                            {...register("last_name")}
                        />
                    </div>
                </div>

                <div className="mb-3">
                        <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Email Address</label>
                        <input 
                            type="email" 
                            className="form-control shadow-none py-2.5 px-3" 
                            placeholder="you@example.com" 
                            style={{ borderRadius: '6px', fontSize: '14px' }} 
                            {...register("email")}
                        />
                </div>

                {/* 🆕 NEW SECTION: Phone Number and Profile Image */}
                <div className="row g-3 mb-3">
                    {/* Phone Number Input */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Phone Number</label>
                        <input 
                            type="tel" 
                            className="form-control shadow-none py-2.5 px-3" 
                            placeholder="e.g., +919876543210" 
                            style={{ borderRadius: '6px', fontSize: '14px' }} 
                            {...register("phone")}
                        />
                    </div>
                    
                    {/* Profile Image Input */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Profile Picture</label>
                        <input 
                            type="file" 
                            accept="image/*" // Sirf images allow karne ke liye
                            className="form-control shadow-none py-2 px-3" 
                            style={{ borderRadius: '6px', fontSize: '14px' }} 
                            {...register("profile_image")}
                        />
                    </div>
                </div>

                <div className="row g-3 mb-2">
                    <div className="col-12 col-sm-6">
                    <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Password</label>
                    <input 
                        type="password" 
                        className="form-control shadow-none py-2.5 px-3" 
                        placeholder="Min. 8 characters" 
                        style={{ borderRadius: '6px', fontSize: '14px' }} 
                        {...register("password")}
                    />
                    </div>
                    <div className="col-12 col-sm-6">
                    <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control shadow-none py-2.5 px-3" 
                        placeholder="Re-enter password" 
                        style={{ borderRadius: '6px', fontSize: '14px' }} 
                        {...register("comform_password")}
                        />
                    </div>
                </div>
                <small className="text-muted d-block mb-3" style={{ fontSize: '12px', marginTop: '-4px' }}>Must be at least 8 characters</small>


                {/* Operational Legal Checkboxes */}
                <div className="d-flex flex-column gap-2 mb-4 ps-0.5">
                    <label className="d-flex align-items-center gap-2 small cursor-pointer text-muted fw-medium">
                    <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} required />
                    <span>I agree to the <a href="#terms" className="text-success text-decoration-none fw-bold">Terms of Service</a> and <a href="#privacy" className="text-success text-decoration-none fw-bold">Privacy Policy</a></span>
                    </label>
                    <label className="d-flex align-items-center gap-2 small cursor-pointer text-muted fw-medium">
                    <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} />
                    Notify me about exclusive offers, new collections, and upcoming events
                    </label>
                </div>

                {/* Submission CTA Route Trigger */}
                <button 
                    type="submit" 
                    className="btn w-100 text-white fw-bold py-2.5 border-0 shadow-sm mb-4" 
                    style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '15px' }}

                >
                    Create Account
                </button>

                <div className="text-center small text-muted fw-medium">
                    Already have an account? <Link to="/login" className="text-success text-decoration-none fw-bold" style={{ color: '#0AA586' }}>Sign in</Link>
                </div>
                </form>

              </div>
            </div>
          </div>
        </div>

    
      </section>
    </>
  );
};

export default Register;