import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResource } from "../context/ResourceContext";
import { useState } from "react";


export default function Header() {

    const { isAuthenticated, isAdmin, username, logout } = useAuth();
    const { userSessions, activeSession, setActiveSession } = useResource();

    const [menuOpen, setMenuOpen] = useState(false)

    const handleSessionChange = (event) => {

        const selectedSession = userSessions.find(
            (session) => session.id === Number(event.target.value)
        );

        setActiveSession(selectedSession);
    };

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg_header">

                <div className="container-fluid">
                    <span className=" font-fantasy fw-bold fs-4 me-3">
                        Aedaria
                    </span>
                    <div className="d-flex d-lg-none flex-grow-1 justify-content-center mx-2">

                        <select
                            className="form-select session-select"
                            value={activeSession?.id || ""}
                            onChange={handleSessionChange}
                        >
                            <option value="">
                                Seleziona sessione
                            </option>

                            {userSessions.map((session) => (
                                <option
                                    key={session.id}
                                    value={session.id}
                                >
                                    {session.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-controls="navbarNav"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
                        id="navbarNav"
                    >

                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/"
                                    onClick={closeMenu}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/iniziativa"
                                    onClick={closeMenu}
                                >
                                    Iniziativa
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4"
                                    to="/dati-di-gioco"
                                    onClick={closeMenu}
                                >
                                    Manuale
                                </NavLink>
                            </li>

                            {isAuthenticated && (
                                <li className="nav-item d-lg-none">
                                    <NavLink
                                        className="nav-link text-light fs-4"
                                        to="/profilo"
                                        onClick={closeMenu}
                                    >
                                        Profilo
                                    </NavLink>
                                </li>
                            )}

                            {isAdmin && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link text-light fs-4"
                                        to="/admin"
                                        onClick={closeMenu}
                                    >
                                        Admin
                                    </NavLink>
                                </li>
                            )}

                            <li className="nav-item">

                                {isAuthenticated ? (

                                    <button
                                        type="button"
                                        className="nav-link text-light fs-4 d-lg-none"
                                        onClick={() => {
                                            closeMenu()
                                            logout()
                                        }}
                                    >
                                        Logout
                                    </button>

                                ) : (

                                    <NavLink
                                        className="nav-link text-light fs-4 d-lg-none"
                                        to="/login"
                                        onClick={closeMenu}
                                    >
                                        Login
                                    </NavLink>

                                )}

                            </li>

                        </ul>

                    </div>
                    <div className="d-none d-lg-flex align-items-center ms-auto">

                        <select
                            className="form-select me-4 session-select"
                            value={activeSession?.id || ""}
                            onChange={handleSessionChange}
                        >
                            <option value="">
                                Seleziona sessione
                            </option>

                            {userSessions.map((session) => (
                                <option
                                    key={session.id}
                                    value={session.id}
                                >
                                    {session.name}
                                </option>
                            ))}
                        </select>

                        {isAuthenticated ? (

                            <div className="d-flex align-items-center">

                                <NavLink
                                    className="nav-link text-light fs-4 me-3"
                                    to="/profilo"
                                >
                                    {username}
                                </NavLink>

                                <button
                                    type="button"
                                    className="nav-link text-light fs-4"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </div>

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
    );
}