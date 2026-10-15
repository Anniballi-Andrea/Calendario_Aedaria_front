export default function AccountData({ username, role, }) {

    return (
        <div className="card shadow-sm mb-2">

            <div className="card-header bg-transparent py-3">
                <h4 className="mb-0">
                    Informazioni account
                </h4>
            </div>

            <div className="card-body">

                <div className="row g-4">

                    <div className="col-md-6">

                        <div className="text-muted small mb-1">
                            Username
                        </div>

                        <div className="fw-semibold">
                            {username || "-"}
                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="text-muted small mb-1">
                            Ruolo
                        </div>

                        <span
                            className={
                                role === "ADMIN"
                                    ? "badge text-bg-warning"
                                    : "badge text-bg-secondary"
                            }
                        >
                            {role || "-"}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    )
}