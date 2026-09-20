import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import HtmlForNubs from "../Components/HtmlForNub";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useResource } from "../context/ResourceContext";

export default function CreateTalent() {
    const { isAdmin } = useAuth()
    const { handbooks } = useResource()

    const API_URL = `${import.meta.env.VITE_API_URL}/talent`;
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [effect, setEffect] = useState("");
    const [type, setType] = useState("");
    const [handbook, setHandbook] = useState("");
    const [requisite, setRequisite] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {
                const talent = response.data;

                setName(talent.name ?? "");
                setType(talent.type ?? "");
                setHandbook(talent.handbook ?? "");
                setRequisite(talent.requisite ?? "");
                setEffect(talent.effect ?? "")
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento del talento:",
                    error
                );

                setError("Impossibile caricare il talento.");
            });

    }, [id]);


    function createTalent(event) {
        event.preventDefault();

        const talent = {
            id: isEditMode ? Number(id) : null,
            name: name,
            type: type,
            handbook: handbook,
            requisite: requisite,
            effect: effect
        };

        const request = isEditMode
            ? api.put(`${API_URL}/updateTalent`, talent)
            : api.post(`${API_URL}/create`, talent);

        request
            .then(() => {
                navigate("/talenti");
            })
            .catch((error) => {
                console.error(
                    isEditMode
                        ? "Errore nella modifica del talento:"
                        : "Errore nella creazione del talento:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare il talento."
                        : "Impossibile creare il talento."
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
                            onClick={() => navigate("/talenti")}
                        >
                            ← Torna ai talenti
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica talento"
                                : isAdmin && "Nuovo talento"}
                        </h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {
                        isAdmin ?
                            <form onSubmit={createTalent}>

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
                                                Categoria talento
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
                                    <h2>Requisito</h2>
                                    <div className="mb-3">

                                        <textarea
                                            rows="1"
                                            className="form-control spell-textarea-effect"
                                            value={requisite}
                                            onChange={(event) =>
                                                setRequisite(event.target.value)
                                            }

                                        />

                                    </div>
                                    <h2>Descrizione</h2>
                                    <HtmlForNubs />
                                    <div className="mb-3">

                                        <textarea
                                            rows="7"
                                            className="form-control spell-textarea-effect"
                                            value={effect}
                                            onChange={(event) =>
                                                setEffect(event.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="create-page-actions">

                                    <button
                                        type="button"
                                        className="btn btn-outline-success border-3 fw-bold"
                                        onClick={() => navigate("/talenti")}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isEditMode
                                            ? "Salva modifiche"
                                            : "Crea talento"}
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