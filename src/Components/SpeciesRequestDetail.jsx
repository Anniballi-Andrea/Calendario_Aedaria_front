import SafeHtml from "./SafeHtml";

export default function SpeciesRequestDetail({
    request,
    setSelectedItem,
    setShowDetail
}) {

    if (!request) {
        return null;
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 mt-3">
                <div className="row justify-content-center">

                    <div className="col-12 col-lg-8 card mt-3 pb-3">

                        <div className="card-header text-center position-relative">

                            <h5>
                                {request.name}
                            </h5>

                            <div>
                                <span className="badge text-bg-primary">
                                    {request.type}
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

                        </div>

                        <div className="card-body text-start">

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

                </div>
            </div>
        </div>
    );
}