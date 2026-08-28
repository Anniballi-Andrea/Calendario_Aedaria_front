import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function CreateClass() {

    const API_URL = "http://localhost:8080/api/class/create";

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [error, setError] = useState("");

    function createClass(event) {

        event.preventDefault();

        const classes = {
            name: name
        };

        axios
            .post(API_URL, classes)
            .then((response) => {

                console.log("Classe creata:", response.data);

                navigate("/");

            })
            .catch((error) => {

                console.error(
                    "Errore nella creazione della classe:",
                    error
                );

                setError("Impossibile creare la classe.");

            });

    }



    return (
        <div className="container-fluid pb-5">
            {/* DESKTOP */}
            <div className="d-none d-lg-flex justify-content-center mt-4">
                <div className="create-page">
                    {/* HEADER */}
                    <div className="create-page-header">
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm me-2 border-3 fw-bold"
                            onClick={() => navigate("/")} >
                            ← Torna alla Home
                        </button>
                        <h1>Nuova classe</h1>
                    </div>
                    {error && (<div className="alert alert-danger">
                        {error}
                    </div>)}
                    <form onSubmit={createClass}>
                        {/* DATI PRINCIPALI */}
                        <div className="class-form-section">
                            <h2>Informazioni principali</h2>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Es. Monaco"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required />
                                </div>
                            </div>
                        </div>
                        {/* AZIONI */}
                        <div className="create-page-actions">
                            <button
                                type="button"
                                className="btn btn-outline-success border-3 fw-bold"
                                onClick={() => navigate("/classi")} >
                                Annulla </button>
                            <button type="submit" className="btn btn-primary" >
                                Crea classe </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* TABLET + SMARTPHONE */}
            <div className="d-flex d-lg-none justify-content-center align-items-center text-center create-page">
                <div className="px-3 py-5">
                    <h1 className="mb-3">
                        Accesso non disponibile
                    </h1>
                    <p className="lead mb-4">
                        Non puoi accedere alla pagina da telefono.
                    </p>
                    <button
                        type="button"
                        className="btn btn-outline-success border-3 fw-bold"
                        onClick={() => navigate("/classi")} >
                        ← Torna alle classi
                    </button>
                </div>
            </div>
        </div>);

}