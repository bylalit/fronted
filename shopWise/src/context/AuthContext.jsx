import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);

    const userUrl = "http://127.0.0.1:8000/api/user/me/";
    const wishlistUrl = "http://127.0.0.1:8000/api/wishlist/";

    const getUser = async ()=> {
        const token = localStorage.getItem("accessToken");

        if(!token) {
            setUserProfile(null);  
            setWishlistItems([]);  
            return;
        }

        const response = await fetch(userUrl, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            
            setUserProfile(data);
            getWishlist(token); 
        } else {
            logout();
        }
    };

    const getWishlist = async (passedToken = null) => {
        const token = passedToken || localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const response = await fetch(wishlistUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setWishlistItems(data);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const toggleWishlist = async (productId) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Please log in to add items to your wishlist!");
            return;
        }

        const response = await fetch(wishlistUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product: productId })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === "removed") {
                toast.success("Removed from Wishlist! 🤍");
                setWishlistItems(prev => prev.filter(item => item.product !== productId));
            } else {
                toast.success("Added to Wishlist! ❤️");
                setWishlistItems(prev => [...prev, { product: productId }]);
            }
        } else {
            toast.error("Something went wrong!");
        }
        
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserProfile(null);
        setWishlistItems([]);
    };

    useEffect(() => {
        getUser();
    }, []);

    return(
        <AuthContext.Provider value={{userProfile, setUserProfile, getUser, wishlistItems, toggleWishlist, getWishlist, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

