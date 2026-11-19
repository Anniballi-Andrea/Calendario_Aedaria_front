import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import { useResource } from "../context/ResourceContext";
import HtmlForNubs from "../Components/HtmlForNub";
export default function CreateSubClass() {

    const { handbooks } = useResource();

    const API_URL = `${import.meta.env.VITE_API_URL}/subClass`;
    const CLASS_API_URL = `${import.meta.env.VITE_API_URL}/class`;

    const navigate = useNavigate();
    const { slug, id } = useParams();
    const { isAdmin } = useAuth()

    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [handbook, setHandbook] = useState("");
    // const [description, setDescription] = useState("");
    const [classId, setClassId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }
        api
            .get(`${API_URL}/get-by-id/${id}`)
            .then((response) => {
                const subClass = response.data;

                setName(subClass.name ?? "");
                setHandbook(subClass.handbook ?? "");
                //setDescription(subClass.description ?? "");
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento della sottoclasse:",
                    error
                );

                setError(
                    "Impossibile caricare la sottoclasse."
                );
            });

    }, [id]);

    useEffect(() => {
        if (id) {
            return;
        }
        api
            .get(`${CLASS_API_URL}/get-by-slug/${slug}`)
            .then((response) => {
                const classData = response.data;
                setClassId(classData.id);
            })
            .catch((error) => {
                console.error(
                    "Errore nel caricamento della classe:",
                    error
                );

                setError(
                    "Impossibile caricare la classe."
                );
            });
    }, [slug, id]);

    function createSubClass(event) {
        event.preventDefault();

        if (!classId && !isEditMode) {
            setError(
                "Impossibile identificare la classe."
            );
            return;
        }

        const subClass = {
            name: name,
            handbook: handbook,
            //description: description
        };

        const request = isEditMode
            ? api.put(
                `${API_URL}/update/${id}`,
                subClass
            )
            : api.post(
                `${API_URL}/create/${classId}`,
                subClass
            );
        request
            .then(() => {
                navigate(`/classe/${slug}`)
            })
            .catch((error) => {

                console.error(
                    isEditMode
                        ? "Errore nella modifica della sottoclasse:"
                        : "Errore nella creazione della sottoclasse:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare la sottoclasse."
                        : "Impossibile creare la sottoclasse."
                );
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
                            onClick={() =>
                                navigate(`/classe/${slug}`)
                            }
                        >
                            ← Torna alla classe
                        </button>
                        {
                            isAdmin &&
                            <h1>Nuova sottoclasse</h1>
                        }

                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {
                        isAdmin ?
                            <form onSubmit={createSubClass}>

                                {/* DATI PRINCIPALI */}
                                <div className="create-form-section">

                                    <h2>
                                        Informazioni principali
                                    </h2>

                                    <div className="row">

                                        <div className="col-4 mb-3">

                                            <label className="form-label">
                                                Nome
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Es. Berserker"
                                                value={name}
                                                onChange={(event) =>
                                                    setName(
                                                        event.target.value
                                                    )
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
                                    {/*<div >

                                        <h2>
                                            Descrizione
                                        </h2>
                                        <HtmlForNubs />
                                        <div className="mb-3">
                                            <textarea
                                                rows="7"
                                                className="form-control skill-textarea-description"
                                                value={description}
                                                onChange={(event) =>
                                                    setDescription(
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>

                                    </div>*/}


                                </div>

                                {/* AZIONI */}
                                <div className="create-page-actions">

                                    <button
                                        type="button"
                                        className="btn btn-outline-success border-3 fw-bold"
                                        onClick={() =>
                                            navigate(`/classe/${slug}`)
                                        }
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Crea sottoclasse
                                    </button>

                                </div>

                            </form>
                            :
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

        </div>
    );
}