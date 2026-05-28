import { useState } from "react";
import LeftSide from "../components/CategoryPageComp/LeftSide";
import RightSide from "../components/CategoryPageComp/RightSide";


const Category = ({search}) => {
  const [category, setCategory] = useState("");

  return (
    <>

      <section className="w-100 pb-5" style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        
        {/* BREADCRUMB HEADER SECTION */}
        <div className="py-4 border-bottom" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2 className="fw-bold mb-0" style={{ color: '#0F2C59', fontSize: '28px' }}>Category</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: '15px' }}>
                <li className="breadcrumb-item">
                  <a href="#home" className="text-success text-decoration-none fw-medium" style={{ color: '#0AA586' }}>Home</a>
                </li>
                <li className="breadcrumb-item active text-muted fw-medium" aria-current="page">Category</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* MAIN CONTENT SECTION*/}
        <div className="container px-md-5 mt-5" >
          <div className="row g-4">
            
            <LeftSide setCategory={setCategory} />

            <RightSide search={search} category= {category} setCategory={setCategory} />

          </div>
        </div>

      </section>
    </>
  );
};

export default Category;