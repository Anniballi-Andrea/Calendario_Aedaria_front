import SafeHtml from "./SafeHtml";

export default function ArmorDetail({ selectedItem, setSelectedItem, setShowDetail }) {

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
                    <div className="col-12 col-lg-8 card mt-3 mb-4">

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
                            <div className="row ">
                                <div className="col-12 col-xl-6 mb-3 border-bottom pb-2 text-center">

                                    <strong>
                                        Prezzo:
                                    </strong>

                                    {` ${selectedItem.cost} MO`}

                                </div>
                                <div className="col-12 col-xl-6 mb-3 border-bottom pb-2 text-center">

                                    <strong>
                                        Classe Armatura:
                                    </strong>

                                    {` ${selectedItem.armorClass}`}

                                </div>
                                <div className="col-12 col-xl-6 mb-3 border-bottom pb-2 text-center">

                                    <strong>
                                        Peso:
                                    </strong>

                                    {` ${selectedItem.weight} kg`}

                                </div>

                                {selectedItem.requisite ? <div className="col-12 col-xl-6 mb-3 border-bottom pb-2 text-center">
                                    <strong>Requisito:  </strong> {selectedItem.requisite}
                                </div> : <div className="col-12 col-xl-6 mb-3 border-bottom pb-2 text-center">
                                    <strong>Requisito:</strong> nessuno
                                </div>}

                                {
                                    selectedItem.stealthDisadvantage && <div className="col-12 text-center ">
                                        <strong>Svantaggio su Furtività</strong>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );

}