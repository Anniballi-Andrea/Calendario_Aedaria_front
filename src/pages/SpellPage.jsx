
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpellPage() {

    const API_URL = "http://localhost:8080/api/spells";

    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);

    const [search, setSearch] = useState("");
    const [level, setLevel] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDetail, setShowDetail] = useState(false);


    // Recupera gli incantesimi dal backend
    function getSpells() {

        setLoading(true);
        setError("");

        if (search.trim() !== "") {

            const params = {
                name: search.trim()
            };

            if (level !== null) {
                params.level = level;
            }

            axios
                .get(`${API_URL}/search`, {
                    params: params
                })
                .then((response) => {

                    const data = response.data;

                    setSpells(data);

                })
                .catch((error) => {

                    console.error("Errore nel recupero degli incantesimi:", error);
                    setError("Impossibile recuperare gli incantesimi.");

                })
                .finally(() => {

                    setLoading(false);

                });

            return;
        }


        if (level !== null) {

            axios
                .get(`${API_URL}/level/${level}`)
                .then((response) => {

                    const data = response.data;

                    setSpells(data);

                })
                .catch((error) => {

                    console.error("Errore nel recupero degli incantesimi:", error);
                    setError("Impossibile recuperare gli incantesimi.");

                })
                .finally(() => {

                    setLoading(false);

                });

            return;
        }


        axios
            .get(API_URL)
            .then((response) => {

                const data = response.data;

                setSpells(data);

            })
            .catch((error) => {

                console.error("Errore nel recupero degli incantesimi:", error);
                setError("Impossibile recuperare gli incantesimi.");

            })
            .finally(() => {

                setLoading(false);

            });

    }


    // Recupera gli incantesimi all'avvio e quando cambiano ricerca/livello
    useEffect(() => {

        getSpells();

    }, [search, level]);


    // Recupera il dettaglio di un incantesimo
    function selectSpell(id) {

        axios
            .get(`${API_URL}/${id}`)
            .then((response) => {

                const data = response.data;

                setSelectedSpell(data);
                setShowDetail(true);

            })
            .catch((error) => {

                console.error(
                    "Errore nel recupero dell'incantesimo:",
                    error
                );

                setError("Impossibile recuperare l'incantesimo.");

            });

    }


    // Elimina l'incantesimo selezionato
    function deleteSpell() {

        if (!selectedSpell) {
            return;
        }

        const confirmed = window.confirm(
            `Vuoi davvero eliminare "${selectedSpell.name}"?`
        );

        if (!confirmed) {
            return;
        }

        axios
            .delete(`${API_URL}/${selectedSpell.id}`)
            .then(() => {

                setSelectedSpell(null);
                setShowDetail(false);

                getSpells();

            })
            .catch((error) => {

                console.error(
                    "Errore durante la cancellazione:",
                    error
                );

                setError("Impossibile eliminare l'incantesimo.");

            });

    }


    // Raggruppa gli incantesimi per livello
    function getSpellsByLevel() {

        return spells.reduce((groups, spell) => {

            if (!groups[spell.level]) {
                groups[spell.level] = [];
            }

            groups[spell.level].push(spell);

            return groups;

        }, {});

    }


    const spellsByLevel = getSpellsByLevel();

    const navigate = useNavigate();

    return (
        <div className="container-fluid">

            <div className="spells-page">

                {/* HEADER */}
                <div className="spells-header">

                    <div className="d-flex justify-content-between align-items-center">

                        <h1>Incantesimi</h1>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/aggiungi-incantesimo")}
                        >
                            + Crea incantesimo
                        </button>

                    </div>


                    {/* RICERCA */}
                    <div className="mt-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cerca incantesimo..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>


                    {/* FILTRO LIVELLO */}
                    <div className="spells-level-filter mt-3">

                        <button
                            type="button"
                            className={`btn ${level === null
                                ? "btn-primary"
                                : "btn-outline-primary"
                                }`}
                            onClick={() => setLevel(null)}
                        >
                            Tutti
                        </button>

                        {Array.from(
                            { length: 10 },
                            (_, index) => (

                                <button
                                    type="button"
                                    key={index}
                                    className={`btn ${level === index
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => setLevel(index)}
                                >
                                    {index}
                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* CONTENUTO */}
                <div className="spells-content">


                    {/* LISTA */}
                    <div
                        className={`spells-list ${showDetail
                            ? "d-none d-lg-block"
                            : ""
                            }`}
                    >

                        {loading && (

                            <div className="text-center p-4">

                                Caricamento incantesimi...

                            </div>

                        )}


                        {error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )}


                        {!loading &&
                            !error &&
                            spells.length === 0 && (

                                <div className="text-center p-4">

                                    Nessun incantesimo trovato.

                                </div>

                            )
                        }


                        {!loading && !error && (

                            Object.keys(spellsByLevel)
                                .sort(
                                    (a, b) =>
                                        Number(a) - Number(b)
                                )
                                .map((spellLevel) => (

                                    <div
                                        className="spell-level-group"
                                        key={spellLevel}
                                    >

                                        <h2>

                                            {spellLevel === "0"
                                                ? "Trucchetti"
                                                : `Livello ${spellLevel}`
                                            }

                                        </h2>


                                        <div className="spell-list-items">

                                            {spellsByLevel[spellLevel].map(
                                                (spell) => (

                                                    <button
                                                        type="button"
                                                        className={`spell-list-item ${selectedSpell?.id === spell.id
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        key={spell.id}
                                                        onClick={() =>
                                                            selectSpell(
                                                                spell.id
                                                            )
                                                        }
                                                    >

                                                        <span>
                                                            {spell.name}
                                                        </span>

                                                        <span>
                                                            {spell.school}
                                                        </span>

                                                    </button>

                                                )
                                            )}

                                        </div>

                                    </div>

                                ))
                        )}

                    </div>


                    {/* DETTAGLIO */}
                    <div
                        className={`spell-detail ${!showDetail
                            ? "d-none d-lg-block"
                            : ""
                            }`}
                    >

                        {!selectedSpell ? (

                            <div className="spell-detail-empty">

                                <h2>
                                    Seleziona un incantesimo
                                </h2>

                                <p>
                                    Seleziona un incantesimo dalla lista
                                    per visualizzarne i dettagli.
                                </p>

                            </div>

                        ) : (

                            <div>

                                {/* MOBILE BACK */}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-lg-none mb-3"
                                    onClick={() =>
                                        setShowDetail(false)
                                    }
                                >
                                    ← Torna agli incantesimi
                                </button>


                                {/* TITOLO */}
                                <div className="spell-detail-header">

                                    <div>

                                        <h2>
                                            {selectedSpell.name}
                                        </h2>

                                        <p>

                                            {selectedSpell.level === 0
                                                ? "Trucchetto"
                                                : `Incantesimo di ${selectedSpell.level}° livello`
                                            }

                                            {" • "}

                                            {selectedSpell.school}

                                        </p>

                                    </div>


                                    {/* AZIONI */}
                                    <div className="spell-actions">

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => {
                                                // In seguito porterà alla pagina di modifica
                                            }}
                                        >
                                            Modifica
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={deleteSpell}
                                        >
                                            Elimina
                                        </button>

                                    </div>

                                </div>


                                {/* DATI */}
                                <div className="spell-properties">

                                    <div>

                                        <strong>
                                            Tempo di lancio
                                        </strong>

                                        <span>
                                            {selectedSpell.castMethod}
                                        </span>

                                    </div>


                                    <div>

                                        <strong>
                                            Gittata
                                        </strong>

                                        <span>
                                            {selectedSpell.castRange}
                                        </span>

                                    </div>


                                    <div>

                                        <strong>
                                            Componenti
                                        </strong>

                                        <span>
                                            {selectedSpell.components || "-"}
                                        </span>

                                    </div>


                                    <div>

                                        <strong>
                                            Durata
                                        </strong>

                                        <span>
                                            {selectedSpell.duration}
                                        </span>

                                    </div>

                                </div>


                                {/* MATERIALI */}
                                {selectedSpell.materials && (

                                    <div className="spell-section">

                                        <h3>
                                            Materiali
                                        </h3>

                                        <p>
                                            {selectedSpell.materials}
                                        </p>

                                    </div>

                                )}


                                {/* DESCRIZIONE */}
                                <div className="spell-section">

                                    <h3>
                                        Descrizione
                                    </h3>

                                    <p>
                                        {selectedSpell.effect}
                                    </p>

                                </div>


                                {/* LIVELLI SUPERIORI */}
                                {selectedSpell.upgrade && (

                                    <div className="spell-section">

                                        <h3>
                                            Ai livelli superiori
                                        </h3>

                                        <p>
                                            {selectedSpell.upgrade}
                                        </p>

                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
}