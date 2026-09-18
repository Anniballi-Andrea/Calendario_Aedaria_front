import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function PageSectionLeft({ name,
    navigateTo,
    item,
    selectedItem,
    setSelectedItem,
    deleteItem,
    updateSlugLink,
    slug,
    setShowDetail,
    editPath,
    currentPage,
    totalPages,
    setCurrentPage }) {

    const { isAdmin } = useAuth()
    const navigate = useNavigate()

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const hasLevel = item?.some(
        (currentItem) => currentItem.level !== undefined && currentItem.level !== null
    );
    const groupedItems = hasLevel
        ? item.reduce((groups, currentItem) => {
            const level = currentItem.level;

            if (!groups[level]) {
                groups[level] = [];
            }

            groups[level].push(currentItem);

            return groups;
        }, {})
        : null;


    const paginationPages = [];

    if (totalPages <= 7) {
        for (let index = 0; index < totalPages; index++) {
            paginationPages.push(index);
        }
    } else {
        paginationPages.push(0);

        if (currentPage > 3) {
            paginationPages.push("start-ellipsis");
        }

        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages - 2, currentPage + 1);

        for (let index = startPage; index <= endPage; index++) {
            paginationPages.push(index);
        }

        if (currentPage < totalPages - 4) {
            paginationPages.push("end-ellipsis");
        }

        paginationPages.push(totalPages - 1);
    }

    return (
        <div className="data-page-section">
            <div className="d-flex justify-content-between mt-2">
                <div className="div">
                    <h2>
                        {name}
                    </h2>
                </div>
                {
                    isAdmin &&
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
                }


            </div>

            <div className="row align-items-center justify-content-between left-item-vh">
                {item?.length === 0 && (
                    <div className="col-12 data-page-empty ">
                        Nessuna dato presente.
                    </div>
                )}
                {hasLevel ? (
                    Object.entries(groupedItems).map(([level, items]) => (
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
                                                {item.isSubClassSkill && (
                                                    <span className="badge bg-secondary ms-2">
                                                        Sottoclasse
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {
                                        isAdmin &&
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
                                                                    : `/classe/${slug}/${updateSlugLink}/${item.id}/modifica`
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
                                                        onClick={() => {
                                                            setItemToDelete(item);
                                                            setShowDeleteModal(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }


                                </div>
                            ))}
                        </div>
                    ))) : (
                    item?.map((item) => (
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
                                        {item.isSubClassSkill && (
                                            <span className="badge bg-secondary ms-2">
                                                Sottoclasse
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {
                                isAdmin &&
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
                                                            : `/classe/${slug}/${updateSlugLink}/${item.id}/modifica`
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
                                                onClick={() => {
                                                    setItemToDelete(item);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    ))
                )}

            </div>
            {totalPages > 1 && (
                <div className="">
                    <nav aria-label="Paginazione">

                        <ul className="pagination justify-content-center mt-4">

                            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Precedente
                                </button>
                            </li>

                            {paginationPages.map((page, index) => {

                                if (page === "start-ellipsis" || page === "end-ellipsis") {
                                    return (
                                        <li
                                            key={`${page}-${index}`}
                                            className="page-item disabled"
                                        >
                                            <span className="page-link">
                                                ...
                                            </span>
                                        </li>
                                    );
                                }

                                return (
                                    <li
                                        key={page}
                                        className={`page-item ${currentPage === page ? "active" : ""}`}
                                    >
                                        <button
                                            type="button"
                                            className="page-link"
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page + 1}
                                        </button>
                                    </li>
                                );
                            })}

                            <li
                                className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Successiva
                                </button>
                            </li>

                        </ul>

                    </nav>
                </div>

            )}

            {showDeleteModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Conferma eliminazione
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                />
                            </div>

                            <div className="modal-body">
                                Sei sicuro di voler eliminare{" "}
                                <strong>{itemToDelete?.name}</strong>?
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Annulla
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        deleteItem(itemToDelete.id);
                                        setShowDeleteModal(false);
                                        setItemToDelete(null);
                                    }}
                                >
                                    Elimina
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}