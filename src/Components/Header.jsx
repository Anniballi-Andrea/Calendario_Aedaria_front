import { NavLink } from "react-router-dom";


export default function Header() {

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg_header ">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <span className="fw-bold fs-4">Aedaria</span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link  text-light fs-4" to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="nav-link  text-light fs-4" to="/ciao">ciao</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}