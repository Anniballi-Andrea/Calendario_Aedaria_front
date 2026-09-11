import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContentNotPermitted from "../Components/ContentNotPermitted";
import HtmlForNubs from "../Components/HtmlForNub";

export default function CreateSpell() {

    const { isAdmin } = useAuth()

    const API_URL = `${import.meta.env.VITE_API_URL}/spells`;

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [level, setLevel] = useState(0);
    const [castMethod, setCastMethod] = useState("");
    const [castRange, setCastRange] = useState("");
    const [components, setComponents] = useState("");
    const [duration, setDuration] = useState("");
    const [effect, setEffect] = useState("");
    const [upgrade, setUpgrade] = useState("");
    const [materials, setMaterials] = useState("");

    const [classes, setClasses] = useState([]);

    const [selectedClasses, setSelectedClasses] = useState([]);

    const [showClasses, setShowClasses] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {

                const spell = response.data;

                setName(spell.name ?? "");
                setSchool(spell.school ?? "");
                setLevel(spell.level ?? 0);
                setCastMethod(spell.castMethod ?? "");
                setCastRange(spell.castRange ?? "");
                setComponents(spell.components ?? "");
                setDuration(spell.duration ?? "");
                setEffect(spell.effect ?? "");
                setUpgrade(spell.upgrade ?? "");
                setMaterials(spell.materials ?? "");
                setSelectedClasses(
                    spell.classes?.map((spellClass) => spellClass.id) ?? []
                );
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento dell'incantesimo:",
                    error
                );

                setError("Impossibile caricare l'incantesimo.");
            });

    }, [id]);

    useEffect(() => {

        api
            .get(`${import.meta.env.VITE_API_URL}/class/get-all-summary`)
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel caricamento delle classi:",
                    error
                );
                setError("Impossibile caricare le classi.");
            });

    }, []);

    function toggleClass(classId) {

        setSelectedClasses((currentClasses) => {

            if (currentClasses.includes(classId)) {
                return currentClasses.filter(
                    (id) => id !== classId
                );
            }

            return [...currentClasses, classId];
        });
    }



    function saveSpell(event) {

        event.preventDefault();

        const spell = {
            name: name,
            school: school,
            level: Number(level),
            castMethod: castMethod,
            castRange: castRange,
            components: components,
            duration: duration,
            effect: effect,
            upgrade: upgrade,
            materials: materials,
            classes: selectedClasses.map((classId) => ({
                id: classId
            }))
        };

        const request = isEditMode
            ? api.put(API_URL, {
                ...spell,
                id: Number(id)
            })
            : api.post(API_URL, spell);
        request
            .then((response) => {

                navigate("/incantesimi");
            })
            .catch((error) => {

                console.error(
                    isEditMode
                        ? "Errore nella modifica dell'incantesimo:"
                        : "Errore nella creazione dell'incantesimo:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare l'incantesimo."
                        : "Impossibile creare l'incantesimo."
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
                            onClick={() => navigate("/incantesimi")}
                        >
                            ← Torna agli incantesimi
                        </button>

                        <h1>
                            {isEditMode && isAdmin
                                ? "Modifica incantesimo"
                                : isAdmin && "Nuovo incantesimo"}
                        </h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {
                        isAdmin ?
                            <form onSubmit={saveSpell}>

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
                                                Livello
                                            </label>

                                            <select
                                                className="form-select"
                                                value={level}
                                                onChange={(event) =>
                                                    setLevel(event.target.value)
                                                }
                                            >
                                                {Array.from(
                                                    { length: 10 },
                                                    (_, index) => (
                                                        <option
                                                            key={index}
                                                            value={index}
                                                        >
                                                            {index === 0
                                                                ? "0 - Trucchetto"
                                                                : `Livello ${index}`
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                        </div>
                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Classi
                                            </label>

                                            <div className="dropdown">

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary dropdown-toggle w-100"
                                                    onClick={() => setShowClasses(!showClasses)}
                                                >
                                                    {selectedClasses.length === 0
                                                        ? "Seleziona classi"
                                                        : `${selectedClasses.length} classi selezionate`}
                                                </button>

                                                {showClasses && (
                                                    <div
                                                        className="dropdown-menu show w-100 p-2"
                                                        style={{ maxHeight: "250px", overflowY: "auto" }}
                                                    >

                                                        {classes.map((classItem) => (

                                                            <div
                                                                className="form-check"
                                                                key={classItem.id}
                                                            >
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`class-${classItem.id}`}
                                                                    checked={selectedClasses.includes(
                                                                        classItem.id
                                                                    )}
                                                                    onChange={() =>
                                                                        toggleClass(classItem.id)
                                                                    }
                                                                />

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`class-${classItem.id}`}
                                                                >
                                                                    {classItem.name}
                                                                </label>
                                                            </div>

                                                        ))}

                                                    </div>
                                                )}

                                            </div>

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Scuola
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={school}
                                                onChange={(event) =>
                                                    setSchool(event.target.value)
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Tempo di lancio
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Es. 1 azione"
                                                value={castMethod}
                                                onChange={(event) =>
                                                    setCastMethod(event.target.value)
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Gittata
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Es. 18 metri"
                                                value={castRange}
                                                onChange={(event) =>
                                                    setCastRange(event.target.value)
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Durata
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Es. Istantanea"
                                                value={duration}
                                                onChange={(event) =>
                                                    setDuration(event.target.value)
                                                }
                                                required
                                            />

                                        </div>


                                        <div className="col-12 mb-3">

                                            <label className="form-label">
                                                Componenti
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Es. V, S, M"
                                                value={components}
                                                onChange={(event) =>
                                                    setComponents(event.target.value)
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* DESCRIZIONE */}
                                <div className="create-form-section">

                                    <h2>Descrizione</h2>
                                    <HtmlForNubs />
                                    <div className="mb-3">

                                        <label className="form-label">
                                            Effetto
                                        </label>

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
                                    <div className="mb-3">

                                        <label className="form-label">
                                            Materiali
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Materiali necessari per il lancio..."
                                            value={materials}
                                            onChange={(event) =>
                                                setMaterials(event.target.value)
                                            }
                                        />

                                    </div>


                                    <div className="mb-3">

                                        <label className="form-label">
                                            Ai livelli superiori
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Effetti dell'incantesimo quando lanciato utilizzando uno slot di livello superiore..."
                                            value={upgrade}
                                            onChange={(event) =>
                                                setUpgrade(event.target.value)
                                            }
                                        />

                                    </div>

                                </div>



                                {/* AZIONI */}
                                <div className="create-page-actions">

                                    <button
                                        type="button"
                                        className="btn btn-outline-success border-3 fw-bold"
                                        onClick={() => navigate("/incantesimi")}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {isEditMode
                                            ? "Salva modifiche"
                                            : "Crea incantesimo"}
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
                        onClick={() => navigate("/incantesimi")}
                    >
                        ← Torna agli incantesimi
                    </button>

                </div>

            </div>

        </div>


    );
}