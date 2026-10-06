import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function CreateTool() {
    const { isAdmin } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}/items`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [characteristic, setCharacteristic] = useState("");
    const [utilization, setUtilization] = useState("");
    const [craft, setCraft] = useState("");
    const [variant, setVariant] = useState("");
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
                setType(item.type ?? "");
                setCharacteristic(item.characteristic ?? "");
                setUtilization(item.utilization ?? "");
                setCraft(item.craft ?? "");
                setVariant(item.variant ?? "");
                setCost(item.cost ?? "");
                setWeight(item.weight ?? "");
            })
            .catch((error) => {
                console.error(
                    "Errore nel caricamento:",
                    error
                );

                setError("Impossibile caricare lo strumento.");
            });

    }, [id]);

    function create(event) {
        event.preventDefault();

        const item = {
            name: name,
            type: type,
            characteristic: characteristic,
            utilization: utilization,
            craft: craft,
            variant: variant,
            cost: cost,
            weight: Number(weight)
        };

        const request = isEditMode
            ? api.put(`${API_URL}/tool/${id}`, {
                ...item,
                id: Number(id)
            })
            : api.post(`${API_URL}/tool`, item);

        request
            .then(() => {
                navigate("/dati-di-gioco/oggetti/strumenti");
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
                        ? "Impossibile modificare lo strumento."
                        : "Impossibile creare lo strumento."
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
                                navigate("/dati-di-gioco/oggetti/strumenti")
                            }
                        >
                            ← Torna agli strumenti
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica strumento"
                                : isAdmin
                                    ? "Crea strumento"
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
                                        Tipo
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={type}
                                        onChange={(event) =>
                                            setType(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Caratteristica
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={characteristic}
                                        onChange={(event) =>
                                            setCharacteristic(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Utilizzo
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={utilization}
                                        onChange={(event) =>
                                            setUtilization(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Fabbricazione
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={craft}
                                        onChange={(event) =>
                                            setCraft(event.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Variante
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={variant}
                                        onChange={(event) =>
                                            setVariant(event.target.value)
                                        }
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

                            </div>

                        </div>

                        <div className="create-page-actions">

                            <button
                                type="button"
                                className="btn btn-outline-success border-3 fw-bold"
                                onClick={() =>
                                    navigate("/dati-di-gioco/oggetti/strumenti")
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
                                    : "Crea strumento"}
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