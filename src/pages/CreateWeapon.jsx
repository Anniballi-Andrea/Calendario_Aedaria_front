import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HtmlForNubs from "../Components/HtmlForNub";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import api from "../api/axiosConfig";

export default function CreateWeapon() {
    const { isAdmin } = useAuth()
    const API_URL = `${import.meta.env.VITE_API_URL}/items`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const [error, setError] = useState("");

    const [name, setName] = useState("");

    const [damage, setDamage] = useState("");
    const [type, setType] = useState("");
    const [property, setProperty] = useState("");
    const [mastery, setMastery] = useState("");
    const [weight, setWeigth] = useState("");
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
                setDamage(item.damage ?? "")
                setType(item.type ?? "")
                setProperty(item.property ?? "")
                setMastery(item.mastery ?? "")
                setWeigth(item.weight ?? "")
                setCost(item.cost ?? "")

            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento:",
                    error
                );

                setError("Impossibile caricare.");
            });

    }, [id]);

    function create(event) {
        event.preventDefault();

        const item = {
            id: isEditMode ? Number(id) : null,
            name: name,
            damage: damage,
            type: type,
            property: property,
            mastery: mastery,
            weight: weight,
            cost: cost
        }

        const request = isEditMode
            ? api.put(`${API_URL}/${id}`, {
                ...item,
                id: Number(id)
            })
            : api.post(`${API_URL}/weapon`, item)

        request
            .then(() => {
                navigate("/dati-di-gioco/oggetti/armi")
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica:"
                        : "Errore nella creazione:",
                    error
                )
                setError(
                    isEditMode
                        ? "Impossibile modificare "
                        : "Impossibile creare"
                );
            })
    }

    return (
        <div className="container-fluid pb-5">

            <div className="d-none d-lg-flex justify-content-center mt-4">

                <div className="create-page">

                    <div className="create-page-header">

                        <button
                            type="button"
                            className="btn btn-outline-success border-3 fw-bold"
                            onClick={() => navigate("/dati-di-gioco/oggetti/armi")}
                        >
                            ← Torna alle Indietro
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica item"
                                : isAdmin && "Crea item"}
                        </h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {

                        <form onSubmit={create}>

                            {/* DATI PRINCIPALI */}
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
                                            Tipo di arma
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
                                            Peso
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={weight}
                                            onChange={(event) =>
                                                setWeigth(event.target.value)
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
                                            Danni
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={damage}
                                            onChange={(event) =>
                                                setDamage(event.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Proprietà
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={property}
                                            onChange={(event) =>
                                                setProperty(event.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="create-form-section">
                                <h2>Maestria</h2>
                                <HtmlForNubs />
                                <textarea
                                    rows="7"
                                    className="form-control spell-textarea-effect"
                                    value={mastery}
                                    onChange={(event) =>
                                        setMastery(event.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="create-page-actions">

                                <button
                                    type="button"
                                    className="btn btn-outline-success border-3 fw-bold"
                                    onClick={() => navigate("/dati-di-gioco/oggetti/armi")}
                                >
                                    Annulla
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {isEditMode
                                        ? "Salva modifiche"
                                        : "Crea "}
                                </button>

                            </div>

                        </form>

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