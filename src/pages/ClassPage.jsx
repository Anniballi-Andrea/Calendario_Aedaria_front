import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ClassPage() {
    const API_URL = "http://localhost:8080/api/class";
    const { slug } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSubClass, setSelectedSubClass] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null)

    const navigate = useNavigate()

    function getClass() {
        setLoading(true);
        setError("");
        axios
            .get(`${API_URL}/get-by-slug/${slug}`)
            .then((response) => {
                const data = response.data;
                setClassData(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero della classe:", error);
                setError("Impossibile recuperare la classe.");
            })
            .finally(() => { setLoading(false); });
    }

    useEffect(() => { getClass(); }, [slug]);

    function deleteSkill(skillId) {

        axios
            .delete(`${API_URL}/skills/delete/${skillId}`)
            .then(() => {

                // Ricarica la classe per aggiornare la lista delle skill
                getClass();

                // Se era selezionata la skill eliminata,
                // svuota il dettaglio
                if (selectedSkill?.id === skillId) {
                    setSelectedSkill(null);
                }

            })
            .catch((error) => {

                console.error(
                    "Errore nell'eliminazione dell'abilità:",
                    error
                );

                setError("Impossibile eliminare l'abilità.");

            });
    }



    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento classe...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!classData) {
        return null;
    }

    return (
        <div className="container-fluid pb-5">
            <div className="d-flex justify-content-center mt-4">
                <div className="data-page">

                    {/* HEADER */}
                    <div className="data-page-header">
                        <h1>
                            {classData.name}
                        </h1>
                    </div>

                    {/* CONTENUTO */}
                    <div className="data-page-content">

                        {/* COLONNA SINISTRA */}
                        <div className="data-page-sidebar">

                            {/* SOTTOCLASSI */}
                            <div className="data-page-section">

                                <div className="data-page-section-header">
                                    <h2>
                                        Sottoclassi
                                    </h2>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            // In seguito porterà alla creazione
                                            // di una nuova sottoclasse
                                        }}
                                    >
                                        + Aggiungi
                                    </button>
                                </div>

                                <select
                                    className="form-select mt-3"
                                    value={selectedSubClass?.id || ""}
                                    onChange={(event) => {
                                        const subClass =
                                            classData.subClasses?.find(
                                                (subClass) =>
                                                    subClass.id ===
                                                    Number(event.target.value)
                                            );

                                        setSelectedSubClass(
                                            subClass || null
                                        );
                                    }}
                                >
                                    <option value="">
                                        Seleziona una sottoclasse
                                    </option>

                                    {classData.subClasses?.map((subClass) => (
                                        <option
                                            key={subClass.id}
                                            value={subClass.id}
                                        >
                                            {subClass.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* ABILITÀ */}
                            <div className="data-page-section">

                                <div className="data-page-section-header">
                                    <h2>
                                        Abilità
                                    </h2>

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(`/classe/${slug}/skill/nuova`)
                                        }
                                    >
                                        + Aggiungi
                                    </button>
                                </div>

                                <div className="data-page-list">

                                    {classData.skills?.length === 0 && (
                                        <div className="data-page-empty">
                                            Nessuna abilità presente.
                                        </div>
                                    )}

                                    {classData.skills?.map((skill) => (
                                        <div
                                            className="card mb-2"
                                            key={skill.id}
                                        >

                                            <div className="card-body">

                                                {/* SELEZIONE SKILL */}

                                                <button
                                                    type="button"
                                                    className={`btn spell-list-button w-100 text-start ${selectedSkill?.id === skill.id ? "active" : ""
                                                        }`}
                                                    onClick={() => setSelectedSkill(skill)}
                                                >

                                                    <h3 className="mb-1">
                                                        {skill.name}
                                                    </h3>

                                                    <small className="text-muted">
                                                        Livello {skill.level}
                                                    </small>

                                                </button>

                                                {/* AZIONI */}

                                                <div className="d-flex justify-content-end gap-2 mt-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(`/classe/${slug}/skill/${skill.id}/modifica`)
                                                        }
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                        {" "}Modifica
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteSkill(skill.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                        {" "}Elimina
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* COLONNA DESTRA */}

                        <div className="data-page-detail">

                            {!selectedSkill ? (

                                <div className="card data-page-detail-card">

                                    <div className="card-body text-center p-4">

                                        <h3>

                                            Nessuna abilità selezionata

                                        </h3>

                                        <p className="mb-0 text-muted">

                                            Seleziona un'abilità dalla lista per visualizzarne i dettagli.

                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="card data-page-detail-card">

                                    {/* HEADER */}

                                    <div className="card-header">

                                        <h2 className="mb-0">

                                            {selectedSkill.name}

                                        </h2>

                                    </div>

                                    {/* DETTAGLI */}

                                    <div className="card-body">

                                        <div className="mb-3">

                                            <span className="badge text-bg-primary">

                                                Livello {selectedSkill.level}

                                            </span>

                                        </div>

                                        <h3>

                                            Descrizione

                                        </h3>

                                        <p className="mb-0">

                                            {selectedSkill.description}

                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}