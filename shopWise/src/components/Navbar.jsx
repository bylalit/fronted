import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = ({ setSearch }) => {
  // Dropdowns visibility tracking conditional states
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // 🎯 Context se required cart controllers nikal liye
  const { wishlistItems, userProfile, logout, cartData, getCart, removeFromCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef(null);
  const cartRef = useRef(null);
  const [input, setInput] = useState("");

  const searchProduct = async () => {
    setSearch(input);
    navigate("/category");
  };

  const handleLogout = () => {
    logout(); 
    setShowUserDropdown(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };


  const miniCartItems = Array.isArray(cartData) ? cartData : (cartData?.items || []);
  // const cartCount = miniCartItems.length; 
  const cartCount = miniCartItems ? miniCartItems.length : 0; 
  const cartSubtotal = miniCartItems.reduce((acc, item) => acc + (parseFloat(item.subtotal) || 0), 0);
  
  // Page mount par cart load karne ke liye
  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="w-100 font-sans shadow-sm">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-light border-bottom py-2 px-5 text-secondary" style={{ fontSize: "14px" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <div className="d-flex gap-4">
            <span className="cursor-pointer">
              <i className="bi bi-geo-alt me-1"></i> Find a Store
            </span>
            <span className="border-start ps-4 cursor-pointer">
              <i className="bi bi-headset me-1"></i> Support
            </span>
          </div>
          <div className="text-success fw-semibold">
            Free delivery on orders over $75
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Logo, Search, Icons) */}
      <div className="border-bottom">
        <div className="container py-3 px-4">
          <div className="row align-items-center justify-content-between">
            {/* Logo */}
            <div className="col-auto d-flex align-items-center">
              <Link to="/">
                <div className="text-success fs-3 me-2">
                  <i className="bi bi-cart3"></i>
                </div>
              </Link>
              <Link to="/" className="text-decoration-none">
                <span className="fs-2 fw-bold text-dark" style={{ letterSpacing: "-0.5px" }}>
                  Shop<span style={{ color: "#0F2C59" }}>Wise</span>
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="col-10 col-md-6 col-lg-5">
              <div className="input-group border rounded-2" style={{ overflow: "hidden" }}>
                <span className="input-group-text bg-white border-0 text-muted pe-1">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  onChange={(event) => setInput(event.target.value)}
                  className="form-control border-0 shadow-none ps-2"
                  placeholder="Search for products, brands, and more..."
                  aria-label="Search"
                />
                <button
                  className="btn btn-success px-4 fw-medium border-0"
                  onClick={searchProduct}
                  style={{ backgroundColor: "#0aa586" }}
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Action Toggles Area Framework */}
            <div className="col-auto d-flex align-items-center gap-4 text-secondary fs-4 position-relative">
              
              {/* TARGET A: USER PROFILE AVATARICON */}
              <div className="position-relative" ref={userRef}>
                <div
                  onClick={() => {
                    setShowUserDropdown(!showUserDropdown);
                    setShowCartDropdown(false);
                  }}
                  className="cursor-pointer text-dark p-1 rounded-circle border d-flex align-items-center justify-content-center bg-light-hover"
                  style={{ width: "38px", height: "38px", cursor: "pointer" }}
                >
                  {userProfile ? (
                    <img
                      src={userProfile?.profile_image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                      alt="profile"
                      className="rounded-circle"
                      width="32"
                      height="32"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="bi bi-person fs-3"></i>
                  )}
                </div>

                {/* VISUAL COMPONENT 1: USER DROPDOWN MENUS */}
                {showUserDropdown && (
                  <div
                    className="position-absolute end-0 bg-white border rounded-3 p-4 shadow-lg text-start z-3"
                    style={{ width: "280px", marginTop: "12px", borderColor: "#e2e8f0" }}
                  >
                    {userProfile ? (
                      <>
                        <h6 className="fw-bold mb-1 text-dark text-truncate" style={{ fontSize: "15px" }}>
                          Hi, {userProfile?.first_name || "User"}
                        </h6>
                        <p className="text-muted mb-3" style={{ fontSize: "12px" }}>
                          Manage your account and orders
                        </p>
                        <div className="d-flex mb-3">
                          <button
                            onClick={handleLogout}
                            className="btn btn-danger btn-sm flex-grow-1 fw-bold text-white border-0"
                            style={{ backgroundColor: "#dc3545", padding: "7px 0", fontSize: "13px" }}
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "15px" }}>Welcome Back</h6>
                        <p className="text-muted mb-3" style={{ fontSize: "12px" }}>Log in for a personalized experience</p>
                        <div className="d-flex gap-2 mb-3">
                          <Link to="/login" className="btn btn-success btn-sm flex-grow-1 fw-bold text-white border-0" style={{ backgroundColor: "#0aa586", padding: "7px 0", fontSize: "13px" }} onClick={() => setShowUserDropdown(false)}>Log In</Link>
                          <Link to="/register" className="btn btn-light btn-sm flex-grow-1 fw-bold border text-secondary bg-white" style={{ padding: "7px 0", fontSize: "13px" }} onClick={() => setShowUserDropdown(false)}>Register</Link>
                        </div>
                      </>
                    )}
                    <hr className="text-muted opacity-25 my-3" />
                    <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: "13.5px" }}>
                      <Link to="/account" className="text-decoration-none text-secondary hover-success py-1 fw-medium d-flex align-items-center gap-2" onClick={() => setShowUserDropdown(false)}>
                        <i className="bi bi-clock-history text-muted"></i> Order History
                      </Link>
                      <Link to="/favorites" className="text-decoration-none text-secondary hover-success py-1 fw-medium d-flex align-items-center gap-2" onClick={() => setShowUserDropdown(false)}>
                        <i className="bi bi-heart text-muted"></i> Favorites
                      </Link>
                      <Link to="/account" className="text-decoration-none text-secondary hover-success py-1 fw-medium d-flex align-items-center gap-2" onClick={() => setShowUserDropdown(false)}>
                        <i className="bi bi-arrow-left-right text-muted"></i> Returns & Exchanges
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Icon with badge */}
              <Link to="/favorites" className="position-relative cursor-pointer text-decoration-none">
                <i className={`bi ${wishlistItems.length > 0 ? "bi-heart-fill text-danger" : "bi-heart text-dark"} fs-5`}></i>
                {wishlistItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: "10px", padding: "4px 6px", marginTop: "-2px" }}>
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* TARGET B: DETAILED OVERLAY ITEMISED BAG */}
              <div className="position-relative" ref={cartRef}>
                <div
                  onClick={() => {
                    setShowCartDropdown(!showCartDropdown);
                    setShowUserDropdown(false);
                  }}
                  className="position-relative pointer"
                  style={{cursor:'pointer'}}
                >
                  <i className="bi bi-bag text-dark fs-5"></i>
                  {/* 🎯 Live Cart Total Items Badge Count Allocation */}
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success" style={{ fontSize: "10px", padding: "4px 6px", marginTop: "-2px" }}>
                      {cartCount}
                    </span>
                  )}
                </div>

                {/* VISUAL COMPONENT 2: INTERACTIVE POPUP RECEIPT OVERLAY BOX */}
                {showCartDropdown && (
                  <div
                    className="position-absolute end-0 bg-white border rounded-3 p-3 shadow-lg text-start z-3"
                    style={{ width: "320px", marginTop: "16px", borderColor: "#e2e8f0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold text-dark mb-0" style={{ fontSize: "15px" }}>Your Bag</h6>
                      <span className="badge rounded-pill bg-light text-secondary border fw-medium px-2 py-1" style={{ fontSize: "11px" }}>
                        {cartCount} items
                      </span>
                    </div>

                    {/* Mapping List Array Stack items */}
                    {miniCartItems.length === 0 ? (
                      <div className="text-center py-4 text-muted small fw-medium">
                        Your bag is empty 🛒
                      </div>
                    ) : (
                      <>
                        <div className="d-flex flex-column gap-2.5 overflow-auto mb-3" style={{ maxHeight: "240px" }}>
                          {miniCartItems.map((item) => {
                            // 🎯 Key referenced dynamically to matching singular node 'product_detail'
                            const product = item.product_detail;
                            if (!product) return null;

                            const primaryImg = product.images?.find(img => img.is_primary)?.image_url || product.images?.[0]?.image_url || product.images?.[0]?.image || "https://placeholder.com/100";

                            return (
                              <div key={item.id} className="d-flex gap-2.5 align-items-center border-bottom pb-2.5">
                                <div className="border rounded bg-light p-1 d-flex align-items-center justify-content-center text-center" style={{ width: "55px", height: "55px" }}>
                                  <img src={primaryImg} alt={product.title} className="img-fluid object-contain" style={{ maxHeight: "45px", mixBlendMode: "multiply" }} />
                                </div>
                                <div className="flex-grow-1 min-w-0" style={{ fontSize: "13px" }}>
                                  <h6 className="fw-bold text-dark mb-0 text-truncate" style={{ fontSize: "13.5px" }} title={product.title}>
                                    {product.title}
                                  </h6>
                                  <small className="text-muted mb-1 d-block text-uppercase" style={{ fontSize: "10px" }}>
                                    {product.category_name}
                                  </small>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-success fw-bold" style={{ color: "#0AA586" }}>
                                      ${product.price}
                                    </span>
                                    <span className="text-muted x-small">x{item.quantity}</span>
                                  </div>
                                </div>
                                {/* 🗑️ LIVE REMOVE ACTION ON HOVER DROPDOWN */}
                                <button onClick={() => removeFromCart(product.id)} className="btn p-0 border-0 text-muted opacity-50 hover-danger ms-1">
                                  <i className="bi bi-trash small"></i>
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Subtotal Calculation summary panel */}
                        <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3 fw-bold text-dark" style={{ fontSize: "15px" }}>
                          <span>Subtotal</span>
                          <span>${cartSubtotal.toFixed(2)}</span>
                        </div>

                        <Link
                          to="/checkout"
                          className="btn w-100 text-white fw-bold py-2 border-0 mb-2 text-center d-block shadow-sm"
                          style={{ backgroundColor: "#0AA586", borderRadius: "5px", fontSize: "14px" }}
                          onClick={() => setShowCartDropdown(false)}
                        >
                          Proceed to Checkout
                        </Link>
                      </>
                    )}
                    <Link
                      to="/cart"
                      className="text-success text-center d-block small fw-bold text-decoration-none hover-underline mt-2"
                      style={{ color: "#0AA586", fontSize: "13px" }}
                      onClick={() => setShowCartDropdown(false)}
                    >
                      View full bag →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION MENU BAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 px-4 container">
        <div className="container-fluid p-0">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav gap-3 align-items-center fw-medium" style={{ color: "#4A5568" }}>
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
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
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