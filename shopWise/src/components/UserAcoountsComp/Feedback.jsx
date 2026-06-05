import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const url = "http://127.0.0.1:8000/api/reviews/";
  
  // Real dynamic database parameters store variables
  const [feedbackList, setFeedbackList] = useState([]);
  
  // Context layers controllers
  const { setGlobalLoading, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // 📦 1. FETCH REVIEWS PIPELINE FROM BACKEND
  const getMyFeedback = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    setGlobalLoading(true); 
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // System user validation checks matching logic
        const myFilteredReviews = data.filter(review => review.user === userProfile?.id);
        setFeedbackList(myFilteredReviews);
        
      }
    } catch (error) {
      console.error("Error loading user reviews tracking log:", error);
    } finally {
      setGlobalLoading(false); 
    }
  };

  // 2. REMOVE FEEDBACK REVIEW RECORD HANDLER
  const handleDeleteFeedback = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    setGlobalLoading(true);
    try {
      let response = await fetch(`${url}${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 204 || response.ok) {
        toast.success("Review deleted successfully!");
        setFeedbackList(prevList => prevList.filter(item => item.id !== id));
      } else {
        toast.error("Failed to delete review.");
      }
    } catch (error) {
      console.error("Deletion node context crash query:", error);
      toast.error("Server connection failed.");
    } finally {
      setGlobalLoading(false);
    }
  };
    const productShowData = (id) => {
        navigate("/productDetails/"+id);
    }

  useEffect(() => {
    if (userProfile) {
      getMyFeedback();
    }
  }, [userProfile]);

  return (
    <div>
      {/* Upper Actions Toolbar Title Block */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="fw-bold mb-0 text-dark" style={{ color: '#0F2C59', fontSize: '22px' }}>
          My Feedback ({feedbackList.length})
        </h3>
        <button type="button" className="btn bg-white border px-3 py-2 text-secondary fw-semibold small d-flex align-items-center gap-1.5" style={{ fontSize: '13px', borderRadius: '6px' }}>
          <i className="bi bi-sort-down"></i> Sort: Newest
        </button>
      </div>

      {/* Vertical List Stack Layout Container */}
      <div className="d-flex flex-column gap-4">
        {feedbackList.map((item) => {
          
          // 🎯 ACCURATE MODEL MATCH: ProductImage keys layout processing
          const productObj = item.product_details;
          
          // Aapke model ke hisab se hum 'is_primary' image ka 'image_url' nikalenge
          const primaryImgObj = productObj?.images?.find((img) => img.is_primary);
          const fallbackImgUrl = productObj?.images?.[0]?.image_url;
          
          // Final absolute raw string URL pass kar diya (bina kisi domain suffix ke)
          const finalProductImg = primaryImgObj?.image_url || fallbackImgUrl || "https://placeholder.com/150";

          return (
            <div key={item.id} className="card p-4 border rounded-3 bg-white shadow-sm position-relative">
              <div className="row g-3">
                
                {/* Product Thumbnail Frame Box */}
                <div className="col-12 col-sm-auto text-center">
                  <div 
                    className="border rounded-2 p-2 bg-light d-flex align-items-center justify-content-center mx-auto"   style={{ width: '75px', height: '75px', cursor:"pointer" }}
                    onClick={() => productShowData(item.product)} 
                  >
                    {/* <h4>{finalProductImg}</h4> */}
                    <img 
                      src={finalProductImg} 
                      alt="Product offer thumbnail" 
                      className="img-fluid object-contain w-100 h-100" 
                      style={{ maxHeight: '60px', mixBlendMode: 'multiply' }} 
                    />
                  </div>
                </div>

                {/* Central Review Context Description Area */}
                <div className="col-12 col-sm flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-1 mb-1">
                    <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '15.5px' }}>
                      {productObj?.title || "Reviewed Product Item"}
                    </h6>
                    <span className="text-muted small fw-medium">
                      {new Date(item.create_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Stars Generation Logic Panel */}
                  <div className="text-warning small d-flex gap-0.5 mb-2.5" style={{ fontSize: '13px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`bi bi-star-fill ${i < Math.floor(parseFloat(item.rating_start || 0)) ? 'text-warning' : 'text-black-50 opacity-25'}`}></i>
                    ))}
                    <span className="text-muted ms-1">({parseFloat(item.rating_start).toFixed(1)})</span>
                  </div>

                  {/* Main Body Copy Paragraph */}
                  <p className="text-secondary lh-base mb-3" style={{ fontSize: '14px' }}>
                    {item.review_text}
                  </p>

                  {/* Interactive Tool Actions Lower Layer */}
                  <div className="d-flex gap-3 align-items-center small" style={{ fontSize: '13.5px' }}>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="btn p-0 border-0 text-muted hover-danger d-inline-flex align-items-center gap-1.5 fw-semibold"
                    >
                      <i className="bi bi-trash"></i> Delete Review
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {feedbackList.length === 0 && (
          <div className="card p-5 text-center text-muted bg-white border shadow-sm rounded-3">
            <i className="bi bi-chat-left-dots fs-1 opacity-25 mb-2"></i>
            <p className="mb-0 fw-medium">No feedback submissions found matching your records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;