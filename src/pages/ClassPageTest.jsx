import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ClassPageTest() {

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
                    <div className="data-page-header">
                        <h1>
                            {classData.name}
                        </h1>
                    </div>

                    <div className=" row justify-content-between ">

                        <div className="col-12 col-lg-5 data-page-sidebar mt-4 border-right ">

                            <div className="data-page-section">
                                <div className="d-flex justify-content-between ">
                                    <div>
                                        <h2>
                                            Sottoclassi
                                        </h2>
                                    </div>

                                    <div className="d-none d-lg-block">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                                <div className="col-12 col-lg-7 col-xl-5">
                                    <select
                                        className="form-select mt-3  "
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
                                            Scegli una sottoclasse
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


                            </div>

                            <div className="data-page-section">
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="div">
                                        <h2>
                                            Abilità
                                        </h2>
                                    </div>
                                    <div className="d-none d-lg-block">
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

                                </div>

                                <div className="row align-items-center justify-content-between">
                                    {classData.skills?.length === 0 && (
                                        <div className="col-12 data-page-empty ">
                                            Nessuna abilità presente.
                                        </div>
                                    )}
                                    {classData.skills?.map((skill) => (
                                        <>
                                            <div className="col-12 col-lg-7" key={skill.id}>
                                                <div className="card mt-2">
                                                    <button
                                                        type="button"
                                                        className={`btn spell-list-button w-100 text-center ${selectedSkill?.id === skill.id ? "active" : ""
                                                            }`}
                                                        onClick={() => setSelectedSkill(skill)}
                                                    >{`${skill.name}`}</button>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-5">
                                                <div className="d-none d-lg-flex justify-content-end ">
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                            onClick={() =>
                                                                navigate(`/classe/${slug}/skill/${skill.id}/modifica`)
                                                            }
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                    </div>
                                                    <div className="ms-lg-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => deleteSkill(skill.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-7">
                            <div className="row justify-content-center">

                                {!selectedSkill ? (

                                    <div className="col-10 col-xl-6 text-center card mt-5">
                                        <div className="card-body">
                                            <h3>

                                                Nessuna abilità selezionata

                                            </h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-12 col-lg-8 card mt-3">
                                        <div className="card-header text-center">
                                            <h5>
                                                {selectedSkill.name}
                                            </h5>
                                            <div className="">

                                                <span className="badge text-bg-primary">

                                                    Livello {selectedSkill.level}

                                                </span>

                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5>Descrizione:</h5>
                                            <div>
                                                {selectedSkill.description}
                                            </div>
                                        </div>

                                    </div>
                                )}


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}