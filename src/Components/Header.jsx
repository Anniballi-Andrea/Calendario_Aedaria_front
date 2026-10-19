import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResource } from "../context/ResourceContext";


export default function Header() {

    const { isAuthenticated, isAdmin, username, logout } = useAuth();
    const { userSessions, activeSession, setActiveSession } = useResource()


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg_header">

                <div className="container-fluid">

                    <span className="font-fantasy fw-bold fs-4 me-3">
                        Aedaria
                    </span>

                    <div className="d-lg-none ms-auto me-4">

                        {isAuthenticated ? (

                            <div className="d-flex align-items-center">

                                <div className="me-3">
                                    <NavLink
                                        className="nav-link text-light fs-4"
                                        to="/profilo"
                                    >
                                        {username}
                                    </NavLink>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className="nav-link text-light fs-4"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>

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

                    {/* CONTENITORE PRINCIPALE */}
                    <div className="d-flex flex-grow-1 justify-content-between align-items-center">

                        {/* ========================= */}
                        {/* 1 - PAGINE */}
                        {/* ========================= */}

                        <div
                            className="collapse navbar-collapse flex-grow-0"
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

                                {isAdmin && (
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link text-light fs-4"
                                            to="/admin"
                                        >
                                            Admin
                                        </NavLink>
                                    </li>
                                )}

                            </ul>

                        </div>

                        {/* ========================= */}

                        <div className="d-flex justify-content-center align-items-center flex-grow-1">

                            <select
                                className="form-select w-auto"
                                value={activeSession?.id || ""}
                                onChange={(event) => {

                                    const selectedSession = userSessions.find(
                                        (session) => session.id === Number(event.target.value)
                                    )

                                    setActiveSession(selectedSession)
                                }}
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

                        <div className="d-none d-lg-block">

                            {isAuthenticated ? (

                                <div className="d-flex align-items-center">

                                    <div className="me-3">
                                        <NavLink
                                            className="nav-link text-light fs-4"
                                            to="/profilo"
                                        >
                                            {username}
                                        </NavLink>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="nav-link text-light fs-4"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </div>

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

                </div>

            </nav>
        </header>
    );
}