import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function SubClassHeader({ selectedSubClass, setSelectedSubClass, subClasses, navigateTo, navigateToCreateSkill, navigateToChange }) {

    const { isAdmin } = useAuth();

    const navigate = useNavigate()

    const DELETE_URL = `${import.meta.env.VITE_API_URL}/subClass/delete`

    const deleteSubClass = () => {
        if (!selectedSubClass) {
            return;
        }

        const confirmed = window.confirm(
            `Sei sicuro di voler eliminare la sottoclasse "${selectedSubClass.name}"?`
        );

        if (!confirmed) {
            return;
        }

        api
            .delete(`${DELETE_URL}/${selectedSubClass.id}`)
            .then(() => {
                setSelectedSubClass(null)
            })
            .catch((err) => {
                console.error("Errore durante l'eliminazione della sottoclasse:", err)
                alert("Errore durante l'eliminazione della sottoclasse.");
            })
    }



    return (
        <div className="data-page-section">
            <div className="d-flex justify-content-between ">
                <div>
                    <h2>
                        Sottoclassi
                    </h2>
                </div>


            </div>
            <div className="col-12 ">
                <div className="d-flex align-items-center mt-3 ">
                    <div>
                        <select
                            className="form-select"
                            value={selectedSubClass?.id || ""}
                            onChange={(event) => {
                                const subClass =
                                    subClasses?.find(
                                        (subClass) =>
                                            subClass.id ===
                                            Number(event.target.value)
                                    );

                                setSelectedSubClass(
                                    subClass || null
                                );
                            }}
                        >
                            <option value="">
                                Scegli una sottoclasse
                            </option>

                            {subClasses?.map((subClass) => (
                                <option
                                    key={subClass.id}
                                    value={subClass.id}
                                >
                                    {subClass.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {isAdmin && (
                        <div>
                            <button button
                                type="button"
                                className="btn btn-primary ms-2"
                                onClick={() =>
                                    navigate(navigateTo)
                                }
                            >
                                +
                            </button>
                        </div>
                    )}



                </div>
                <div className="d-flex mt-2">

                    {selectedSubClass && isAdmin && (
                        <>
                            <div>
                                <button button
                                    type="button"
                                    className="btn btn-warning ms-2"
                                    onClick={() =>
                                        navigate(navigateToChange)
                                    }
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={deleteSubClass}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </>
                    )
                    }

                </div>


            </div>
            {
                selectedSubClass &&
                selectedSubClass.handbook !== "Manuale del Giocatore" && (
                    <p className="text-danger fw-bold">la sottoclasse selezionata appartiene al manuale <span className="text-warning fw-bold">{selectedSubClass.handbook}</span></p>
                )
            }

        </div >
    )
}