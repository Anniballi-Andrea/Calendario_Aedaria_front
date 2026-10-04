import SafeHtml from "./SafeHtml";

export default function ClassFeatureRequestDetail({
    request,
    setSelectedItem,
    setShowDetail }) {

    if (!request) {
        return null;
    }

    return (
        <div className="row justify-content-center ">
            <div className="col-12 col-lg-10 mt-3 ">
                <div className="row justify-content-center">

                    {!request ? (
                        <div className="col-10 col-xl-6 text-center card mt-5 d-none d-lg-block">
                            <div className="card-body">
                                <h3>
                                    Seleziona un talento
                                </h3>
                            </div>
                        </div>

                    ) : (
                        <div className="col-12 col-lg-8 card mt-3  pb-3">

                            <div className="card-header text-center position-relative">

                                <h5>
                                    {request.name}
                                </h5>

                                <div>
                                    {`feature per: `}
                                    <span className="badge text-bg-primary">
                                        {request.classes?.name}
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

                            <div className="card-body text-start ">

                                {request.requisite && (
                                    <div className="mb-3 border-bottom pb-2">

                                        <strong>
                                            Requisiti
                                        </strong>

                                        {`: ${request.requisite}`}

                                    </div>
                                )}

                                <div className="text-center">
                                    <h5>
                                        Descrizione:
                                    </h5>
                                </div>

                                <p>
                                    <SafeHtml html={request.description} />
                                </p>

                            </div>
                            <hr />

                            <div className="mt-3">

                                <strong>Stato richiesta:</strong>

                                <div>
                                    <span className="badge text-bg-warning">
                                        {request.status}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-3">

                                <strong>Richiesta da:</strong>

                                <div>
                                    {request.user?.username}
                                </div>

                            </div>

                            <div className="mt-3">

                                <strong>Data richiesta:</strong>

                                <div>
                                    {request.createdAt
                                        ? new Date(request.createdAt).toLocaleString("it-IT")
                                        : ""}
                                </div>

                            </div>

                        </div>
                    )}



                </div>
            </div>
        </div>

    );
}