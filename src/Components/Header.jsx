import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Header() {

    const { isAuthenticated, isAdmin, logout } = useAuth();


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg_header">
                <div className="container-fluid">

                    <span className="font-fantasy fw-bold fs-4 me-3">
                        Aedaria
                    </span>

                    <button
                        className="navbar-toggler ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-lg-none ms-auto me-4">
                        {isAuthenticated ? (

                            <button
                                type="button"
                                className="nav-link text-light fs-4"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        ) : (

                            <NavLink
                                className="nav-link text-light fs-4"
                                to="/login"
                            >
                                Login
                            </NavLink>

                        )}
                    </div>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNav"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/iniziativa"
                                >
                                    Iniziativa
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/dati-di-gioco"
                                >
                                    Manuale
                                </NavLink>
                            </li>

                            {
                                isAdmin &&
                                <li className="d-none d-lg-block nav-item">
                                    <NavLink
                                        className="nav-link text-light fs-4"
                                        to="/admin"
                                    >
                                        Admin
                                    </NavLink>
                                </li>
                            }

                        </ul>

                    </div>
                    <div className="d-none d-lg-block ms-auto me-4">
                        {isAuthenticated ? (

                            <button
                                type="button"
                                className="nav-link text-light fs-4"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        ) : (

                            <NavLink
                                className="nav-link text-light fs-4"
                                to="/login"
                            >
                                Login
                            </NavLink>

                        )}
                    </div>

                </div>
            </nav>
        </header>
    )
}