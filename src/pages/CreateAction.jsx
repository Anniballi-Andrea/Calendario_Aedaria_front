import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import HtmlForNubs from "../Components/HtmlForNub";

export default function CreateAction() {

    const { isAdmin } = useAuth();

    const API_URL = `${import.meta.env.VITE_API_URL}/action`;

    const navigate = useNavigate();

    const { id, monsterId } = useParams();

    const isEditMode = Boolean(id);

    const [description, setDescription] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {

                const action = response.data;

                setDescription(action.description ?? "");
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento dell'azione:",
                    error
                );

                setError(
                    "Impossibile caricare l'azione."
                );
            });

    }, [id]);

    function saveAction(event) {

        event.preventDefault();

        const action = {
            description: description
        };

        const request = isEditMode
            ? api.put(`${API_URL}/${id}`, action)
            : api.post(`${API_URL}/monster/${monsterId}`, action);

        request
            .then(() => {

                navigate(`/admin/lista-mostri`);
            })
            .catch((error) => {

                console.error(
                    isEditMode
                        ? "Errore nella modifica dell'azione:"
                        : "Errore nella creazione dell'azione:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare l'azione."
                        : "Impossibile creare l'azione."
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
                            onClick={() => navigate(-1)}
                        >
                            ← Torna indietro
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica azione"
                                : isAdmin
                                    ? "Nuova azione"
                                    : "Azione"}
                        </h1>

                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {isAdmin ? (

                        <form onSubmit={saveAction}>

                            <div className="create-form-section">

                                <h2>
                                    Descrizione
                                </h2>

                                <HtmlForNubs />

                                <div className="mb-3">

                                    <textarea
                                        rows="10"
                                        className="form-control"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>

                            <div className="create-page-actions">

                                <button
                                    type="button"
                                    className="btn btn-outline-success border-3 fw-bold"
                                    onClick={() => navigate("/admin/lista-mostri")}
                                >
                                    Annulla
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {isEditMode
                                        ? "Salva modifiche"
                                        : "Crea azione"}
                                </button>

                            </div>

                        </form>

                    ) : (

                        <ContentNotPermitted />

                    )}

                </div>

            </div>
            <div className="d-flex d-lg-none justify-content-center align-items-center text-center create-page">

                <div className="px-3 py-5">

                    <ContentNotPermitted />

                    <button
                        type="button"
                        className="mt-3 btn btn-outline-success border-3 fw-bold"
                        onClick={() => navigate("/")}
                    >
                        ← Torna alla home
                    </button>

                </div>

            </div>

        </div>
    );
}