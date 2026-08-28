import { useNavigate } from "react-router-dom";

export default function SpellPageDetail({ showDetail, selectedSpell, deleteSpell, setShowDetail, setSelectedSpell }) {

    const navigate = useNavigate()
    return (
        <div
            className={
                !showDetail
                    ? "data-page-detail d-none d-lg-block"
                    : "data-page-detail"
            }
        >

            {!selectedSpell ? (

                <div className="data-page-empty">

                    <h2>
                        Seleziona un incantesimo
                    </h2>

                    <p>
                        Seleziona un incantesimo dalla lista
                        per visualizzarne i dettagli.
                    </p>

                </div>

            ) : (

                <div className="card data-page-detail-card">

                    {/* TITOLO */}
                    <div className="card-header">

                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">

                            <div className="d-flex justify-content-center">

                                <button
                                    type="button"
                                    className="mt-3 btn btn-outline-danger d-lg-none mb-3"
                                    onClick={() => {
                                        setShowDetail(false);
                                        setSelectedSpell(null);
                                    }}
                                >
                                    ← Chiudi
                                </button>

                            </div>

                            <div className="w-100 text-start">

                                <h2>
                                    {selectedSpell.name}
                                </h2>

                                <p>
                                    {selectedSpell.level === 0
                                        ? "Trucchetto"
                                        : ` ${selectedSpell.level}° livello`
                                    }

                                    {" - "}

                                    {selectedSpell.school}

                                </p>

                            </div>

                            <div>

                                <div className="d-flex justify-content-between">

                                    <div className="me-2 d-none d-lg-block">

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => navigate(`/incantesimi/modifica/${selectedSpell.id}`)
                                            }
                                        >
                                            Modifica
                                        </button>

                                    </div>

                                    <div className="d-none d-lg-block">

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={deleteSpell}
                                        >
                                            Elimina
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* DATI */}
                    <div className="card-body">

                        <div>
                            <strong>
                                Tempo di lancio:
                            </strong>

                            <span>
                                {" "}
                                {selectedSpell.castMethod}
                            </span>
                        </div>

                        <div>
                            <strong>
                                Gittata:
                            </strong>

                            <span>
                                {" "}
                                {selectedSpell.castRange}
                            </span>
                        </div>

                        <div>
                            <strong>
                                Componenti:
                            </strong>

                            <span>
                                {" "}
                                {selectedSpell.components || "-"}
                            </span>
                        </div>

                        <div>
                            <strong>
                                Durata:
                            </strong>

                            <span>
                                {" "}
                                {selectedSpell.duration}
                            </span>
                        </div>

                    </div>

                    {/* MATERIALI */}
                    {selectedSpell.materials && (

                        <div className="card-body">

                            <h3>
                                Materiali:
                            </h3>

                            <p>
                                {selectedSpell.materials}
                            </p>

                        </div>

                    )}

                    {/* DESCRIZIONE */}
                    <div className="card-body">

                        <h3>
                            Descrizione:
                        </h3>

                        <p>
                            {selectedSpell.effect}
                        </p>

                    </div>

                    {/* LIVELLI SUPERIORI */}
                    {selectedSpell.upgrade && (

                        <div className="card-body">

                            <h3>
                                Ai livelli superiori:
                            </h3>

                            <p>
                                {selectedSpell.upgrade}
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    )
}