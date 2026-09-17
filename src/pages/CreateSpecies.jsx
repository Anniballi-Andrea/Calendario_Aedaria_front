import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import HtmlForNubs from "../Components/HtmlForNub";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useEffect } from "react";

export default function CreateSpecies() {

    const { isAdmin } = useAuth()
    const API_URL = `${import.meta.env.VITE_API_URL}/species`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {
                const species = response.data;

                setName(species.name ?? "");
                setDescription(species.description ?? "")
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento della specie:",
                    error
                );

                setError("Impossibile caricare la specie.");
            });

    }, [id]);


    function createSpecies(event) {
        event.preventDefault();

        const species = {
            id: isEditMode ? Number(id) : null,
            name: name,
            description: description
        };

        const request = isEditMode
            ? api.put(`${API_URL}/updateSpecies`, species)
            : api.post(`${API_URL}/create`, species);

        request
            .then(() => {
                navigate("/specie");
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica della specie:"
                        : "Errore nella creazione della specie:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare la specie."
                        : "Impossibile creare la specie."
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
                            onClick={() => navigate("/specie")}
                        >
                            ← Torna alle specie
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica specie"
                                : isAdmin && "Nuova specie"}
                        </h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {
                        isAdmin ?
                            <form onSubmit={createSpecies}>

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
                                        onClick={() => navigate("/specie")}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isEditMode
                                            ? "Salva modifiche"
                                            : "Crea specie"}
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
                        onClick={() => navigate("/incantesimi")}
                    >
                        ← Torna agli incantesimi
                    </button>

                </div>

            </div>

        </div >
    )
}