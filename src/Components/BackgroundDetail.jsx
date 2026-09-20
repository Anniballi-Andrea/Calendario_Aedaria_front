import SafeHtml from "./SafeHtml";

export default function BackgroundDetail({ selectedItem, setSelectedItem, setShowDetail }) {

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

                            <span className="badge text-bg-warning">
                                {selectedItem.handbook}
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
                        />
                        <hr />
                        <div className="card-body text-start">
                            <div className="text-center">
                                <h5>Descrizione:</h5>
                            </div>

                            <p>
                                <SafeHtml html={selectedItem.description} />
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}