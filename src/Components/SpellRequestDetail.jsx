import SafeHtml from "./SafeHtml";

export default function SpellRequestDetail({
    request,
    setSelectedItem,
    setShowDetail
}) {

    if (!request) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7 mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 card mt-3">

                    <div className="card-header text-center position-relative">

                        <h5>
                            {request.name}
                        </h5>

                        <div>

                            {request.level === 0 ? (
                                <span className="badge text-bg-primary">
                                    Trucchetto
                                </span>
                            ) : (
                                <span className="badge text-bg-primary">
                                    Livello {request.level}
                                </span>
                            )}

                            <span className="badge text-bg-secondary ms-2">
                                {request.school}
                            </span>

                        </div>

                        <button
                            type="button"
                            className="btn btn-close position-absolute top-0 end-0 m-2"
                            onClick={() => {
                                // MODIFICA: chiude il dettaglio della request
                                setShowDetail(false);
                                setSelectedItem(null);
                            }}
                            aria-label="Chiudi"
                        />

                    </div>

                    <div className="card-body left-item-vh">

                        <div className="row">

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Tempo di lancio:</strong>
                                <div>
                                    {request.castMethod}
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Gittata:</strong>
                                <div>
                                    {request.castRange}
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Componenti:</strong>
                                <div>
                                    {request.components}
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Durata:</strong>
                                <div>
                                    {request.duration}
                                </div>
                            </div>

                        </div>

                        {request.materials && (
                            <>
                                <hr />

                                <strong>Materiali:</strong>

                                <p>
                                    {request.materials}
                                </p>
                            </>
                        )}

                        <hr />

                        <strong>Descrizione:</strong>

                        <div>
                            <p>
                                <SafeHtml html={request.effect} />
                            </p>
                        </div>

                        {request.upgrade && (
                            <>
                                <hr />

                                <strong>A livelli superiori:</strong>

                                <p>
                                    {request.upgrade}
                                </p>
                            </>
                        )}

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