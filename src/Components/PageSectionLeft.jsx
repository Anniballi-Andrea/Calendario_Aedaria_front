import { useNavigate } from "react-router-dom"


export default function PageSectionLeft({ name, navigateTo, item, selectedItem, setSelectedItem, deleteItem, updateSlgLink, slug, setShowDetail, editPath }) {

    const navigate = useNavigate()

    const groupedItems = item?.reduce((groups, currentItem) => {
        const level = currentItem.level;

        if (!groups[level]) {
            groups[level] = [];
        }

        groups[level].push(currentItem);

        return groups;
    }, {});

    return (
        <div className="data-page-section">
            <div className="d-flex justify-content-between mt-2">
                <div className="div">
                    <h2>
                        {name}
                    </h2>
                </div>
                <div className="d-none d-lg-block">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(navigateTo)
                        }
                    >
                        + Aggiungi
                    </button>
                </div>

            </div>

            <div className="row align-items-center justify-content-between">
                {item?.length === 0 && (
                    <div className="col-12 data-page-empty ">
                        Nessuna abilità presente.
                    </div>
                )}
                {Object.entries(groupedItems).map(([level, items]) => (
                    <div key={level}>

                        <h5 className="mt-3">
                            {level === "0" ? "Trucchetti" : `Livello ${level}`}
                        </h5>

                        {items.map((item) => (
                            <div
                                className="d-flex align-items-center"
                                key={item.id}
                            >
                                <div className="col-12 col-lg-7">
                                    <div className="card mt-2">
                                        <button
                                            type="button"
                                            className={`btn spell-list-button w-100 text-center ${selectedItem?.id === item.id
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setShowDetail(true);
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-5">
                                    <div className="d-none d-lg-flex justify-content-end">
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    navigate(
                                                        editPath
                                                            ? editPath(item.id)
                                                            : `/classe/${slug}/${updateSlgLink}/${item.id}/modifica`
                                                    )
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </div>

                                        <div className="ms-lg-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}