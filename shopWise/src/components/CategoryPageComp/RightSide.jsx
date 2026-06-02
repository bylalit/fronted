import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { AuthContext } from "../../context/AuthContext";

const RightSide = ({search, category, setCategory, brand}) => {

    
    let [productData, setProductData] = useState({ count: 0, results: [] }); 
    const navigate = useNavigate();
    const location = useLocation();
    const [liveSearch, setLiveSearch] = useState("");
    const [price, setPrice] = useState("");
    const [sort, setSort] = useState("");
    const { wishlistItems, toggleWishlist, addToCart } = useContext(AuthContext);

    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; 

    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("id");

    const { setGlobalLoading } = useContext(AuthContext);
      
    let url = "http://127.0.0.1:8000/api/product/";
    let param = [];

    // 🎯 PAGINATION ATTENTION INJECTOR
    param.push(`page=${currentPage}`);

    if(search){
        param.push(`search=${search}`)
    }

    if(liveSearch.length > 0){
        param.push(`search=${liveSearch}`)
    }
    
    const finalCategoryFilter = category || categoryId;
    if(finalCategoryFilter){
        param.push(`category=${finalCategoryFilter}`)
    }

    if(price){
        param.push(`price=${price}`)
    }

    if(sort){
        param.push(`sort=${sort}`)
    }

    if(brand){
        console.log(brand);
        param.push(`brand=${brand}`)
    }

    if(param.length > 0){
        url += "?" + param.join("&");
    }

    const getProduct = async ()=>{
        setGlobalLoading(true);
        try {
            let response = await fetch(url);
            response = await response.json();
            
            // Django Paginated payload matrix check bindings logic
            if (response && response.results) {
                setProductData(response);
            } else if (Array.isArray(response)) {
                setProductData({ count: response.length, results: response });
            }
        } catch (error) {
            console.error("Error logging products pagination array node strings:", error);
        } finally {
            setGlobalLoading(false);
        }
    }

    const productShowData = (id) => {
        navigate("/productDetails/"+id);
    }

    // Reset target active pagination page index whenever filter parameters mutates natively
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, location.search, liveSearch, price, sort, brand]);

    useEffect(() => {
        getProduct();
    }, [currentPage, search, category, location.search, liveSearch, price, sort, brand]);

    // 🧠 Dynamic Page calculations matrix helper rules
    const totalPages = Math.ceil(productData.count / itemsPerPage) || 1;

    const handlePageChange = (pageNo) => {
        if (pageNo >= 1 && pageNo <= totalPages) {
            setCurrentPage(pageNo);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scrolls window back to view viewport grids
        }
    };

    // 🆕 PRODUCTION MATH: Dynamic showing ranges logic calculations (e.g. "Showing 1–12 of 45 products")
    const startItem = productData.count === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, productData.count);
  
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
            .product-title-clamp {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 48px;
                line-height: 24px;
            }
        `}</style>

        {/* RIGHT PRODUCTS GRID & CONFIG BAR  */}
        <div className="col-12 col-lg-9">
            
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
                            value={price}
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
                            value={sort}
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
                            <option>{itemsPerPage} items</option>
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
                (price || sort || liveSearch || finalCategoryFilter) && (
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
                                finalCategoryFilter && (
                                    <span
                                        className="badge border rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold"
                                        style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}
                                    >
                                        Category : {finalCategoryFilter}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => { setCategory(""); navigate("/category"); }}></i>
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
                                navigate("/category");
                            }}
                        >
                            Reset All
                        </span>
                    </div>
                )
            }
            

            {/* Products Cards Layout Matrix Grid */}
            {productData.results?.length === 0 ? (
                <div className="text-center py-5 border border-dashed rounded bg-light text-muted my-3">
                    <i className="bi bi-box-open display-2"></i>
                    <h5 className="mt-3 fw-bold">No Product Found!</h5>
                    <p className="small">Kripya koi doosra filter ya keyword try karein.</p>
                </div>
            ) : (
                <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5 mt-2">
                {productData.results?.map((product) => {
                        
                        const isFavorite = wishlistItems?.some(item => item.product === product.id);

                        return (
                            <div className="col d-flex" key={product.id}>
                                <div className="card product-card-wrap w-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                                    
                                    <div
                                        className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                                        style={{ height: '240px' }} 
                                    >
                                    {product.badge_tag && product.badge_tag !== "NONE" && (
                                        <span
                                            className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2"
                                            style={{ backgroundColor: '#198754', color: '#fff', fontSize: '11px' }}
                                        >
                                            {product.badge_tag}
                                        </span>
                                    )}

                                    <img
                                        src={product.images?.find((img) => img.is_primary)?.image_url || product.images?.[0]?.image_url || "https://placeholder.com/240"}
                                        alt={product.title}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} 
                                    />

                                    {/* Hover Interaction Overlay */}
                                    <div
                                        className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1"
                                        style={{ backgroundColor: 'rgba(15, 44, 89, 0.2)' }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleWishlist(product.id)}
                                            className="action-icon-btn border-0"
                                            title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                                        >
                                            <i className={`bi bi-heart-fill ${isFavorite ? 'text-danger' : 'text-muted'}`}></i>
                                        </button>

                                        <button type="button" onClick={() => productShowData(product.id)}
                                            className="action-icon-btn border-0"
                                            title="Quick View"
                                        >
                                            <i className="bi bi-eye-fill"></i>
                                        </button>
                                    </div>
                                    </div>

                                    <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                                        <div className="mb-3">
                                            <span
                                                className="text-muted fw-bold d-block mb-1 text-uppercase"
                                                style={{ fontSize: '11px', letterSpacing: '0.5px' }}
                                            >
                                                {product.category_name}
                                            </span>

                                            <h5
                                                className="fw-bold mb-2 text-dark product-title-clamp"
                                                style={{ fontSize: '15px', cursor: 'pointer' }}
                                                onClick={() => productShowData(product.id)}
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
                                                <span className="text-muted ms-1 fw-medium">(5.0)</span>
                                            </div>
                                        </div>

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
                                                type="button"
                                                className="btn text-white fw-bold border-0 shadow-sm"
                                                style={{ backgroundColor: '#0AA586', borderRadius: '5px', fontSize: '12px', padding: '8px 12px', whiteSpace: 'nowrap' }}
                                                onClick={() => addToCart(product.id, 1)}
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
            )}

            {/* 🎯 PAGINATION COMPONENT SYNC INTERFACE BLOCK */}
            {productData.results?.length > 0 && (
                <div className="card border-0 p-3 rounded-3 bg-white shadow-sm border d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center gap-3">
                    {/* 🆕 UPDATED: Real dynamic counting ranges string label inject */}
                    <span className="text-muted fw-medium style-text-results" style={{ fontSize: '14px' }}>
                        Showing <strong className="text-dark fw-bold">{startItem}–{endItem}</strong> of <strong className="text-dark fw-bold">{productData.count}</strong> products
                    </span>
                
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                        <nav aria-label="Product navigation page items">
                        <ul className="pagination pagination-sm mb-0 align-items-center gap-1">
                            {/* Previous Button Handler */}
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ cursor: "pointer" }}>
                                <span className="page-link border rounded-2 px-2.5 py-1.5" onClick={() => handlePageChange(currentPage - 1)}>
                                    <i className="bi bi-arrow-left"></i>
                                </span>
                            </li>

                            {/* Page Numbers Mapping */}
                            {Array.from({ length: totalPages }).map((_, idx) => {
                                const pageNumber = idx + 1;
                                return (
                                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} style={{ cursor: "pointer" }}>
                                        <span 
                                            className="page-link border rounded-2 px-3 py-1.5 fw-bold" 
                                            style={currentPage === pageNumber ? { backgroundColor: '#0AA586', borderColor: '#0AA586', color: '#fff' } : { color: '#4A5568' }}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </span>
                                    </li>
                                );
                            })}

                            {/* Next Button Handler */}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{ cursor: "pointer" }}>
                                <span className="page-link border rounded-2 px-2.5 py-1.5" onClick={() => handlePageChange(currentPage + 1)}>
                                    <i className="bi bi-arrow-right"></i>
                                </span>
                            </li>
                        </ul>
                        </nav>
                    </div>
                </div>
            )}

        </div> 
    </>
  )
}

export default RightSide;