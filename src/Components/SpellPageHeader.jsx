import { Navigate, useNavigate } from "react-router-dom";

export default function SpellPageHeader({ search, setSearch, level, setLevel }) {

    const navigate = useNavigate()

    return (
        <div className="data-page-header">

            <div className="d-flex justify-content-between align-items-center">

                <h1>
                    Incantesimi
                </h1>

                <button
                    type="button"
                    className="btn btn-primary d-none d-lg-block"
                    onClick={() =>
                        navigate("/aggiungi-incantesimo")
                    }
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
                            onClick={() =>
                                setLevel(index)
                            }
                        >
                            {index}
                        </button>
                    )
                )}

            </div>

        </div>

    )
}