import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const url = "http://127.0.0.1:8000/api/user/me/";

    const getUser = async ()=> {
        const token = localStorage.getItem("accessToken");

        if(!token) return;

        const response = await fetch(url, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.ok){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return;
        }

        const data = await response.json();

        setUserProfile(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return(
        <AuthContext.Provider value={{userProfile, setUserProfile, getUser}}>
            {children}
        </AuthContext.Provider>
    );

};

