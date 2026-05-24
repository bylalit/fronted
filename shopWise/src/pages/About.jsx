
const About = () => {

    // Array containing the exact testimonial reviews from your image
  const testimonials = [
    {
      id: 1,
      rating: 5,
      isHalfStar: false,
      text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum ante ipsum.",
      name: "Sophia Hartwell",
      role: "Brand Strategist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      rating: 5,
      isHalfStar: false,
      text: "Curabitur pretium tincidunt lacus nulla gravida orci a odio dignissim congue rutrum at lorem et iaculis amet consequat vestibulum nulla facilisi morbi tempus.",
      name: "Marcus Ellison",
      role: "VP of Engineering",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80",
      highlightBorder: true // Matches the subtle teal tint on card 2 and 5
    },
    {
      id: 3,
      rating: 4,
      isHalfStar: true,
      text: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor maecenas faucibus mollis interdum tempor.",
      name: "Leona Mitchell",
      role: "Operations Lead",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      rating: 5,
      isHalfStar: false,
      text: "Donec ullamcorper nulla non metus auctor fringilla integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
      name: "Julian Prescott",
      role: "Creative Director",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      rating: 4,
      isHalfStar: false,
      text: "Aenean lacinia bibendum nulla sed consectetur praesent commodo cursus magna vel scelerisque nisl consectetur et vivamus sagittis lacus augue.",
      name: "Clara Jennings",
      role: "Product Architect",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      highlightBorder: true
    },
    {
      id: 6,
      rating: 3,
      isHalfStar: false,
      text: "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh ut fermentum massa justo sit amet risus etiam porta.",
      name: "Owen Blackwood",
      role: "Platform Analyst",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    }
  ];
  return (
    <section className="w-100 bg-white" style={{ minHeight: '100vh' }}>
      
      {/* ================= 1. BREADCRUMB HEADER SECTION ================= */}
      <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container d-flex justify-content-between align-items-center px-5">
          <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '24px' }}>About</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ fontSize: '14px' }}>
              <li className="breadcrumb-item">
                <a href="#home" className="text-success text-decoration-none" style={{ color: '#0AA586' }}>Home</a>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">About</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ================= 2. MAIN STORY CONTENT SECTION ================= */}
      <div className="container py-5 my-3">
        <div className="row g-5 align-items-start">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="col-12 col-lg-5 pe-lg-5">
            <span 
              className="badge rounded-pill px-3 py-2 fw-semibold mb-3 d-inline-flex align-items-center gap-1.5" 
              style={{ backgroundColor: '#E2F2EE', color: '#0AA586', fontSize: '11px', letterSpacing: '0.5px' }}
            >
              <i className="bi bi-layers"></i> Explore Details
            </span>
            
            <h2 className="display-6 fw-bold mb-4" style={{ color: '#0F2C59', lineHeight: '1.25' }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            </h2>
            
            <p className="text-muted mb-4 lh-base" style={{ fontSize: '15px' }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.
            </p>
            
            <button className="btn text-white px-4 py-2 bold fw-medium border-0 d-inline-flex align-items-center gap-2" style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '14px' }}>
              <span>Find Out More</span> <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          {/* Right Column: Visual Video Placeholder & Secondary Paragraphs */}
          <div className="col-12 col-lg-7">
            {/* Image Container with Floating Play Button */}
            <div className="position-relative rounded-3 overflow-hidden mb-4 shadow-sm" style={{ height: '380px' }}>
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80" 
                alt="Modern commercial lounge area" 
                className="w-100 h-100 object-cover"
                style={{ objectFit: 'cover' }}
              />
              
              {/* Central Play Button Layer */}
              <div className="position-absolute top-50 start-50 translate-middle">
                <button 
                  className="btn text-white rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg transform-scale-hover"
                  style={{ 
                    backgroundColor: '#0AA586', 
                    width: '60px', 
                    height: '60px',
                    transition: 'transform 0.2s ease'
                  }}
                  aria-label="Play Video"
                >
                  <i className="bi bi-play-fill fs-3 ps-1"></i>
                </button>
              </div>
            </div>

            {/* Subtext Paragraph Multi-column Layout */}
            <div className="row g-4 text-muted mt-2" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <div className="col-12 col-sm-6">
                <p className="mb-0">
                  Corporis omnis consequatur quisquam ex consequuntur quo omnis eligendi amet eos ut officiis soluta.
                </p>
              </div>
              <div className="col-12 col-sm-6">
                <p className="mb-0">
                  Mollitia qui quidem dolores praesentium quasi ut et voluptates repudiandae sint molestiae quo eligendi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 3. TESTIMONIALS / REVIEWS GRID SECTION ================= */}
      <div className="bg-light py-5 border-top">
        <div className="container py-4">
          <div className="row g-4 row-cols-1 row-cols-md-2">
            {testimonials.map((item) => (
              <div className="col" key={item.id}>
                <div 
                  className="card h-100 p-4 border shadow-sm bg-white rounded-3"
                  style={{ borderColor: item.highlightBorder ? '#C6E7E1' : '#E2E8F0' }}
                >
                  {/* Star Ratings Row */}
                  <div className="text-warning mb-3 d-flex gap-0.5" style={{ fontSize: '14px' }}>
                    {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                    {item.isHalfStar && <i className="bi bi-star-half"></i>}
                  </div>

                  {/* Testimonial Core Text */}
                  <p className="text-secondary lh-base mb-4" style={{ fontSize: '14.5px' }}>
                    {item.text}
                  </p>

                  <hr className="text-muted opacity-25 my-3" />

                  {/* Profile Identification Meta Row */}
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="rounded-circle object-cover"
                      style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14.5px' }}>{item.name}</h6>
                      <small className="text-muted" style={{ fontSize: '12px' }}>{item.role}</small>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;