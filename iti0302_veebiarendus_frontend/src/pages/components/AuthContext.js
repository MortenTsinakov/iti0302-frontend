import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData) => {
        setUsername(userData.username);
        setId(userData.id);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", userData.jwt);
    };

    const logout = () => {
        setUsername(null);
        setId(null);
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider value={{ username, id, isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}