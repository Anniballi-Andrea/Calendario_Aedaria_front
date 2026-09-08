import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const isAuthenticated = !!token;
    const isAdmin = role === "ADMIN";

    const login = (loginResponse) => {

        const { token, role } = loginResponse;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setToken(token);
        setRole(role);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setToken(null);
        setRole(null);
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                isAuthenticated,
                isAdmin,
                login,
                logout
            }}
        >{children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}