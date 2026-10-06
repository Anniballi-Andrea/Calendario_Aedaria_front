import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function CreateItem() {
    const { isAdmin } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}/items`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {
                const item = response.data;

                setName(item.name ?? "");
                setDescription(item.description ?? "");
                setCost(item.cost ?? "");
                setWeight(item.weight ?? "");
            })
            .catch((error) => {
                console.error(
                    "Errore nel caricamento:",
                    error
                );

                setError("Impossibile caricare l'oggetto.");
            });

    }, [id]);

    function create(event) {
        event.preventDefault();

        const item = {
            name: name,
            description: description,
            cost: cost,
            weight: Number(weight)
        };

        const request = isEditMode
            ? api.put(`${API_URL}/normal-item/${id}`, {
                ...item,
                id: Number(id)
            })
            : api.post(`${API_URL}/normal-item`, item);

        request
            .then(() => {
                navigate("/dati-di-gioco/oggetti/oggetti-vari");
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica:"
                        : "Errore nella creazione:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare l'oggetto."
                        : "Impossibile creare l'oggetto."
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
                            onClick={() =>
                                navigate("/dati-di-gioco/oggetti/oggetti-vari")
                            }
                        >
                            ← Torna agli oggetti
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica oggetto"
                                : isAdmin
                                    ? "Crea oggetto"
                                    : ""}
                        </h1>

                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={create}>

                        <div className="spell-form-section">

                            <h2>Informazioni principali</h2>

                            <div className="row">

                                <div className="col-md-6 mb-3">

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

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Costo
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cost}
                                        onChange={(event) =>
                                            setCost(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Peso
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        className="form-control"
                                        value={weight}
                                        onChange={(event) =>
                                            setWeight(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <label className="form-label">
                                        Descrizione
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="create-page-actions">

                            <button
                                type="button"
                                className="btn btn-outline-success border-3 fw-bold"
                                onClick={() =>
                                    navigate("/dati-di-gioco/oggetti-vari")
                                }
                            >
                                Annulla
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {isEditMode
                                    ? "Salva modifiche"
                                    : "Crea oggetto"}
                            </button>

                        </div>

                    </form>

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