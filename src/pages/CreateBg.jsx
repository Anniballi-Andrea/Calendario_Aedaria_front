import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import HtmlForNubs from "../Components/HtmlForNub";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useResource } from "../context/ResourceContext";

export default function CreateBg() {
    const { isAdmin } = useAuth()
    const { handbooks } = useResource()

    const API_URL = `${import.meta.env.VITE_API_URL}/background`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [handbook, setHandbook] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/get/${id}`)
            .then((response) => {
                const bg = response.data;

                setName(bg.name ?? "");
                setHandbook(bg.handbook ?? "");
                setDescription(bg.description ?? "")
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento del background:",
                    error
                );

                setError("Impossibile caricare il background.");
            });

    }, [id]);


    function create(event) {
        event.preventDefault();

        const bg = {
            id: isEditMode ? Number(id) : null,
            name: name,
            handbook: handbook,
            description: description
        };

        const request = isEditMode
            ? api.put(`${API_URL}/update`, bg)
            : api.post(`${API_URL}/create`, bg);

        request
            .then(() => {
                navigate("/background");
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica del background:"
                        : "Errore nella creazione del background:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare il background."
                        : "Impossibile creare il background."
                );
            });
    }



    return (
        <div className="container-fluid pb-5">

            <div className="d-none d-lg-flex justify-content-center mt-4">

                <div className="create-page">

                    <div className="create-page-header">

                        <button
                            type="button"
                            className="btn btn-outline-success border-3 fw-bold"
                            onClick={() => navigate("/background")}
                        >
                            ← Torna ai background
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica background"
                                : isAdmin && "Nuovo background"}
                        </h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {
                        isAdmin ?
                            <form onSubmit={create}>

                                {/* DATI PRINCIPALI */}
                                <div className="spell-form-section">

                                    <h2>Informazioni principali</h2>

                                    <div className="row">

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Nome
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(event) =>
                                                    setName(event.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Manuale
                                            </label>

                                            <select
                                                className="form-select"
                                                value={handbook}
                                                onChange={(event) => setHandbook(event.target.value)}
                                                required
                                            >
                                                <option value="">Seleziona un manuale</option>

                                                {handbooks.map((handbook) => (
                                                    <option key={handbook} value={handbook}>
                                                        {handbook}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <div className="create-form-section">

                                    <h2>Descrizione</h2>
                                    <HtmlForNubs />
                                    <div className="mb-3">

                                        <textarea
                                            rows="7"
                                            className="form-control spell-textarea-effect"
                                            value={description}
                                            onChange={(event) =>
                                                setDescription(event.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="create-page-actions">

                                    <button
                                        type="button"
                                        className="btn btn-outline-success border-3 fw-bold"
                                        onClick={() => navigate("/background")}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isEditMode
                                            ? "Salva modifiche"
                                            : "Crea background"}
                                    </button>

                                </div>

                            </form> :
                            <ContentNotPermitted />

                    }



                </div>

            </div>


            {/* TABLET + SMARTPHONE */}
            <div className="d-flex d-lg-none justify-content-center align-items-center text-center create-page">

                <div className="px-3 py-5">

                    <ContentNotPermitted />

                    <button
                        type="button"
                        className="mt-3 btn btn-outline-success border-3 fw-bold"
                        onClick={() => navigate("/")} >
                        ← Torna alla home
                    </button>

                </div>

            </div>

        </div >

    )
}