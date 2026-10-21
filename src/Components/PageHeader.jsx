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
    showFeatureButton,
    handbooks,
    selectedHandbooks,
    handleHandbookChange,
    types,
    selectedType,
    handleTypeChange,
    onSearch
}) {

    const navigate = useNavigate()

    return (
        <div className="container-fluid data-page-header">
            <div className="row justify-content-between ">

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

                <div
                    className={
                        showDetail
                            ? "col-12 col-lg-6 d-none d-lg-block"
                            : "col-12 col-lg-6"
                    }
                >

                    <div className="d-flex justify-content-end gap-2">


                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Cerca..."
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && onSearch) {
                                    event.preventDefault();
                                    onSearch();
                                }
                            }}
                        />


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
                    <div className="d-flex justify-content-end mt-3">
                        <div className="me-4">
                            {handbooks &&
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary dropdown-toggle text-nowrap"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {selectedHandbooks.length === 0
                                            ? "Tutti i manuali"
                                            : `${selectedHandbooks.length} manuali`}
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {handbooks.map((handbook) => (
                                            <li key={handbook}>
                                                <label className="dropdown-item">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        checked={selectedHandbooks.includes(handbook)}
                                                        onChange={() => handleHandbookChange(handbook)}
                                                    />
                                                    {handbook}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                        <div>
                            {types &&
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success dropdown-toggle text-nowrap"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {selectedType.length === 0
                                            ? "tutti i tipi"
                                            : `${selectedType.length} tipi`}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {types.map((type) => (
                                            <li key={type}>
                                                <label className="dropdown-item">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        checked={selectedType.includes(type)}
                                                        onChange={() => handleTypeChange(type)}
                                                    />
                                                    {type}
                                                </label>
                                            </li>
                                        ))}

                                    </ul>
                                </div>

                            }
                        </div>

                    </div>



                </div>


            </div>
        </div>
    )
}