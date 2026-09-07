import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateEditFeature() {

    const API_URL = `${import.meta.env.VITE_API_URL}/class-features`;


    const navigate = useNavigate()
    const { slug, id } = useParams()

    const isEditMode = Boolean(id);

    const featureName = slug === "warlock" ? "Suppliche Occulte" : slug === "stregone" ? "Metamagia" : slug === "guerriero" ? "Tattiche" : null;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [requisite, setRequisite] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        setLoading(true);
        setError("");

        axios
            .get(`${API_URL}/get/${id}`)
            .then((response) => {
                const feature = response.data;

                setName(feature.name || "");
                setDescription(feature.description || "");
                setRequisite(feature.requisite || "");
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero della feature:",
                    error
                );

                setError("Impossibile recuperare la feature.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, isEditMode]);

    function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);
        setError("");

        const feature = {
            name,
            description,
            requisite
        };

        const request = isEditMode
            ? axios.put(`${API_URL}/update/${id}`, feature)
            : axios.post(`${API_URL}/create-by-slug/${slug}`, feature);

        request
            .then(() => {
                navigate(`/classe/${slug}/feature`);
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica della feature:"
                        : "Errore nella creazione della feature:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare la feature."
                        : "Impossibile creare la feature."
                );
            })
            .finally(() => {
                setLoading(false);
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
                            onClick={() => navigate(`/classe/${slug}/feature`)}
                        >
                            ← Torna indietro
                        </button>

                        <h1>
                            {isEditMode
                                ? `Modifica ${featureName}`
                                : `Aggiungi ${featureName}`}
                        </h1>
                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="spell-form-section">
                            <div className="row">
                                <div className="col-md-8 mb-3">

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
                            <label className="form-label">
                                Descrizione
                            </label>

                            <textarea
                                className="form-control"
                                rows="8"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Requisito
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={requisite}
                                onChange={(event) =>
                                    setRequisite(event.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading
                                ? "Salvataggio..."
                                : "Salva"}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}