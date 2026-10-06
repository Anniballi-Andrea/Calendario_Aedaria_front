import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function CreateArmor() {
    const { isAdmin } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}/items`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [armorClass, setArmorClass] = useState("");
    const [requisite, setRequisite] = useState("");
    const [weight, setWeight] = useState("");
    const [stealthDisadvantage, setStealthDisadvantage] = useState(false);
    const [cost, setCost] = useState("");

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
                setArmorClass(item.armorClass ?? "");
                setRequisite(item.requisite ?? "");
                setWeight(item.weight ?? "");
                setStealthDisadvantage(item.stealthDisadvantage ?? false);
                setCost(item.cost ?? "");
            })
            .catch((error) => {
                console.error(
                    "Errore nel caricamento:",
                    error
                );

                setError("Impossibile caricare l'armatura.");
            });

    }, [id]);

    function create(event) {
        event.preventDefault();

        const item = {
            name: name,
            type: type,
            armorClass: armorClass,
            requisite: requisite,
            weight: Number(weight),
            stealthDisadvantage: stealthDisadvantage,
            cost: cost
        };

        const request = isEditMode
            ? api.put(`${API_URL}/armor/${id}`, {
                ...item,
                id: Number(id)
            })
            : api.post(`${API_URL}/armor`, item);

        request
            .then(() => {
                navigate("/dati-di-gioco/oggetti/armature");
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
                        ? "Impossibile modificare l'armatura."
                        : "Impossibile creare l'armatura."
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
                                navigate("/dati-di-gioco/oggetti/armature")
                            }
                        >
                            ← Torna alle armature
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica armatura"
                                : isAdmin
                                    ? "Crea armatura"
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
                                        Tipo di armatura
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
                                        Classe Armatura
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={armorClass}
                                        onChange={(event) =>
                                            setArmorClass(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Requisito
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={requisite}
                                        onChange={(event) =>
                                            setRequisite(event.target.value)
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

                                <div className="col-12 mb-3">

                                    <div className="form-check">

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="stealthDisadvantage"
                                            checked={stealthDisadvantage}
                                            onChange={(event) =>
                                                setStealthDisadvantage(
                                                    event.target.checked
                                                )
                                            }
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="stealthDisadvantage"
                                        >
                                            Svantaggio alle prove di Furtività
                                        </label>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="create-page-actions">

                            <button
                                type="button"
                                className="btn btn-outline-success border-3 fw-bold"
                                onClick={() =>
                                    navigate("/dati-di-gioco/oggetti/armature")
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
                                    : "Crea armatura"}
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