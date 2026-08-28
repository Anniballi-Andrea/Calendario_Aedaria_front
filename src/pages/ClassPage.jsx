import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ClassPage() {
    const API_URL = "http://localhost:8080/api/class";
    const { slug } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSubClass, setSelectedSubClass] = useState(null);

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
                                        onClick={() => {
                                            // In seguito porterà alla creazione
                                            // di una nuova abilità
                                        }}
                                    >
                                        + Aggiungi
                                    </button>
                                </div>

                                <div className="data-page-list">

                                    {classData.classFeatures?.length === 0 && (
                                        <div className="data-page-empty">
                                            Nessuna abilità presente.
                                        </div>
                                    )}

                                    {classData.classFeatures?.map((feature) => (
                                        <div
                                            className="card mb-2"
                                            key={feature.id}
                                        >
                                            <div className="card-body">
                                                <h3>
                                                    {feature.name}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* COLONNA DESTRA */}
                        <div className="data-page-detail">

                            <div className="card data-page-detail-card">

                                {/* HEADER DETTAGLIO */}
                                <div className="card-header">
                                    <h2>
                                        {classData.name}
                                    </h2>
                                </div>

                                {/* DESCRIZIONE */}
                                <div className="card-body">

                                    <h3>
                                        Descrizione
                                    </h3>

                                    <p>
                                        {/* Al momento Classes non contiene
                                            il campo description.
                                            Inserire qui
                                            classData.description
                                            quando sarà disponibile
                                            dal backend. */}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}