import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSpell() {

    const API_URL = "http://localhost:8080/api/spells";

    const navigate = useNavigate();

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

    const [error, setError] = useState("");


    function createSpell(event) {

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
            materials: materials
        };

        axios
            .post(API_URL, spell)
            .then((response) => {

                console.log("Incantesimo creato:", response.data);

                navigate("/incantesimi");

            })
            .catch((error) => {

                console.error(
                    "Errore nella creazione dell'incantesimo:",
                    error
                );

                setError("Impossibile creare l'incantesimo.");

            });

    }


    return (
        <div className="container-fluid">

            {/* DESKTOP */}
            <div className="d-none d-lg-block">

                <div className="create-spell-page">

                    {/* HEADER */}
                    <div className="create-spell-header">

                        <button
                            type="button"
                            className="btn btn-outline-success border-3 fw-bold"
                            onClick={() => navigate("/incantesimi")}
                        >
                            ← Torna agli incantesimi
                        </button>

                        <h1>Nuovo incantesimo</h1>

                    </div>


                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                    <form onSubmit={createSpell}>

                        {/* DATI PRINCIPALI */}
                        <div className="spell-form-section">

                            <h2>Informazioni principali</h2>

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
                        <div className="spell-form-section">

                            <h2>Descrizione</h2>

                            <div className="mb-3">

                                <label className="form-label">
                                    Effetto
                                </label>

                                <textarea
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
                        <div className="create-spell-actions">

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
                                Crea incantesimo
                            </button>

                        </div>

                    </form>

                </div>

            </div>


            {/* TABLET + SMARTPHONE */}
            <div className="d-flex d-lg-none justify-content-center align-items-center text-center create-spell-page">

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
                        onClick={() => navigate("/incantesimi")}
                    >
                        ← Torna agli incantesimi
                    </button>

                </div>

            </div>

        </div>
    );
}