export default function PageHeader({
    name,
    searchValue,
    setSearchValue,
    selectedLevel,
    setSelectedLevel,
    levels,
    showDetail
}) {
    return (
        <div className="container-fluid data-page-header">
            <div className="row justify-content-between ">
                {/* PARTE DESTRA */}
                <div className="col-12 col-lg-4 text-lg-start mt-3 mt-lg-0">
                    <h1 className="mb-0">
                        {name}
                    </h1>
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
                                            Livello {level}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}