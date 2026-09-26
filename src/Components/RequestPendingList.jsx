export default function RequestPendingList({
    item,
    selectedItem,
    setSelectedItem,
    setShowDetail
}) {
    const pendingRequests = item?.filter(
        (request) => request.status === "PENDING"
    ) || [];

    return (
        <div className="data-page-section">

            <div className="d-flex justify-content-between mt-2">
                <div>
                    <h2>
                        Richieste in attesa
                    </h2>
                </div>
            </div>

            <div className="row align-items-center justify-content-between left-item-vh">

                {pendingRequests.length === 0 && (
                    <div className="col-12 data-page-empty">
                        Nessuna richiesta in attesa.
                    </div>
                )}

                {pendingRequests.map((request) => (
                    <div
                        className="d-flex align-items-center"
                        key={request.id}
                    >
                        <div className="col-12">
                            <div className="card mt-2">
                                <button
                                    type="button"
                                    className={`btn spell-list-button w-100 text-center ${selectedItem?.id === request.id
                                            ? "active"
                                            : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedItem(request);
                                        setShowDetail(true);
                                    }}
                                >
                                    {request.name}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}