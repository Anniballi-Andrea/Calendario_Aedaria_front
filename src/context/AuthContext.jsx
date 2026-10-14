import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const [username, setUsername] = useState(
        localStorage.getItem("username")
    )

    const isAuthenticated = !!token;
    const isAdmin = role === "ADMIN";

    const navigate = useNavigate()

    const login = (loginResponse) => {

        const { token, role, username } = loginResponse;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        setToken(token);
        setRole(role);
        setUsername(username)
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username")

        setToken(null);
        setRole(null);
        setUsername(null);
        navigate("/")
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                username,
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