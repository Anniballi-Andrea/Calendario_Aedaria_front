import SafeHtml from "./SafeHtml";

export default function WeaponDetail({ selectedItem, setSelectedItem, setShowDetail }) {

    return (

        <div className="col-12 col-lg-7 mt-3">
            <div className="row justify-content-center">

                {!selectedItem ? (
                    <div className="col-10 col-xl-6 text-center card mt-5 d-none d-lg-block">
                        <div className="card-body">
                            <h3>
                                Seleziona un oggetto
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


                            </div>

                            <button
                                type="button"
                                className="btn btn-close position-absolute top-0 end-0 m-2"
                                onClick={() => {
                                    setShowDetail(false);
                                    setSelectedItem(null);

                                }}
                                aria-label="Chiudi"
                            ></button>

                        </div>

                        <div className="card-body text-start">
                            <div className="row">

                            </div>
                            <div className="mb-3 border-bottom pb-2">

                                <strong>
                                    danni:
                                </strong>

                                {` ${selectedItem.damage}`}

                            </div>

                            <div className="mb-3 border-bottom pb-2">

                                <strong>
                                    Proprietà
                                </strong>

                                {`: ${selectedItem.property}`}

                            </div>

                            <div className="mb-3 border-bottom pb-2">
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <strong>
                                            Prezzo
                                        </strong>

                                        {`: ${selectedItem.cost}`}
                                    </div>
                                    <div>
                                        <strong>
                                            Peso
                                        </strong>

                                        {`: ${selectedItem.weight}`}
                                    </div>
                                </div>


                            </div>

                            <div className="text-center">
                                <h5>
                                    Padronanza:
                                </h5>
                            </div>

                            <p>
                                <SafeHtml html={selectedItem.mastery} />
                            </p>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );

}