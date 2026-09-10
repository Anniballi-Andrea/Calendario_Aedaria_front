import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCalendar } from "../context/CalendarContext";
import { useAuth } from "../context/AuthContext";


export default function Header() {

    const { isAuthenticated, isAdmin, logout } = useAuth();
    const { classLoader } = useCalendar()

    const API_URL = `${import.meta.env.VITE_API_URL}/class`;

    const [classes, setClasses] = useState([])

    useEffect(() => {

        api
            .get(`${API_URL}/get-all-summary`)
            .then(response => {
                setClasses(response.data)
            })
            .catch(error => {
                console.error("Errore nel recupero delle classi:", error)
            })

    }, [classLoader])

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
                                    to="/incantesimi"
                                >
                                    Magia
                                </NavLink>
                            </li>
                            {
                                isAdmin &&
                                <li className="d-none d-lg-block nav-item">
                                    <NavLink
                                        className="nav-link text-light fs-4"
                                        to="/classe/crea-classe"
                                    >
                                        Classe +
                                    </NavLink>
                                </li>
                            }


                            <li className="nav-item dropdown">

                                <button
                                    className="nav-link dropdown-toggle text-light fs-4"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Classi
                                </button>

                                <ul className="dropdown-menu class-dropdown">

                                    {classes.map((dndClass) => (

                                        <li key={dndClass.id}>
                                            <NavLink
                                                className="dropdown-item"
                                                to={`/classe/${dndClass.slug}`}
                                            >
                                                {dndClass.name}
                                            </NavLink>
                                        </li>

                                    ))}

                                </ul>

                            </li>

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