import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const RightSide = ({search, category, setCategory}) => {

    let [products, setProducts] = useState();
    const navigate = useNavigate();
    const [liveSearch, setLiveSearch] = useState("");
    const [price, setPrice] = useState("");
    const [sort, setSort] = useState("");

    let url = "http://127.0.0.1:8000/api/product/";

    let param = [];

    if(search){
        // url += `?search=${search}`;
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

    console.log(param);
    

    const getProduct = async ()=>{
        let response = await fetch(url);
        response = await response.json();

        // console.log(response);
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
        {/* Dynamic CSS Injection for Hover Effects */}
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
                    {/* <button className="btn btn-success text-white fw-bold px-4 border-0" style={{ backgroundColor: '#0AA586', height: '38px', borderRadius: '5px', fontSize: '14px' }}>Search</button> */}
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
                        <button className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-1.5 text-secondary fw-semibold" style={{ fontSize: '14px', padding: '9px' }}>
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
                                        style={{
                                            backgroundColor: '#E2F2EE',
                                            borderColor: '#C6E7E1',
                                            color: '#0AA586'
                                        }}
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
                                        style={{
                                            backgroundColor: '#E2F2EE',
                                            borderColor: '#C6E7E1',
                                               color: '#0AA586'
                                        }}
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
                                        style={{
                                            backgroundColor: '#E2F2EE',
                                            borderColor: '#C6E7E1',
                                            color: '#0AA586'
                                        }}
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
                                        style={{
                                            backgroundColor: '#E2F2EE',
                                            borderColor: '#C6E7E1',
                                            color: '#0AA586'
                                        }}
                                    >
                                        Search : {liveSearch}
                                        <i className="bi bi-x fs-6" style={{cursor: "pointer"}} onClick={() => setLiveSearch("")}></i>
                                    </span>
                                )
                            }
                            {/* <span className="badge border rounded-pill px-3 py-2 text-success font-normal d-flex align-items-center gap-2 fw-semibold" style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}>
                            Electronics <i className="bi bi-x cursor-pointer fs-6"></i>
                            </span>
                            <span className="badge border rounded-pill px-3 py-2 text-success font-normal d-flex align-items-center gap-2 fw-semibold" style={{ backgroundColor: '#E2F2EE', borderColor: '#C6E7E1', color: '#0AA586' }}>
                            $50 to $100 <i className="bi bi-x cursor-pointer fs-6"></i>
                            </span> */}
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
            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 mb-5 mt-4">
               {products?.map((product) => (
                    <div className="col" key={product.id}>
                        <div className="card product-card-wrap h-100 border rounded-3 bg-white shadow-sm overflow-hidden d-flex flex-column position-relative">
                            
                            <div
                            className="position-relative p-3 bg-light text-center d-flex align-items-center justify-content-center overflow-hidden"
                            style={{ height: '280px' }}
                            >
                            <span
                                className="position-absolute top-0 start-0 m-3 badge rounded-2 px-2 py-1.5 fw-bold z-2"
                                style={{
                                backgroundColor: '#198754',
                                color: '#fff',
                                fontSize: '11px'
                                }}
                            >
                                {product.badge_tag}
                            </span>

                            <img
                                src={product.images.find((img) => img.is_primary)?.image_url}
                                alt="Wireless Headphone"
                                className="w-100 h-100 object-cover rounded-2"
                                style={{
                                objectFit: 'cover',
                                objectPosition: 'top center'
                                }}
                            />

                            {/* Hover Interaction Overlay */}
                            <div
                                className="hover-actions position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2 z-1"
                                style={{ backgroundColor: 'rgba(15, 44, 89, 0.2)' }}
                            >
                                <button
                                className="action-icon-btn border-0"
                                title="Add to Wishlist"
                                >
                                <i className="bi bi-heart-fill"></i>
                                </button>

                                <button onClick={() => productShowData(product.id)}
                                className="action-icon-btn border-0"
                                title="Quick View"
                                >
                                <i className="bi bi-eye-fill"></i>
                                </button>
                            </div>
                            </div>

                            {/* Card Bottom Meta Content */}
                            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                                <div>
                                    <span
                                    className="text-muted fw-extrabold d-block mb-1"
                                    style={{
                                        fontSize: '11px',
                                        letterSpacing: '0.5px'
                                    }}
                                    >
                                    {product.category_name}
                                    </span>

                                    <h5
                                    className="fw-bold mb-2 text-truncate"
                                    style={{
                                        color: '#0F2C59',
                                        fontSize: '17px'
                                    }}
                                    >
                                    {product.title}
                                    </h5>

                                    {/* Rating */}
                                    <div
                                    className="text-warning small d-flex align-items-center gap-1 mb-3"
                                    style={{ fontSize: '13px' }}
                                    >
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-black-50 opacity-25"></i>

                                    <span className="text-muted ms-1 fw-medium">
                                        (120 reviews)
                                    </span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-auto pt-2">

                                {/* Price */}
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold fs-5 text-dark m-0">
                                    ${product.price}
                                    </span>

                                    <span className="text-muted text-decoration-line-through small fw-medium m-0">
                                    ${product.old_price}
                                    </span>
                                </div>

                                {/* Button */}
                                <button
                                    className="btn text-white fw-bold border-0 shadow-sm"
                                    style={{
                                    backgroundColor: '#0AA586',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    padding: '8px 14px',
                                    whiteSpace: 'nowrap'
                                    }}
                                >
                                    Add to Cart
                                </button>

                                </div>
                            </div>
                        </div>
                    </div>
               ))}
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

export default RightSide
