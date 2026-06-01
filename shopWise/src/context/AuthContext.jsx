import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartData, setCartData] = useState();

    const userUrl = "http://127.0.0.1:8000/api/user/me/";
    const wishlistUrl = "http://127.0.0.1:8000/api/wishlist/";
    const refreshUrl = "http://127.0.0.1:8000/api/token/refresh/"; // 🆕 Django JWT refresh endpoint
    const cartUrl = "http://127.0.0.1:8000/api/cart/";

    // 🆕 BACKGROUND TOKEN REFRESH LOGIC
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return null;

        try {
            const response = await fetch(refreshUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.access); // Save new access token
                return data.access;
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
        return null;
    };

    // 👤 GET USER PROFILE WITH AUTO-REFRESH
    const getUser = async () => {
        let token = localStorage.getItem("accessToken");

        if (!token) {
            setUserProfile(null);  
            setWishlistItems([]);  
            return;
        }

        let response = await fetch(userUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // 🎯 FIX: Agar token expire ho gaya (401 Unauthorized), toh background refresh chalao
        if (response.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                // Naye token ke sath request ko fir se attempt karein
                response = await fetch(userUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    }
                });
            }
        }

        if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
            getWishlist(token);
            getCart(); 
        } else {
            logout(); // Agar refresh token bhi expire ho chuka hai toh clear session
        }
    };

    // 📦 GET WISHLIST WITH AUTO-REFRESH
    const getWishlist = async (passedToken = null) => {
        let token = passedToken || localStorage.getItem("accessToken");
        if (!token) return;

        try {
            let response = await fetch(wishlistUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 🎯 FIX: Wishlist fetch ke time par bhi 401 handle kiya
            if (response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    response = await fetch(wishlistUrl, {
                        headers: { 'Authorization': `Bearer ${newToken}` }
                    });
                }
            }

            if (response.ok) {
                const data = await response.json();
                setWishlistItems(data);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    // ❤️ TOGGLE WISHLIST WITH AUTO-REFRESH
    const toggleWishlist = async (productId) => {
        let token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Please log in to add items to your wishlist!");
            return;
        }

        let response = await fetch(wishlistUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product: productId })
        });

        // 🎯 FIX: Toggle wishlist par bhi 401 protection
        if (response.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                response = await fetch(wishlistUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify({ product: productId })
                });
            }
        }

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

    const getCart = async ()=> {
        let token = localStorage.getItem("accessToken");
        if(!token){
            setCartData(null);
            return;
        }
        
        let response = await fetch(`${cartUrl}me/`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.status === 401){
            const newToken = await refreshAccessToken();
            if(newToken){
                response = await fetch(`${cartUrl}me/`, {
                    headers:{
                        'Authorization': `Bearer ${newToken}`
                    }
                });
            }
        }

        if(response.ok){
            const data = await response.json();
            setCartData(data);
            // console.log(data);
        }

    }

    const addToCart = async (productId, qty=1)=> {
        let token = localStorage.getItem("accessToken")
        if(!token){
            toast.error("Please log in to add items to your cart!");
            return
        }

        let response = await fetch(`${cartUrl}add_item/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product: productId, quantity: qty })
        });

        if (response.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                response = await fetch(`${cartUrl}add_item/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify({ product: productId, quantity: qty })
                });
            }
        }

        if (response.ok) {
            toast.success("Added to Cart successfully! 🛒");
            getCart();
        }
    }


    const removeFromCart = async (productId) => {
        let token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            let response = await fetch(`${cartUrl}remove_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ product: productId })
            });

            if (response.ok) {
                toast.success("Item removed from cart!");
                getCart();
            }
        } catch (error) {
            console.error(error);
        }
    };


    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserProfile(null);
        setWishlistItems([]);
        setCartData([]);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile, getUser, wishlistItems, toggleWishlist, getWishlist, getCart, cartData, addToCart, removeFromCart, logout }}>
            {children}
        </AuthContext.Provider>
    );
};