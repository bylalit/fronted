import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RightSide = ({search, category, setCategory}) => {

    let [products, setProducts] = useState([]); 
    const navigate = useNavigate();
    const [liveSearch, setLiveSearch] = useState("");
    const [price, setPrice] = useState("");
    const [sort, setSort] = useState("");
    const { wishlistItems, toggleWishlist, addToCart } = useContext(AuthContext);

    let url = "http://127.0.0.1:8000/api/product/";
    let param = [];

    if(search){
        param.push(`search=${search}`)
    }

    if(liveSearch.length > 0){
        param.push(`search=${liveSearch}`)
    }
    
    if(category){
        param.push(`category=${category}`)
    }

    if(price){
        param.push(`price=${price}`)
    }

    if(sort){
        param.push(`sort=${sort}`)
    }

    if(param.length > 0){
        url += "?" + param.join("&");
    }

    const getProduct = async ()=>{
        let response = await fetch(url);
        response = await response.json();
        setProducts(response);
    }

    const productShowData = (id) => {
        navigate("/productDetails/"+id);
    }



    useEffect(() => {
        getProduct();
    }, [search, category, liveSearch, price, sort])
  
  return (
    <>
        {/* Dynamic CSS Injection for Hover Effects & Layout Refinements */}
        <style>{`
            .product-card-wrap .hover-actions {
                opacity: 0;
                transition: all 0.3s ease-in-out;
                transform: translateY(10px);
            }
            .product-card-wrap:hover .hover-actions {
                opacity: 1;
                transform: translateY(0);
            }
            .action-icon-btn {
                width: 40px;
                height: 40px;
                background-color: white;
                color: #333;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                transition: all 0.2s;
            }
            .action-icon-btn:hover {
                background-color: #0AA586;
                color: white !important;
            }
            /* 🆕 Safe Title Multi-line Handling */
            .product-title-clamp {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 48px; /* Fixed multi-line slot constraint */
                line-height: 24px;
            }
        `}</style>

        {/* RIGHT PRODUCTS GRID & CONFIG BAR  */}
        <div className="col-12 col-lg-8">
            
            {/* Top Toolbar Utilities Panel */}
            <div className="card border-0 p-3 rounded-3 mb-4 bg-white shadow-sm border">
                <div className="row g-3 align-items-center justify-content-between">
                    
                    {/* Search Input */}
                    <div className="col-12 col-md-5">
                    <div className="input-group border rounded-2 bg-light p-1">
                        <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                        <input 
                            type="text" 
                            className="form-control bg-transparent border-0 shadow-none ps-1 fw-medium" placeholder="Search products, categories, brands..." 
                            style={{ fontSize: '14px' }}
                            onChange={(e) => setLiveSearch(e.target.value)} 
                        />
                    </div>
                    </div>

                    {/* Grid / List Layout Toggles */}
                    <div className="col-auto d-flex align-items-center gap-3">
                    <span className="text-muted small fw-bold">VIEW</span>
                    <div className="btn-group border rounded-2" style={{ overflow: 'hidden' }}>
                        <button className="btn btn-success btn-sm px-2.5 py-1.5 border-0" style={{ backgroundColor: '#0AA586' }}><i className="bi bi-grid-3x3-gap-fill text-white"></i></button>
                        <button className="btn btn-light btn-sm px-2.5 py-1.5 border-0 bg-white"><i className="bi bi-list text-secondary"></i></button>
                    </div>
                    </div>

                </div>

                {/* Filters Option Dropdowns */}
                <div className="row g-2 mt-3 pt-2 border-top align-items-end">
                    <div className="col-6 col-sm-3">
                        <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Price Range</label>
                        <select 
                            className="form-select border shadow-none bg-light fw-semibold text-secondary" 
                            style={{ fontSize: '14px', padding: '8px' }}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <option value="">All Prices</option>
                            <option value="0-800">₹0 - ₹800</option>
                            <option value="800-5000">₹800 - ₹5000</option>
                            <option value="5000-10000">₹5000 - ₹10000</option>
                        </select>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Sort By</label>
                        <select 
                            className="form-select border shadow-none bg-light fw-semibold text-secondary" 
                            style={{ fontSize: '14px', padding: '8px' }}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Featured</option>
                            <option value="low">Price Low to High</option>
                            <option value="high">Price High to Low</option>
                            <option value="new">Newest</option>
                        </select>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label className="text-dark fw-bold small mb-1.5" style={{ fontSize: '13px' }}>Items Per Page</label>
                        <select className="form-select border shadow-none bg-light fw-semibold text-secondary" style={{ fontSize: '14px', padding: '8px' }}>
                            <option>12 items</option>
                        </select>
                    </div>
                    <div className="col-6 col-sm-3">
                        <button 
                            className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-1.5 text-secondary fw-semibold" 
                            style={{ fontSize: '14px', padding: '9px' }}
                            onClick={() => {
                                setPrice("");
                                setSort("");
                                setLiveSearch("");
                                setCategory("");
                            }}
                        >
                            <i className="bi bi-arrow-counterclockwise"></i> Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Active Filter Badges */}   
            {
                (price || sort || liveSearch || category) && (
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 px-1">
                        <div className="d-flex flex-wrap align-items-center gap-2" style={{ fontSize: '14px' }}>
                            <span className="text-muted fw-bold">Active filters:</span>
                            {
                                price && (
                                    <span
                                        className="badge border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                                        style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}
                                    >
                                        Price : {price}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => setPrice("")}></i>
                                    </span>
                                )
                            }
                            {
                                category && (
                                    <span
                                        className="badge border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                                        style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}
                                    >
                                        Category : {category}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => setCategory("")}></i>
                                    </span>
                                )
                            }
                            {
                                sort && (
                                    <span
                                        className="badge border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                                        style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}
                                    >
                                        Sort : {sort}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => setSort("")}></i>
                                    </span>
                                )
                            }
                            {
                                liveSearch && (
                                    <span
                                        className="badge border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                                        style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}
                                    >
                                        Search : {liveSearch}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => setLiveSearch("")}></i>
                                    </span>
                                )
                            }
                        </div>
                        <span 
                            className="text-muted hover-danger small fw-bold" 
                            style={{ fontSize: '14px', cursor: 'pointer' }}
                            onClick={() => {
                                setPrice("");
                                setSort("");
                                setLiveSearch("");
                                setCategory("");
                            }}
                        >
                            Reset All
                        </span>
                    </div>
                )
            }
            

            {/* Products Cards Layout Matrix Grid */}
            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5 mt-2">
               {products?.map((product) => {
                    
                    const isFavorite = wishlistItems?.some(item => item.product === product.id);

                    return (
                        <div className="col d-flex" key={product.id}>
                            {/* 🎯 FIX 1: Flex properties alignment on main wrap card */}
                            <div className="card product-card-wrap w-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                                
                                <div
                                    className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                                    style={{ height: '240px' }} // Slightly adjusted image layout boundaries
                                >
                                {product.badge_tag && (
                                    <span
                                        className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2"
                                        style={{ backgroundColor: '#198754', color: '#fff', fontSize: '11px' }}
                                    >
                                        {product.badge_tag}
                                    </span>
                                )}

                                <img
                                    src={product.images.find((img) => img.is_primary)?.image_url}
                                    alt={product.title}
                                    className="w-100 h-100"
                                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} // Handled backgrounds beautifully
                                />

                                {/* Hover Interaction Overlay */}
                                <div
                                    className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1"
                                    style={{ backgroundColor: 'rgba(15, 44, 89, 0.2)' }}
                                >
                                    <button
                                        onClick={() => toggleWishlist(product.id)}
                                        className="action-icon-btn border-0"
                                        title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        <i className={`bi bi-heart-fill ${isFavorite ? 'text-danger' : 'text-muted'}`}></i>
                                    </button>

                                    <button onClick={() => productShowData(product.id)}
                                        className="action-icon-btn border-0"
                                        title="Quick View"
                                    >
                                        <i className="bi bi-eye-fill"></i>
                                    </button>
                                </div>
                                </div>

                                {/* 🎯 FIX 2: Wrapped metadata into a clean, expanding structure using flex utilities */}
                                <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                                    <div className="mb-3">
                                        <span
                                            className="text-muted fw-bold d-block mb-1 text-uppercase"
                                            style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                                        >
                                            {product.category_name}
                                        </span>

                                        {/* Clamped title to protect formatting layout structure */}
                                        <h5
                                            className="fw-bold mb-2 text-dark product-title-clamp"
                                            style={{ fontSize: '15px' }}
                                            title={product.title}
                                        >
                                            {product.title}
                                        </h5>

                                        {/* Rating Framework Slot */}
                                        <div
                                            className="text-warning small d-flex align-items-center gap-1"
                                            style={{ fontSize: '12px' }}
                                        >
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill text-black-50 opacity-25"></i>
                                            <span className="text-muted ms-1 fw-medium">(120)</span>
                                        </div>
                                    </div>

                                    {/* 🎯 FIX 3: Dynamic Price and Add To Cart safe positioning frame at absolute bottom */}
                                    <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold fs-5 text-dark lh-sm">
                                                ${product.price}
                                            </span>
                                            {product.old_price && (
                                                <span className="text-muted text-decoration-line-through x-small" style={{ fontSize: '12px' }}>
                                                    ${product.old_price}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            className="btn text-white fw-bold border-0 shadow-sm"
                                            style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '12px', padding: '8px 12px', whiteSpace: 'nowrap' }}
                                            onClick={() => addToCart(product.id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
               })}
            </div>

            {/* Pagination Interface Control Footer */}
            <div className="card border-0 p-3 rounded-3 bg-white shadow-sm border d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center gap-3">
            <span className="text-muted fw-medium style-text-results" style={{ fontSize: '14px' }}>Page <strong className="text-dark fw-bold">1</strong> of <strong className="text-dark fw-bold">10</strong> · Showing results</span>
            
            <div className="d-flex align-items-center gap-3 flex-wrap">
                <nav aria-label="Product navigation page items">
                <ul className="pagination pagination-sm mb-0 align-items-center gap-1">
                    <li className="page-item disabled"><span className="page-link border rounded-2 px-2.5 py-1.5"><i className="bi bi-arrow-left"></i></span></li>
                    <li className="page-item active"><span className="page-link border rounded-2 px-3 py-1.5 fw-bold" style={{ backgroundColor: '#0AA586', borderColor: '#0AA586' }}>1</span></li>
                    <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page2">2</a></li>
                    <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page3">3</a></li>
                    <li className="page-item disabled"><span className="px-1 text-muted fw-bold">...</span></li>
                    <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page9">9</a></li>
                    <li className="page-item"><a className="page-link border rounded-2 px-3 py-1.5 text-secondary fw-semibold" href="#page10">10</a></li>
                    <li className="page-item"><a className="page-link border rounded-2 px-2.5 py-1.5 text-secondary" href="#page2"><i className="bi bi-arrow-right"></i></a></li>
                </ul>
                </nav>

                <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '14px' }}>
                <span className="text-muted fw-medium">Go to</span>
                <input type="text" className="form-control text-center border shadow-none bg-transparent fw-bold" defaultValue="1" style={{ width: '42px', height: '34px', borderRadius: '5px' }} />
                <button className="btn btn-sm btn-light border px-3 fw-bold" style={{ height: '34px' }}>Go</button>
                </div>
            </div>
            </div>

        </div> 
    </>
  )
}

export default RightSide;