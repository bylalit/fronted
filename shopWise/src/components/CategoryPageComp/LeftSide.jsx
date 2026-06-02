import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LeftSide = ({ setCategory, setBrand }) => {
  // const colors = ["#000000", "#ffffff", "#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#F97316", "#EC4899", "#78350F"];

  const url = "http://127.0.0.1:8000/api/";
  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // MULTIPLE BRANDS TRACKING STATE
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearchTerm, setBrandSearchTerm] = useState(""); 

  // 🎯 Context se global loading controller nikala
  const { setGlobalLoading } = useContext(AuthContext);

  const getCategory = async () => {
    let response = await fetch(`${url}category/`);
    return await response.json();
  };

  const getBrand = async () => {
    let response = await fetch(`${url}brand/`);
    return await response.json();
  };

  // 🎯 FIX: Dono API calls ko load hone tak global loader handle kiya
  const initSidebarData = async () => {
    setGlobalLoading(true); // 🔄 Network pipe start hote hi loader open
    try {
      // Promise.all se dono requests ek sath parallel chalengi
      const [categoriesData, brandsData] = await Promise.all([
        getCategory(),
        getBrand()
      ]);
      
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error("Error loading sidebar metadata:", error);
    } finally {
      setGlobalLoading(false); // 🏁 Data set hote hi loader closed safely
    }
  };

  const fileterByCategory = (id) => {
    setCategory(id);    
  };

  // Input checkbox validation toggle logic framework
  const handleBrandCheckboxChange = (brandId) => {
    let updatedBrands = [];
    
    if (selectedBrands.includes(brandId)) {
      updatedBrands = selectedBrands.filter(id => id !== brandId);
    } else {
      updatedBrands = [...selectedBrands, brandId];
    }

    setSelectedBrands(updatedBrands);

    if (updatedBrands.length === 0) {
      setBrand(""); 
    } else {
      setBrand(updatedBrands.join(",")); 
    }
  };

  // Clear all active checked bounds parameters
  const handleClearAllBrands = () => {
    setSelectedBrands([]);
    setBrand("");
  };

  useEffect(() => {
    initSidebarData(); 
  }, []);

  const filteredBrandsList = brands.filter(brand => 
    brand.name?.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  return (
    <>
      {/* ==================== LEFT SIDEBAR FILTER CONTROLS ==================== */}
      <div className="col-12 col-lg-3">

        {/* 1. Category Card */}
        <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
          <h5 className="fw-bold mb-4 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>
            Categories
          </h5>

          <div className="d-flex flex-column gap-3">
            {/* Parent Categories */}
            {categories?.filter((cat) => cat.parent === null).map((parentCategory) => (
              <div key={parentCategory.id}>
                {/* Parent Row Toggle Link */}
                <div
                  className="d-flex justify-content-between align-items-center mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenCategory(openCategory === parentCategory.id ? null : parentCategory.id)}
                >
                  <span className="fw-bold text-dark">{parentCategory.name}</span>
                  <i className={`bi ${openCategory === parentCategory.id ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </div>

                {/* Child Categories */}
                {openCategory === parentCategory.id && (
                  <div className="d-flex flex-column gap-2 ps-3">
                    {categories?.filter((child) => {
                      const parentId = child.parent && typeof child.parent === 'object' ? child.parent.id : child.parent;
                      return parentId === parentCategory.id;
                    }).map((childCategory) => (
                      <span
                        key={childCategory.id}
                        className="text-muted small fw-medium text-hover-success"
                        style={{ cursor: "pointer", transition: "color 0.2s" }}
                        onClick={() => fileterByCategory(childCategory.id)}
                      >
                        {childCategory?.name}
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
        {/* <div className="card border-0 p-4 rounded-3 mb-4 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
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
        </div> */}

        {/* 3. Brand Filter Card */}
        <div className="card border-0 p-4 rounded-3 shadow-sm border" style={{ backgroundColor: '#F8FAFC' }}>
          <h5 className="fw-bold mb-3 border-start border-4 border-success ps-2" style={{ color: '#0F2C59', fontSize: '18px' }}>Filter by Brand</h5>
          
          {/* Internal Input Search field box connection hook */}
          <div className="input-group border rounded-2 mb-3 bg-light p-1">
            <span className="input-group-text bg-transparent border-0 text-muted"><i className="bi bi-search"></i></span>
            <input 
              type="text" 
              className="form-control bg-transparent border-0 shadow-none p-1 fw-medium" 
              placeholder="Search brands..." 
              style={{ fontSize: '14px' }} 
              value={brandSearchTerm}
              onChange={(e) => setBrandSearchTerm(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column gap-2.5 mb-4 overflow-auto" style={{ maxHeight: '220px', fontSize: '15px' }}>
            {filteredBrandsList.length === 0 ? (
              <span className="text-muted small text-center py-2">No brands found</span>
            ) : (
              filteredBrandsList.map((brand) => (
                <label key={brand.id} className="d-flex mb-2 justify-content-between align-items-center cursor-pointer text-secondary fw-medium">
                  <div className="d-flex align-items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="form-check-input shadow-none border" 
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }} 
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => handleBrandCheckboxChange(brand.id)} 
                    />
                    <span className={selectedBrands.includes(brand.id) ? "text-success fw-bold" : ""}>
                      {brand.name}
                    </span>
                  </div>
                  <span className="text-muted small fw-bold">
                    {brand.count !== undefined ? `(${brand.count})` : ''}
                  </span>
                </label>
              ))
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center border-top pt-2">
            <button 
              type="button" 
              className="btn btn-sm text-muted p-0 border-0 fw-medium" 
              style={{ fontSize: '14px' }}
              onClick={handleClearAllBrands}
            >
              Clear All
            </button>
            {selectedBrands.length > 0 && (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small rounded">
                {selectedBrands.length} Selected
              </span>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default LeftSide;