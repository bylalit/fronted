import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <header className="w-100 font-sans shadow-sm">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-light border-bottom py-2 text-secondary" style={{ fontSize: '14px' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <div className="d-flex gap-4">
            <span className="cursor-pointer"><i className="bi bi-geo-alt me-1"></i> Find a Store</span>
            <span className="border-start ps-4 cursor-pointer"><i className="bi bi-headset me-1"></i> Support</span>
          </div>
          <div className="text-success fw-semibold">
            Free delivery on orders over $75
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Logo, Search, Icons) */}
      <div className="border-bottom">
            <div className="container py-3 px-4">
                <div className="row align-items-center justify-content-between container">
                
                {/* Logo */}
                <div className="col-auto d-flex align-items-center">
                    <Link to="/">
                      <div className="text-success fs-3 me-2">
                        <i className="bi bi-cart3"></i>
                      </div>
                      </Link>
                    <Link to="/" className="text-decoration-none">
                      <span className="fs-2 fw-bold text-dark" style={{ letterSpacing: '-0.5px' }}>
                      Shop<span style={{ color: '#0F2C59' }}>Wise</span>
                      </span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="col-10 col-md-6 col-lg-5">
                    <div className="input-group border rounded-2" style={{ overflow: 'hidden' }}>
                    <span className="input-group-text bg-white border-0 text-muted pe-1">
                        <i className="bi bi-search"></i>
                    </span>
                    <input 
                        type="text" 
                        className="form-control border-0 shadow-none ps-2" 
                        placeholder="Search for products, brands, and more..." 
                        aria-label="Search"
                    />
                    <button className="btn btn-success px-4 fw-medium border-0" style={{ backgroundColor: '#0aa586' }} type="button">
                        Search
                    </button>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="col-auto d-flex align-items-center gap-4 text-secondary fs-4">
                    <div className="position-relative cursor-pointer">
                    <i className="bi bi-person text-dark fs-5"></i>
                    </div>
                    
                    {/* Wishlist Icon with badge */}
                    <div className="position-relative cursor-pointer">
                    <i className="bi bi-heart text-dark fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: '10px', padding: '4px 6px', marginTop: '-2px' }}>
                        4
                    </span>
                    </div>

                    {/* Cart Icon with badge */}
                    <div className="position-relative cursor-pointer">
                    <i className="bi bi-bag text-dark fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: '10px', padding: '4px 6px', marginTop: '-2px' }}>
                        3
                    </span>
                    </div>
                </div>

                </div>
            </div>
      </div>
      

      {/* 3. NAVIGATION MENU BAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 px-5 container">
        <div className="container-fluid p-0">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav gap-3 align-items-center fw-medium" style={{ color: '#4A5568' }}>
              
              <li className="nav-item">
                <Link className="nav-link text-success active fw-semibold" to="/">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/category">Category</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/productDetails">Product Details</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
              </li>

              {/* Simple Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#dropdown" role="button" data-bs-toggle="dropdown">
                  Dropdown
                </a>
              </li>

              {/* Megamenu 1 */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#megamenu1" role="button" data-bs-toggle="dropdown">
                  Megamenu 1
                </a>
              </li>

              {/* Megamenu 2 */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#megamenu2" role="button" data-bs-toggle="dropdown">
                  Megamenu 2
                </a>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;