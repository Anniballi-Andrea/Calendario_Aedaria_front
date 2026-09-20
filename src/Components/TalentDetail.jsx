import SafeHtml from "./SafeHtml";

export default function TalentDetail({ selectedItem, setSelectedItem, setShowDetail, setTalentDetail }) {

    if (!selectedItem) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7 mt-3">
            <div className="row justify-content-center">

                {!selectedItem ? (
                    <div className="col-10 col-xl-6 text-center card mt-5 d-none d-lg-block">
                        <div className="card-body">
                            <h3>
                                Seleziona un talento
                            </h3>
                        </div>
                    </div>

                ) : (
                    <div className="col-12 col-lg-8 card mt-3">

                        <div className="card-header text-center position-relative">

                            <h5>
                                {selectedItem.name}
                            </h5>

                            <div>
                                <span className="badge text-bg-primary">
                                    {selectedItem.type}
                                </span>

                                <span className="badge text-bg-warning ms-2">
                                    {selectedItem.handbook}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="btn btn-close position-absolute top-0 end-0 m-2"
                                onClick={() => {
                                    setShowDetail(false);
                                    setSelectedItem(null);
                                    setTalentDetail(null)
                                }}
                                aria-label="Chiudi"
                            ></button>

                        </div>

                        <div className="card-body text-start">

                            {selectedItem.requisite && (
                                <div className="mb-3 border-bottom pb-2">

                                    <strong>
                                        Requisiti
                                    </strong>

                                    {`: ${selectedItem.requisite}`}

                                </div>
                            )}

                            <div className="text-center">
                                <h5>
                                    Descrizione:
                                </h5>
                            </div>

                            <p>
                                <SafeHtml html={selectedItem.effect} />
                            </p>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}