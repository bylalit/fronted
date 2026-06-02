import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [globalLoading, setGlobalLoading] = useState(false);

    const userUrl = "http://127.0.0.1:8000/api/user/me/";
    const wishlistUrl = "http://127.0.0.1:8000/api/wishlist/";
    const refreshUrl = "http://127.0.0.1:8000/api/token/refresh/"; 
    const cartUrl = "http://127.0.0.1:8000/api/cart/";

  
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

    // 👤 GET USER PROFILE WITH AUTO-REFRESH & LOADING
    const getUser = async () => {
        let token = localStorage.getItem("accessToken");

        if (!token) {
            setUserProfile(null);  
            setWishlistItems([]);  
            return;
        }

        setGlobalLoading(true); // 🆕 User aur data initialization loader start
        try {
            let response = await fetch(userUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
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
                // Inko await karwaya taaki loading tabhi band ho jab saara data aa jaye
                await Promise.all([getWishlist(token), getCart(token)]); 
            } else {
                logout(); 
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setGlobalLoading(false); // 🆕 User setup complete loader closed
        }
    };

    // 📦 GET WISHLIST WITH AUTO-REFRESH & LOADING
    const getWishlist = async (passedToken = null) => {
        let token = passedToken || localStorage.getItem("accessToken");
        if (!token) return;

        setGlobalLoading(true); // 🆕 Wishlist fetch loader start
        try {
            let response = await fetch(wishlistUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

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
        } finally {
            setGlobalLoading(false); // 🆕 Wishlist fetched loader closed
        }
    };

    // ❤️ TOGGLE WISHLIST WITH AUTO-REFRESH & LOADING
    const toggleWishlist = async (productId) => {
        let token = localStorage.getItem("accessToken");
        if (!token) {
            toast.error("Please log in to add items to your wishlist!");
            return;
        }

        setGlobalLoading(true); // 🆕 Wishlist item action loader start
        try {
            let response = await fetch(wishlistUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ product: productId })
            });

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
        } catch (error) {
            console.error(error);
        } finally {
            setGlobalLoading(false); // 🆕 Wishlist state updated loader closed
        }
    };

    // 🛒 GET CART RESPONSE DATA WITH STABLE LOADING STATE
    const getCart = async (passedToken = null)=> {
        let token = passedToken || localStorage.getItem("accessToken");
        if(!token){
            setCartData([]);
            return;
        }
        
        setGlobalLoading(true); // Cart request pipe active
        try {
            let response = await fetch(`${cartUrl}me/`, {
                headers:{ 'Authorization': `Bearer ${token}` }
            });

            if(response.status === 401){
                const newToken = await refreshAccessToken();
                if(newToken){
                    response = await fetch(`${cartUrl}me/`, {
                        headers:{ 'Authorization': `Bearer ${newToken}` }
                    });
                }
            }

            if(response.ok){
                const data = await response.json();
                setCartData(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGlobalLoading(false); // Cart load logic complete
        }
    }

    // 🛍️ ADD TO CART OPERATION TARGET WITH DYNAMIC LOADER INTERACTION
    const addToCart = async (productId, qty=1)=> {
        let token = localStorage.getItem("accessToken")
        if(!token){
            toast.error("Please log in to add items to your cart!");
            return
        }

        setGlobalLoading(true); // 🆕 Product item adding processing animation active
        try {
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
                await getCart(token); // Sync updated records back before loader breaks away
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGlobalLoading(false); // 🆕 Item added execution sequence done
        }
    }

    // 🗑️ REMOVE ITEM FROM OVERLAY CART HANDLER WITH SAFE LOADING
    const removeFromCart = async (productId) => {
        let token = localStorage.getItem("accessToken");
        if (!token) return;

        setGlobalLoading(true); // 🆕 Cart row item delete loader active
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
                await getCart(token); // Reload and re-calculate cart array values locally
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGlobalLoading(false); // 🆕 Row tracking clean up closed
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
        <AuthContext.Provider value={{ globalLoading, setGlobalLoading, userProfile, setUserProfile, getUser, wishlistItems, toggleWishlist, getWishlist, getCart, cartData, addToCart, removeFromCart, logout }}>
            {children}
        </AuthContext.Provider>
    );
};