import SafeHtml from "./SafeHtml";

export default function TalentDetail({ selectedItem, setSelectedItem, setShowDetail }) {

    if (!selectedItem) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7  mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 card mt-3">

                    <div className="card-header text-center position-relative">

                        <h5>
                            {selectedItem.name}
                        </h5>

                        <div>

                            <span className="badge text-bg-primary">
                                {selectedItem.type}
                            </span>


                            <button
                                type="button"
                                className="btn btn-close position-absolute top-0 end-0 m-2"
                                onClick={() => {
                                    setShowDetail(false);
                                    setSelectedItem(null);
                                }}
                                aria-label="Chiudi"
                            />
                            <div className="card-body">
                                {selectedItem.requisite && (
                                    <div className="mb-3 border-bottom pb-2">

                                        <strong>
                                            Requisiti
                                        </strong>
                                        {
                                            `: ${selectedItem.requisite}`
                                        }
                                    </div>
                                )}
                                <h5>Descrizione:</h5>
                                <p>
                                    <SafeHtml html={selectedItem.effect} />
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}