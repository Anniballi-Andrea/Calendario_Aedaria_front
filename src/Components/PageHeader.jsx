import { useNavigate } from "react-router-dom"

export default function PageHeader({
    name,
    searchValue,
    setSearchValue,
    selectedLevel,
    setSelectedLevel,
    levels,
    showDetail,
    slug,
    showFeatureButton
}) {

    const navigate = useNavigate()

    return (
        <div className="container-fluid data-page-header">
            <div className="row justify-content-between ">
                {/* PARTE DESTRA */}
                <div className="col-12 col-lg-4 text-lg-start mt-3 mt-lg-0">
                    <div className="d-flex align-items-center">
                        <h1 className="mb-0">
                            {name}
                        </h1>
                        {showFeatureButton && (
                            <>
                                {slug === "warlock" ? (
                                    <div className="ms-4">
                                        <button type="button" className="btn btn-primary mt-2 " onClick={() => navigate(`/classe/${slug}/feature`)} >
                                            Suppliche Occulte
                                        </button>
                                    </div>
                                ) : slug === "stregone" ? (
                                    <div className="ms-4">
                                        <button type="button" className="btn btn-primary mt-2 " onClick={() => navigate(`/classe/${slug}/feature`)} >
                                            Metamagia
                                        </button>
                                    </div>) : slug === "guerriero" ? (
                                        <div className="ms-4">
                                            <button type="button" className="btn btn-primary mt-2 " onClick={() => navigate(`/classe/${slug}/feature`)} >
                                                Tattiche
                                            </button>
                                        </div>) : null
                                }
                            </>
                        )}

                    </div>
                </div>
                {/* PARTE SINISTRA */}
                <div
                    className={
                        showDetail
                            ? "col-12 col-lg-6 d-none d-lg-block"
                            : "col-12 col-lg-6"
                    }
                >

                    <div className="d-flex justify-content-end gap-2">

                        {/* SEARCHBAR */}
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Cerca..."
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                        />

                        {/* LIVELLI */}
                        {levels && levels.length > 0 &&
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary dropdown-toggle text-nowrap"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedLevel === null
                                        ? "Tutti i livelli"
                                        : `Livello ${selectedLevel}`}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end overflow-auto level-dropdown">
                                    <li>
                                        <button
                                            type="button"
                                            className="dropdown-item"
                                            onClick={() =>
                                                setSelectedLevel(null)
                                            }
                                        >
                                            Tutti i livelli
                                        </button>
                                    </li>

                                    {levels.map((level) => (
                                        <li key={level}>
                                            <button
                                                type="button"
                                                className="dropdown-item"
                                                onClick={() =>
                                                    setSelectedLevel(level)
                                                }
                                            >
                                                {level === 0 ? "Trucchetti" : `Livello ${level}`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>}

                    </div>

                </div>


            </div>
        </div>
    )
}