
const Contact = () => {
  return (
    <section className="w-100 pb-5" style={{ minHeight: '100vh' }}>
        {/* =================  BREADCRUMB HEADER SECTION ================= */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
            <div className="container d-flex justify-content-between align-items-center px-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '24px' }}>Contact</h2>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0" style={{ fontSize: '14px' }}>
                <li className="breadcrumb-item">
                    <a href="#home" className="text-success text-decoration-none" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted" aria-current="page">Contact</li>
                </ol>
            </nav>
            </div>
        </div>
        <div className="container py-5">

            {/* ================= 1. TOP INFO CARDS ROW ================= */}
            <div className="row g-4 mb-5 row-cols-1 row-cols-md-3">
            
            {/* Card 1: Our Location */}
            <div className="col">
                <div className="card h-100 border-0 shadow-sm p-4 bg-white rounded-3">
                <div className="d-flex align-items-start gap-3">
                    <div className="rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', width: '50px', height: '50px' }}>
                    <i className="bi bi-geo-alt fs-4"></i>
                    </div>
                    <div>
                    <h5 className="fw-semibold mb-2 text-dark" style={{ fontSize: '16px' }}>Our Location</h5>
                    <p className="text-muted small mb-0 lh-base" style={{ maxWidth: '220px' }}>
                        3128 Maple Drive, Portland, OR 97201
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* Card 2: Email Us */}
            <div className="col">
                <div className="card h-100 border-0 shadow-sm p-4 bg-white rounded-3">
                <div className="d-flex align-items-start gap-3">
                    <div className="rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', width: '50px', height: '50px' }}>
                    <i className="bi bi-envelope fs-4"></i>
                    </div>
                    <div className="d-flex flex-column" style={{ fontSize: '14px' }}>
                    <h5 className="fw-semibold mb-2 text-dark" style={{ fontSize: '16px' }}>Email Us</h5>
                    <a href="mailto:reach@example.com" className="text-muted text-decoration-none mb-1 hover-success">reach@example.com</a>
                    <a href="mailto:help@example.com" className="text-muted text-decoration-none hover-success">help@example.com</a>
                    </div>
                </div>
                </div>
            </div>

            {/* Card 3: Office Hours */}
            <div className="col">
                <div className="card h-100 border-0 shadow-sm p-4 bg-white rounded-3">
                <div className="d-flex align-items-start gap-3">
                    <div className="rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E2F2EE', color: '#0AA586', width: '50px', height: '50px' }}>
                    <i className="bi bi-clock fs-4"></i>
                    </div>
                    <div>
                    <h5 className="fw-semibold mb-2 text-dark" style={{ fontSize: '16px' }}>Office Hours</h5>
                    <p className="text-muted small mb-1">Mon - Fri: 9 AM - 6 PM</p>
                    <p className="text-muted small mb-0">Sat: 10 AM - 2 PM</p>
                    </div>
                </div>
                </div>
            </div>

            </div>

            {/* ================= 2. FORM & MAP MAIN LAYOUT ROW ================= */}
            <div className="row g-4">
            
            {/* Left Side Column: Contact Form */}
            <div className="col-12 col-lg-7">
                <div className="card border-0 shadow-sm p-4 p-md-5 bg-white rounded-3 h-100">
                <h3 className="fw-bold mb-2" style={{ color: '#0F2C59' }}>Drop Us a Line</h3>
                <p className="text-muted small mb-4 lh-base">
                    Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row g-3 mb-3">
                    {/* Full Name */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-semibold small mb-2">Full Name</label>
                        <input 
                        type="text" 
                        className="form-control border shadow-none bg-transparent py-2.5 px-3" 
                        placeholder="Jane Doe" 
                        style={{ borderRadius: '6px', fontSize: '14px', borderColor: '#e2e8f0' }}
                        />
                    </div>
                    {/* Email Address */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-semibold small mb-2">Email Address</label>
                        <input 
                        type="email" 
                        className="form-control border shadow-none bg-transparent py-2.5 px-3" 
                        placeholder="jane@email.com" 
                        style={{ borderRadius: '6px', fontSize: '14px', borderColor: '#e2e8f0' }}
                        />
                    </div>
                    </div>

                    <div className="row g-3 mb-4">
                    {/* Phone */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-semibold small mb-2">Phone</label>
                        <input 
                        type="text" 
                        className="form-control border shadow-none bg-transparent py-2.5 px-3" 
                        placeholder="+1 (555) 234-5678" 
                        style={{ borderRadius: '6px', fontSize: '14px', borderColor: '#e2e8f0' }}
                        />
                    </div>
                    {/* Subject */}
                    <div className="col-12 col-sm-6">
                        <label className="form-label text-dark fw-semibold small mb-2">Subject</label>
                        <input 
                        type="text" 
                        className="form-control border shadow-none bg-transparent py-2.5 px-3" 
                        placeholder="What is this about?" 
                        style={{ borderRadius: '6px', fontSize: '14px', borderColor: '#e2e8f0' }}
                        />
                    </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="mb-4">
                    <label className="form-label text-dark fw-semibold small mb-2">Message</label>
                    <textarea 
                        className="form-control border shadow-none bg-transparent p-3" 
                        rows="5" 
                        placeholder="Share your thoughts or questions..." 
                        style={{ borderRadius: '6px', fontSize: '14px', borderColor: '#e2e8f0', resize: 'none' }}
                    ></textarea>
                    </div>

                    {/* Submit Action Button */}
                    <button 
                    type="submit" 
                    className="btn text-white px-4 py-2.5 fw-medium border-0" 
                    style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}
                    >
                    Send Message
                    </button>
                </form>
                </div>
            </div>

            {/* Right Side Column: Embedded Map & Connect Block */}
            <div className="col-12 col-lg-5 d-flex flex-column gap-4">
                
                {/* Google Map Wrapper frame */}
                <div className="card border-0 shadow-sm rounded-3 overflow-hidden flex-grow-1" style={{ minHeight: '280px' }}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d3022.617540212046!2d-73.98802832342247!3d40.74844443538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sin!4v1716546372000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: '280px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location Map"
                ></iframe>
                </div>

                {/* Social Media Connect Section */}
                <div className="card border-0 shadow-sm p-4 bg-white rounded-3">
                <h5 className="fw-semibold text-dark mb-2" style={{ fontSize: '16px' }}>Connect With Us</h5>
                <p className="text-muted small mb-4">
                    Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus.
                </p>
                
                {/* Profile Links Row */}
                <div className="d-flex gap-2">
                    {['twitter-x', 'facebook', 'linkedin', 'instagram'].map((platform, idx) => (
                    <a 
                        key={idx} 
                        href={`#${platform}`} 
                        className="btn border border-secondary border-opacity-25 bg-white text-secondary p-0 d-flex align-items-center justify-content-center rounded-2 transition-all social-btn"
                        style={{ width: '38px', height: '38px', fontSize: '14px', transition: 'all 0.2s' }}
                    >
                        <i className={`bi bi-${platform}`}></i>
                    </a>
                    ))}
                </div>
                </div>

            </div>

            </div>

        </div>
    </section>
  );
};

export default Contact;