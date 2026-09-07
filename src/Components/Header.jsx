import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCalendar } from "../context/CalendarContext";


export default function Header() {

    const { classLoader } = useCalendar()

    const API_URL = `${import.meta.env.VITE_API_URL}/class`;

    const [classes, setClasses] = useState([])

    useEffect(() => {

        axios
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

                    <span className="fw-bold fs-4">
                        Aedaria
                    </span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

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
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-light fs-4 btn "
                                    to="/classe/crea-classe"
                                >
                                    Classe +
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}