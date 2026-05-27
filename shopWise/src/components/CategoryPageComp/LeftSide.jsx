import { useEffect, useState } from 'react';

const LeftSide = ({setCategory}) => {
    const colors = ["#000000", "#ffffff", "#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#F97316", "#EC4899", "#78350F"];
    
    const brands = [
        { name: "Nike", count: 24 }, { name: "Adidas", count: 18 }, { name: "Puma", count: 12 },
        { name: "Reebok", count: 9 }, { name: "Under Armour", count: 7 }, { name: "New Balance", count: 6 },
        { name: "Converse", count: 5 }, { name: "Vans", count: 4 }
    ];

    const url = "http://127.0.0.1:8000/api/category/";
    const [openCategory, setOpenCategory] = useState(null);
    const [categories, setCategories] = useState();


    const getCategory = async()=> {
        let response = await fetch(url);
        response = await response.json();

        // console.log(response);
        setCategories(response);
    }

    const fileterByCategory = (id) => {
        setCategory(id);  
    }

    useEffect(() => {
        getCategory();
    }, [])

  return (
    <>
        {/* ==================== LEFT SIDEBAR FILTER CONTROLS ==================== */}
        <div className="col-12 col-lg-4">
            
            {/* 1. Category Tree Card */}
            {/* <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
            <h5 className="fw-bold mb-4 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Categories</h5>
            
            <div className="d-flex flex-column gap-3" style={{ fontSize: '15px' }}>
                <div>
                <div className="d-flex justify-content-between text-dark fw-bold cursor-pointer align-items-center mb-2">
                    <span>Clothing</span>
                    <i className="bi bi-chevron-up text-muted small"></i>
                </div>
                <div className="d-flex flex-column gap-2 ps-3 text-muted fw-medium">
                    <span className="cursor-pointer text-success">Men's Wear</span>
                    <span className="cursor-pointer text-dark">Women's Wear</span>
                    <span className="cursor-pointer text-dark">Kids' Clothing</span>
                    <span className="cursor-pointer text-dark">Accessories</span>
                </div>
                </div>

                <hr className="my-1 opacity-25" />

                <div>
                <div className="d-flex justify-content-between text-muted fw-semibold cursor-pointer align-items-center mb-2">
                    <span>Electronics</span>
                    <i className="bi bi-chevron-down small"></i>
                </div>
                </div>

                {["Home & Kitchen", "Beauty & Personal Care", "Sports & Outdoors", "Books", "Toys & Games"].map((text, i) => (
                <React.Fragment key={i}>
                    <hr className="my-1 opacity-25" />
                    <div className="d-flex justify-content-between text-muted fw-semibold cursor-pointer align-items-center">
                    <span>{text}</span>
                    <i className="bi bi-chevron-down small"></i>
                    </div>
                </React.Fragment>
                ))}
            </div>
            </div> */}
            {/* Category Card */}
            <div
            className="card border-0 p-4 rounded-3 mb-4 shadow-sm border"
            style={{ backgroundColor: '#F8FAFC' }}
            >

            <h5
                className="fw-bold mb-4 border-start border-4 border-success ps-2"
                style={{ color: '#0F2C59', fontSize: '18px' }}
            >
                Categories
            </h5>

            <div className="d-flex flex-column gap-3">

                {/* Parent Categories */}
                {categories?.filter((cat) => cat.parent === null)
                .map((parentCategory) => (

                    <div key={parentCategory.id}>

                    {/* Parent */}
                    <div
                        className="d-flex justify-content-between align-items-center mb-2"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                        setOpenCategory(
                            openCategory === parentCategory.id
                            ? null
                            : parentCategory.id
                        )
                        }
                    >

                        <span className="fw-bold text-dark">
                        {parentCategory.name}
                        </span>

                        <i
                        className={`bi ${
                            openCategory === parentCategory.id
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                        }`}
                        ></i>

                    </div>

                    {/* Child Categories */}
                    {openCategory === parentCategory.id && (

                        <div className="d-flex flex-column gap-2 ps-3">

                        {categories
                            ?.filter((child) =>
                            child.parent?.includes(
                                `/category/${parentCategory.id}/`
                            )
                            )
                            .map((childCategory) => (

                            <span
                                key={childCategory.id}
                                className="text-muted"
                                style={{ cursor: "pointer" }}
                                onClick={()=> fileterByCategory(childCategory.id)}
                            >
                                {childCategory.name}
                            </span>

                            ))}

                        </div>

                    )}

                    <hr className="my-2 opacity-25" />

                    </div>

                ))}

            </div>

            </div>

            {/* 2. Color Filter Card */}
            <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
            <h5 className="fw-bold mb-3 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Filter by Color</h5>
            <div className="d-flex flex-wrap gap-2 mb-4 pt-2">
                {colors.map((color, idx) => (
                <button 
                    key={idx} 
                    className="rounded-circle border position-relative" 
                    style={{ 
                    width: '28px', 
                    height: '28px', 
                    backgroundColor: color, 
                    borderColor: color === '#ffffff' ? '#cbd5e1' : 'transparent',
                    outline: '1px solid #e2e8f0'
                    }}
                />
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-sm btn-light border px-3 fw-semibold text-secondary" style={{ fontSize: '13px' }}>Clear All</button>
                <button className="btn btn-sm text-white px-3 fw-semibold" style={{ backgroundColor: '#0AA586', fontSize: '13px' }}>Apply Filter</button>
            </div>
            </div>

            {/* 3. Brand Filter Card */}
            <div className="card border-0 p-4 rounded-3 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
            <h5 className="fw-bold mb-3 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Filter by Brand</h5>
            <div className="input-group border rounded-2 mb-3 bg-light p-1">
                <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control bg-transparent border-0 shadow-none p-1 fw-medium" placeholder="Search brands..." style={{ fontSize: '14px' }} />
            </div>

            <div className="d-flex flex-column gap-2.5 mb-4 overflow-auto" style={{ maxHeight: '220px', fontSize: '15px' }}>
                {brands.map((brand, idx) => (
                <label key={idx} className="d-flex mb-2 justify-content-between align-items-center cursor-pointer text-secondary fw-medium">
                    <div className="d-flex align-items-center gap-2">
                    <input type="checkbox" className="form-check-input shadow-none border" style={{ width: '16px', height: '16px' }} />
                    <span>{brand.name}</span>
                    </div>
                    <span className="text-muted small fw-bold">({brand.count})</span>
                </label>
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-sm text-success p-0 border-0 fw-bold" style={{ color: '#0AA586', fontSize: '14px' }}>Apply Filter</button>
                <button className="btn btn-sm text-muted p-0 border-0 fw-medium" style={{ fontSize: '14px' }}>Clear All</button>
            </div>
            </div>

        </div>
    </>
  )
}

export default LeftSide
