import api from "../api/axiosConfig";

export default function SessionDataCard({ closeSession, selectedSession, API_URL, username, loadingAction, setLoadingAction, setSelectedSession, setError, loadSessions }) {

    const removePlayer = (sessionId, userId) => {

        const confirmed = window.confirm(
            "sei sicuro di voler rimuovere il giocatore?"
        )

        if (!confirmed) {
            return
        }

        setLoadingAction(true);
        setError("");

        api
            .delete(`${API_URL}/${sessionId}/member/${userId}`)
            .then(() => {
                loadSessions()
            })
            .catch((error) => {
                setError(
                    error.response?.data?.message ||
                    "Errore durante la rimozione del giocatore"
                )
            })
            .finally(() => {
                setLoadingAction(false);
            })
    }

    const leaveSession = (sessionId) => {
        const confirmed = window.confirm(
            "Sei sicuro/a di voler uscire da questa sessione?"
        )

        if (!confirmed) {
            return
        }

        setLoadingAction(true)
        setError("")

        api
            .delete(`${API_URL}/${sessionId}/leave`)
            .then(() => {
                setSelectedSession(null)
                loadSessions()
            })
            .catch((error) => {
                setError(
                    error.response.data.message ||
                    "Errore durante l'uscita dalla sessione."
                );
            })
            .finally(() => {
                setLoadingAction(false);
            });
    }

    const deleteSession = (sessionId) => {
        const confirmed = window.confirm(
            "Sei sicuro/a di voler cancellare questa sessione?"
        )

        if (!confirmed) {
            return
        }

        setLoadingAction(true)
        setError("")

        api
            .delete(`${API_URL}/${sessionId}`)
            .then(() => {
                setSelectedSession(null)
                loadSessions()
            })
            .catch((error) => {
                setError(
                    error.response?.data?.message ||
                    "Errore durante la cancellazione dalla sessione."
                );
            })
            .finally(() => {
                setLoadingAction(false);
            });
    }

    function inviteUser(sessionId) {

        const invitedUsername = window.prompt(
            "Inserisci lo username dell'utente da invitare:"
        );

        if (!invitedUsername) {
            return;
        }

        api
            .post(`${API_URL}/${sessionId}/invite`, null, {
                params: {
                    username: invitedUsername
                }
            })
            .then(() => {
                alert("Utente aggiunto alla sessione.");
                loadSessions()

            })
            .catch((error) => {
                console.error(error);

                alert(
                    error.response?.data?.message ||
                    "Impossibile aggiungere l'utente alla sessione."
                );
            });
    }



    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex
                   align-items-center justify-content-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1050
            }}
            onClick={closeSession}>
            <div
                className="card shadow-lg"
                style={{
                    width: "90%",
                    maxWidth: "600px",
                    maxHeight: "80vh"
                }}
                onClick={(event) => event.stopPropagation()}
            >

                <div className="card-header bg-transparent">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>
                            <h4 className="mb-0">
                                {selectedSession.name}
                            </h4>

                            <small className="text-muted">
                                Sessione #{selectedSession.id}
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Chiudi"
                            onClick={closeSession}
                        />

                    </div>

                </div>

                <div
                    className="card-body overflow-auto"
                    style={{ maxHeight: "60vh" }}
                >

                    <div className="mb-4">

                        <h6 className="text-muted mb-2">
                            Master
                        </h6>

                        <div className="border rounded p-3">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>
                                    <strong>
                                        {selectedSession.master?.username}
                                    </strong>
                                </div>

                                <span className="badge text-bg-warning">
                                    MASTER
                                </span>

                            </div>

                        </div>

                    </div>


                    <div>
                        <div className="d-flex align-items-center mb-2">
                            <h6 className="text-muted me-2">
                                Giocatori
                            </h6>
                            <div>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => { inviteUser(selectedSession.id) }}> <i className="bi bi-person-add"></i></button>
                            </div>
                        </div>


                        {selectedSession.members
                            ?.filter((member) => member.role === "PLAYER")
                            .map((member) => (

                                <div
                                    key={member.id}
                                    className="border rounded p-3 mb-2"
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>
                                            <strong>
                                                {member.user?.username}
                                            </strong>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">

                                            <span className="badge text-bg-secondary">
                                                PLAYER
                                            </span>

                                            {selectedSession.master?.username === username && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    disabled={loadingAction}
                                                    onClick={() =>
                                                        removePlayer(
                                                            selectedSession.id,
                                                            member.user.id
                                                        )
                                                    }
                                                >
                                                    Rimuovi
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        {selectedSession.members?.filter(
                            (member) => member.role === "PLAYER"
                        ).length === 0 && (
                                <div className="text-muted text-center py-3">
                                    Nessun giocatore nella sessione.
                                </div>
                            )}

                    </div>

                </div>
                {selectedSession.members?.some(
                    (member) =>
                        member.user?.username === username &&
                        member.role === "PLAYER"
                ) ? (
                    <div className="card-footer bg-transparent">

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            disabled={loadingAction}
                            onClick={() => leaveSession(selectedSession.id)}
                        >
                            {loadingAction
                                ? "Operazione..."
                                : "Esci dalla sessione"
                            }
                        </button>

                    </div>
                ) : (
                    <div className="card-footer bg-transparent">

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            disabled={loadingAction}
                            onClick={() => deleteSession(selectedSession.id)}
                        >
                            {loadingAction
                                ? "Operazione..."
                                : "Elimina la sessione"
                            }
                        </button>

                    </div>
                )}

            </div>

        </div>
    )
}