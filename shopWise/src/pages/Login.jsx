import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Login = () => {
  
    const { setGlobalLoading } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const { getUser } = useContext(AuthContext);

    const url = "http://127.0.0.1:8000/api/login/";
    const onSubmit = async(data) => {
        setGlobalLoading(true);
      
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });

        if (!response.ok) {
            // Agar password galat hoga toh Django 401 error dega
            if (response.status === 401) {
                toast.error('Invalid Email or Password');
            } else {
                toast.error('Something went wrong!');
            }
            return;
        }

        const result = await response.json();
        // console.log(result);

        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);

        await getUser();

        toast.success('Login Successful!');
        setGlobalLoading(false);
        navigate('/');
    }


  return (
    <>
      <section className="w-100 pb-3" style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{backgroundColor: '#F8FAFC'}}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Login</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted" aria-current="page">Login</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ================= 2. SIGN IN CORE INTERFACE ================= */}
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-6">
              <div className="card p-4 p-md-5 border rounded-3 bg-white shadow-sm">
                
                {/* Header Title Accent */}
                <div className="text-center mb-4">
                  <span className="badge rounded-pill px-3 py-2 fw-bold mb-3" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '12px' }}>
                    Welcome Back
                  </span>
                  <h1 className="fw-bold text-dark mb-2" style={{ color: '#0F2C59', fontSize: '32px' }}>Sign In to ShopWise</h1>
                  <p className="text-muted small">Access your personalized dashboard, orders, and wishlist tracking.</p>
                </div>

                {/* Third-Party Social OAuth Integrations */}
                <div className="row g-2 mb-4">
                  <div className="col-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '13px', borderRadius: '6px' }}>
                      <i className="bi bi-google text-danger"></i> Google
                    </button>
                  </div>
                  <div className="col-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '13px', borderRadius: '6px' }}>
                      <i className="bi bi-facebook text-primary"></i> Facebook
                    </button>
                  </div>
                  <div className="col-4">
                    <button type="button" className="btn btn-light bg-white border w-100 py-2 fw-semibold text-secondary d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '13px', borderRadius: '6px' }}>
                      <i className="bi bi-apple text-dark"></i> Apple
                    </button>
                  </div>
                </div>

                {/* Split Mid Separator */}
                <div className="position-relative text-center my-4">
                  <hr className="text-muted opacity-25" />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-uppercase text-muted fw-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    Or Login With Email
                  </span>
                </div>

                {/* Login Credentials Inputs */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold small mb-1.5" style={{ fontSize: '14px' }}>Email Address</label>
                    <input 
                        type="email" 
                        className="form-control shadow-none py-2.5 px-3" 
                        placeholder="you@example.com" 
                        style={{ borderRadius: '6px', fontSize: '14px' }} 
                        {...register("email", {required: "Email is required!"})}
                        required 
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1.5">
                      <label className="form-label text-dark fw-bold small mb-0" style={{ fontSize: '14px' }}>Password</label>
                      {/* <a href="#forgot" className="text-success text-decoration-none small fw-bold" style={{ color: '#0AA586', fontSize: '13px' }}>Forgot password?</a> */}
                    </div>
                    <input 
                        type="password" 
                        className="form-control shadow-none py-2.5 px-3" 
                        placeholder="Enter your password" 
                        style={{ borderRadius: '6px', fontSize: '14px' }} 
                        {...register("password", {required: "Password is required!"})}
                        required 
                    />
                  </div>

                  {/* Remember Me Option */}
                  <div className="mb-4 ps-0.5">
                    <label className="d-flex align-items-center gap-2 small cursor-pointer text-muted fw-medium">
                      <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} />
                      <span>Keep me logged in on this device</span>
                    </label>
                  </div>

                  {/* Submission CTA Trigger */}
                  <button 
                    type="submit" 
                    className="btn w-100 text-white fw-bold py-2.5 border-0 shadow-sm mb-4" 
                    style={{ backgroundColor: '#0AA586', borderRadius: '6px', fontSize: '15px' }}
                >
                    Sign In
                  </button>

                  <div className="text-center small text-muted fw-medium">
                    Don't have an account? <Link to="/register" className="text-success text-decoration-none fw-bold" style={{ color: '#0AA586' }}>Create account</Link>
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

export default Login;