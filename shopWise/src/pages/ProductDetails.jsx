import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const url = "http://127.0.0.1:8000/api/product/" + id + "/";

  let [product, setProduct] = useState();
  // Main image ko control karne ke liye state
  const [activeImage, setActiveImage] = useState("");

  const getProductDetails = async () => {
    let response = await fetch(url);
    response = await response.json();

    console.log(response);
    setProduct(response);

    // FIX 1: Jab data load ho jaye, toh primary image ko default active image set karein
    const primaryImg = response?.images?.find(
      (img) => img.is_primary,
    )?.image_url;
    if (primaryImg) {
      setActiveImage(primaryImg);
    } else if (response?.images?.length > 0) {
      // Agar koi primary mark nahi hai, toh peehli image set kar dein
      setActiveImage(response.images[0].image_url);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Obsidian");

  // Review Mock Data
  const testimonials = [
    {
      id: 1,
      rating: 5,
      isHalfStar: false,
      text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum ante ipsum.",
      name: "Sophia Hartwell",
      role: "Brand Strategist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      rating: 5,
      isHalfStar: false,
      text: "Curabitur pretium tincidunt lacus nulla gravida orci a odio dignissim congue rutrum at lorem et iaculis amet consequat vestibulum nulla facilisi morbi tempus.",
      name: "Marcus Ellison",
      role: "VP of Engineering",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80",
      highlightBorder: true,
    },
  ];

  return (
    <>
      <section
        className="w-100 pb-5"
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/*  1. BREADCRUMB HEADER SECTION  */}
        <div
          className="py-4 border-bottom"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          <div className="container d-flex justify-content-between align-items-center px-md-5">
            <h2
              className="fw-bold mb-0"
              style={{ color: "#0F2C59", fontSize: "28px" }}
            >
              Product Details
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ fontSize: "15px" }}>
                <li className="breadcrumb-item">
                  <a
                    href="#home"
                    className="text-success text-decoration-none fw-medium"
                    style={{ color: "#0AA586" }}
                  >
                    Home
                  </a>
                </li>
                <li
                  className="breadcrumb-item active text-muted fw-medium"
                  aria-current="page"
                >
                  Product Details
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/*  2. CORE BUYING CONTROLS FRAMEWORK */}
        <div className="container px-md-5 mt-5">
          <div className="row g-5">
            {/* LEFT ROW: Gallery Multi-Image Workspace Panel */}
            <div className="col-12 col-lg-6">
              <div
                className="card border rounded-3 overflow-hidden bg-light position-relative p-4 text-center d-flex align-items-center justify-content-center"
                style={{ minHeight: "480px" }}
              >
                <span
                  className="position-absolute top-0 start-0 m-3 badge rounded-2 px-3 py-2 fw-bold text-white bg-danger"
                  style={{ fontSize: "12px" }}
                >
                  -21%
                </span>

                {/* FIX 2: src mein dynamic condition lagayi takki data load hone tak skeleton/blank na dikhe */}
                <img
                  src={
                    activeImage ||
                    product?.images?.find((img) => img.is_primary)?.image_url
                  }
                  alt="Primary presentation gear"
                  className="img-fluid object-contain"
                  style={{ maxHeight: "420px", mixBlendMode: "multiply" }}
                />
              </div>

              {/* Dynamic Action Trigger Switcher Thumbnails */}
              <div className="d-flex gap-2 mt-3 justify-content-start overflow-auto pb-2">
                {product?.images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(img.image_url)}
                    className="card p-1 bg-light rounded-2 border-2"
                    style={{
                      width: "85px",
                      height: "85px",
                      borderColor:
                        activeImage === img.image_url ? "#0AA586" : "#E2E8F0",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={img.image_url}
                      alt="Thumbnail"
                      className="w-100 h-100"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ROW: Pricing, Options & Specs Column */}
            <div className="col-12 col-lg-6">
              <div>
                <span
                  className="badge rounded-pill px-3 py-2 fw-bold mb-3"
                  style={{
                    backgroundColor: "#E2F2EE",
                    color: "#0AA586",
                    fontSize: "12px",
                  }}
                >
                  Sound Equipment
                </span>
                <span
                  className="text-success small fw-bold float-end d-flex align-items-center gap-1.5"
                  style={{ fontSize: "14px" }}
                >
                  <span
                    className="rounded-circle bg-success d-inline-block"
                    style={{ width: "8px", height: "8px" }}
                  ></span>{" "}
                  In Stock
                </span>

                <h1
                  className="fw-bold mb-3 text-dark lh-base"
                  style={{ fontSize: "28px", color: "#0F2C59" }}
                >
                  {product?.title}
                </h1>

                {/* Rating Layer */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <div className="text-warning small d-flex gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <span className="text-dark fw-bold small">4.6</span>
                  <span className="text-muted small border-start ps-2">
                    143 ratings
                  </span>
                  <span className="text-danger small fw-bold border-start ps-2">
                    {product?.stock_quantity} remaining
                  </span>
                </div>

                {/* Pricing Block Card Container */}
                <div
                  className="card border-0 rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between flex-row flex-wrap gap-3"
                  style={{ backgroundColor: "#F8FAFC" }}
                >
                  <div className="d-flex align-items-baseline gap-2">
                    <span
                      className="fw-extrabold text-dark h2 mb-0"
                      style={{ color: "#0F2C59" }}
                    >
                      ${product?.price}
                    </span>
                    <span className="text-muted text-decoration-line-through text-md">
                      ${product?.old_price}
                    </span>
                  </div>
                  <span
                    className="badge border px-2.5 py-1.5 text-success fw-bold font-normal"
                    style={{
                      backgroundColor: "#E2F2EE",
                      borderColor: "#C6E7E1",
                      fontSize: "12px",
                    }}
                  >
                    Save $50.00
                  </span>
                </div>

                <p
                  className="text-secondary small lh-base mb-4"
                  style={{ fontSize: "14.5px" }}
                >
                  {product?.description}
                </p>

                {/* Color Choice Picker Swatch */}
                <div className="mb-4">
                  <div className="text-dark fw-bold small mb-2">
                    Color —{" "}
                    <span className="text-muted fw-semibold">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    {[
                      { name: "Obsidian", color: "#0f172a" },
                      { name: "Alabaster", color: "#f1f5f9" },
                      { name: "Classic Blue", color: "#1d4ed8" },
                      { name: "Forest Green", color: "#14532d" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(item.name)}
                        className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                        style={{
                          width: "26px",
                          height: "26px",
                          backgroundColor: item.color,
                          outline:
                            selectedColor === item.name
                              ? "2px solid #0AA586"
                              : "none",
                          outlineOffset: "2px",
                        }}
                      >
                        {selectedColor === item.name && (
                          <i
                            className={`bi bi-check text-${item.name === "Alabaster" ? "dark" : "white"} small`}
                          ></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Counter Input Box / Button Actions Row */}
                <div className="row g-2 mb-4 align-items-center">
                  <div className="col-4 col-sm-3">
                    <div
                      className="input-group border rounded-2 bg-white"
                      style={{ height: "44px" }}
                    >
                      <button
                        className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0"
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="form-control text-center bg-transparent border-0 d-flex align-items-center justify-content-center fw-bold p-0">
                        {quantity}
                      </span>
                      <button
                        className="btn btn-link text-dark text-decoration-none shadow-none px-2 py-0 border-0"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-8 col-sm-7">
                    <button
                      className="btn w-100 text-white fw-bold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      style={{
                        backgroundColor: "#0AA586",
                        height: "44px",
                        borderRadius: "6px",
                      }}
                    >
                      <i className="bi bi-bag-plus"></i> Add to Cart
                    </button>
                  </div>
                  <div className="col-12 col-sm-2 text-center text-sm-start">
                    <button
                      className="btn border bg-white rounded-2 d-inline-flex align-items-center justify-content-center text-secondary shadow-sm"
                      style={{ width: "44px", height: "44px" }}
                      title="Wishlist"
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>

                {/* Secondary Express Action Route Button */}
                <button
                  className="btn btn-light bg-transparent border w-100 text-secondary py-2.5 fw-bold mb-4 d-flex align-items-center justify-content-center gap-1.5"
                  style={{ borderRadius: "6px", fontSize: "14px" }}
                >
                  <i className="bi bi-lightning-charge"></i> Purchase Instantly
                </button>

                {/* Micro Guarantee Value Grid Props */}
                <div
                  className="row g-2 border-top pt-4 text-muted"
                  style={{ fontSize: "13px" }}
                >
                  <div className="col-6 d-flex align-items-center gap-2">
                    <i className="bi bi-truck text-success fs-5"></i> Free
                    shipping $75+
                  </div>
                  <div className="col-6 d-flex align-items-center gap-2">
                    <i className="bi bi-arrow-counterclockwise text-success fs-5"></i>{" "}
                    45-day returns
                  </div>{" "}
                  <div className="col-6 d-flex align-items-center gap-2">
                    <i className="bi bi-shield-check text-success fs-5"></i>{" "}
                    3-year warranty
                  </div>{" "}
                  <div className="col-6 d-flex align-items-center gap-2">
                    <i className="bi bi-headset text-success fs-5"></i> 24/7
                    support
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  3. DESCRIPTIONS & TECHNICAL SPECIFICATIONS TAB PANELS  */}
        <div className="container px-md-5 mt-5 pt-4">
          <div className="card border rounded-3 bg-white shadow-sm overflow-hidden">
            <div
              className="d-flex bg-light border-bottom text-muted fw-bold"
              style={{ fontSize: "15px" }}
            >
              <span
                onClick={() => setActiveTab("description")}
                className={`px-4 py-3 cursor-pointer ${activeTab === "description" ? "bg-white text-success border-bottom border-3 border-success" : ""}`}
                style={{
                  cursor: "pointer",
                  color: activeTab === "description" ? "#0AA586" : "inherit",
                }}
              >
                Description
              </span>
              <span
                onClick={() => setActiveTab("specifications")}
                className={`px-4 py-3 cursor-pointer ${activeTab === "specifications" ? "bg-white text-success border-bottom border-3 border-success" : ""}`}
                style={{
                  cursor: "pointer",
                  color: activeTab === "specifications" ? "#0AA586" : "inherit",
                }}
              >
                Specifications
              </span>
            </div>

            <div className="p-4 p-md-5">
              {activeTab === "description" && (
                <div className="row g-4 justify-content-between">
                  <div className="col-12 col-lg-7">
                    <h4 className="fw-bold mb-3" style={{ color: "#0F2C59" }}>
                      About This Product
                    </h4>
                    <p className="text-secondary small lh-base mb-4">
                      {product?.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  {
                    product.specifications.length ? <h4 className="fw-bold mb-4" style={{ color: "#0F2C59" }}>
                    Technical Specifications Infomation
                  </h4>: <h5>No Information</h5>}
                  <table className="table table-striped table-bordered small">
                    <tbody>
                        
                        {
                            product?.specifications?.map((item, index) => (
                                <tr key={index}>
                                    <td className="fw-bold w-25">{item.key_name}</td>
                                    <td>{item.value_text}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Rewiew */}
        <div className="py-5 mt-5">
          <div className="container px-md-5 py-2">
            <div className="row mb-4">
              <div className="col-12">
                <h3 className="fw-bold" style={{ color: "#0F2C59" }}>
                  Product Reviews
                </h3>
              </div>
            </div>

            <div className="row g-4 row-cols-1 row-cols-md-2">
              {testimonials.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card h-100 p-4 border shadow-sm bg-white rounded-3">
                    <div className="text-warning mb-3 d-flex gap-1">
                      {Array.from({
                        length: Math.floor(item.rating),
                      }).map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>

                    <p className="text-secondary lh-base mb-4">{item.text}</p>

                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-circle"
                        style={{
                          width: "42px",
                          height: "42px",
                          objectFit: "cover",
                        }}
                      />

                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{item.name}</h6>

                        <small className="text-muted">{item.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
