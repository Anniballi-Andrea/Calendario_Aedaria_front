import { useEffect } from "react"

export default function PageSectionRight({ selectedItem, setSelectedItem, setShowDetail, emptyMessage }) {

    useEffect(() => {
        console.log("Incantesimo selezionato:", selectedItem);
    }, [selectedItem]);

    return (
        <div className="col-12 col-lg-7">
            <div className="row justify-content-center">

                {!selectedItem ? (

                    <div className="col-10 col-xl-6 text-center card mt-5 d-none d-lg-block">
                        <div className="card-body">
                            <h3>

                                {emptyMessage}

                            </h3>
                        </div>
                    </div>
                ) : (
                    <div className="col-12 col-lg-8 card mt-3">
                        <div className="card-header text-center position-relative">
                            <h5>
                                {selectedItem.name}
                            </h5>

                            <div className="">
                                <span className="badge text-bg-primary me-1">
                                    Livello {selectedItem.level}
                                </span>

                                {selectedItem.isSubClassSkill && (
                                    <span className="badge text-bg-secondary">
                                        Sottoclasse
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn btn-close position-absolute top-0 end-0 m-2"
                                onClick={() => {
                                    setShowDetail(false)
                                    setSelectedItem(null)
                                }}
                                aria-label="Chiudi"
                            ></button>
                        </div>
                        <div className="card-body">
                            <h5>Descrizione:</h5>
                            <div>
                                {selectedItem.description}
                            </div>
                        </div>

                    </div>
                )}


            </div>
        </div>
    )
}