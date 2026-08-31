import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateSubClass() {
    const API_URL = "http://localhost:8080/api/subClass";
    const CLASS_API_URL = "http://localhost:8080/api/class";

    const navigate = useNavigate();
    const { slug } = useParams();

    const [name, setName] = useState("");
    const [classId, setClassId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
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
    }, [slug]);

    function createSubClass(event) {
        event.preventDefault();

        if (!classId) {
            setError(
                "Impossibile identificare la classe."
            );
            return;
        }

        const subClass = {
            name: name
        };

        axios
            .post(
                `${API_URL}/create/${classId}`,
                subClass
            )
            .then((response) => {
                console.log(
                    "Sottoclasse creata:",
                    response.data
                );

                navigate(`/classe/${slug}`);
            })
            .catch((error) => {
                console.error(
                    "Errore nella creazione della sottoclasse:",
                    error
                );

                setError(
                    "Impossibile creare la sottoclasse."
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

                        <h1>Nuova sottoclasse</h1>

                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={createSubClass}>

                        {/* DATI PRINCIPALI */}
                        <div className="create-form-section">

                            <h2>
                                Informazioni principali
                            </h2>

                            <div className="row">

                                <div className="col-12 mb-3">

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
                                Crea sottoclasse
                            </button>

                        </div>

                    </form>

                </div>

            </div>

            {/* TABLET + SMARTPHONE */}
            <div className="d-flex d-lg-none justify-content-center align-items-center text-center create-page">

                <div className="px-3 py-5">

                    <h1 className="mb-3">
                        Accesso non disponibile
                    </h1>

                    <p className="lead mb-4">
                        Non puoi accedere alla pagina da telefono.
                    </p>

                    <button
                        type="button"
                        className="btn btn-outline-success border-3 fw-bold"
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