export default function JumboUser({ username, role }) {

    return (
        <div className="text-center mb-3 data-page">
            <div className="card shadow-sm pt-4 pb-3 mb-2 ">
                <div
                    className="mx-auto mb-3 rounded-circle bg-primary text-white
                       d-flex align-items-center justify-content-center
                       fw-bold fs-3"
                    style={{
                        width: "72px",
                        height: "72px"
                    }}
                >
                    {username?.charAt(0).toUpperCase()}
                </div>

                <h1 className="fw-bold mb-1">
                    {username}
                </h1>
                <div>
                    <span
                        className={
                            role === "ADMIN"
                                ? "badge text-bg-warning"
                                : "badge text-bg-secondary"
                        }
                    >
                        {role}
                    </span>
                </div>


                <p className="text-muted mt-3 mb-0">
                    Gestisci il tuo account e le tue sessioni
                </p>
            </div>
        </div>
    )
}