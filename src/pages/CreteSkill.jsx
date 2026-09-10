import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContentNotPermitted from "../Components/ContentNotPermitted";

export default function CreateSkill() {

    const { isAdmin } = useAuth()

    const API_URL = `${import.meta.env.VITE_API_URL}/class/skills`;
    const CLASS_API_URL = `${import.meta.env.VITE_API_URL}/class`;

    const navigate = useNavigate();

    const { slug, id, subClassId } = useParams();

    const isEditMode = Boolean(id);
    const isSubClassSkill = Boolean(subClassId);

    const [name, setName] = useState("");
    const [level, setLevel] = useState(1);
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        // Carica la classe tramite lo slug
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

        // Se non siamo in modalità modifica,
        // non dobbiamo caricare nessuna Skill
        if (!id) {
            return;
        }

        // Carica la Skill tramite il suo ID
        api
            .get(`${API_URL}/get/${id}`)
            .then((response) => {

                const skill = response.data;

                setName(skill.name ?? "");
                setLevel(skill.level ?? 1);
                setDescription(skill.description ?? "");
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento dell'abilità:",
                    error
                );

                setError(
                    "Impossibile caricare l'abilità."
                );
            });

    }, [slug, id]);

    function saveSkill(event) {

        event.preventDefault();

        if (!classId && !subClassId) {
            setError(
                "Impossibile identificare la classe o la sottoclasse."
            );
            return;
        }

        const skill = {
            name: name,
            level: Number(level),
            description: description
        };

        const request = isEditMode
            ? api.put(
                `${API_URL}/update/${id}`,
                skill
            )
            : isSubClassSkill
                ? api.post(
                    `${API_URL}/create/sub-class/${subClassId}`,
                    skill
                )
                : api.post(
                    `${API_URL}/create/${classId}`,
                    skill
                );
        request
            .then((response) => {

                navigate(`/classe/${slug}`);
            })
            .catch((error) => {

                console.error(
                    isEditMode
                        ? "Errore nella modifica dell'abilità:"
                        : "Errore nella creazione dell'abilità:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare l'abilità."
                        : "Impossibile creare l'abilità."
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
                            className="btn btn-outline-success border-3 fw-bold"
                            onClick={() =>
                                navigate(`/classe/${slug}`)
                            }
                        >
                            ← Torna alla classe
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica abilità"
                                : isSubClassSkill && isAdmin
                                    ? "Nuova abilità della sottoclasse"
                                    : isAdmin && "Nuova abilità"}
                        </h1>

                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {
                        isAdmin ?
                            <form onSubmit={saveSkill}>

                                {/* DATI PRINCIPALI */}
                                <div className="create-form-section">

                                    <h2>
                                        Informazioni principali
                                    </h2>

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
                                                    setName(
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            />

                                        </div>

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Livello
                                            </label>

                                            <select
                                                className="form-select"
                                                value={level}
                                                onChange={(event) =>
                                                    setLevel(
                                                        event.target.value
                                                    )
                                                }
                                            >

                                                {Array.from(
                                                    { length: 20 },
                                                    (_, index) => {

                                                        const skillLevel =
                                                            index + 1;

                                                        return (
                                                            <option
                                                                key={skillLevel}
                                                                value={skillLevel}
                                                            >
                                                                Livello{" "}
                                                                {skillLevel}
                                                            </option>
                                                        );
                                                    }
                                                )}

                                            </select>

                                        </div>

                                    </div>

                                </div>

                                {/* DESCRIZIONE */}
                                <div className="create-form-section">

                                    <h2>
                                        Descrizione
                                    </h2>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Descrizione dell'abilità
                                        </label>

                                        <textarea
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
                                        {isEditMode
                                            ? "Salva modifiche"
                                            : "Crea abilità"}
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
                        onClick={() =>
                            navigate(`/classe/${slug}`)
                        }
                    >
                        ← Torna alla classe
                    </button>

                </div>

            </div>

        </div>
    );
}