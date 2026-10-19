
export default function SessionCardBody({ sessions, createSession, openSession }) {

    return (
        <div className="card-body">

            {sessions.length === 0 ? (

                <div className="text-center py-5">

                    <div className="display-6 mb-3">
                        🎲
                    </div>

                    <h5 className="mb-2">
                        Nessuna sessione
                    </h5>

                    <p className="text-muted mb-4">
                        Non partecipi ancora a nessuna sessione.
                    </p>

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={createSession}
                    >
                        Crea la tua prima sessione
                    </button>

                </div>

            ) : (

                <div className="d-flex flex-column gap-3">

                    {sessions.map((session) => (

                        <div
                            key={session.id}
                            className="border rounded p-3"
                        >

                            <div className="d-flex justify-content-between
                                                    align-items-center
                                                    flex-wrap gap-3">

                                <div>
                                    <h5 className="mb-0">
                                        {session.name} #{session.id}
                                    </h5>
                                    <div className="d-flex align-items-center
                                                            gap-2 mb-1">


                                        <div>
                                            <strong>Master:</strong> {session.master?.username}
                                        </div>
                                    </div>



                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => openSession(session)}>
                                    Apri sessione →
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    )
}