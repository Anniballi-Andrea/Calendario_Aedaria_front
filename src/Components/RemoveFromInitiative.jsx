export default function RemoveFromInitiative({ playerToRemove, closeRemoveModal, removePlayer }) {

    return (
        <>
            {playerToRemove && (
                <>
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Rimuovi giocatore
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeRemoveModal}
                                        aria-label="Chiudi"
                                    />
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">
                                        Sei sicuro di voler rimuovere{" "}
                                        <strong>
                                            {playerToRemove.name}
                                        </strong>
                                        ?
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeRemoveModal}
                                    >
                                        Annulla
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            removePlayer(playerToRemove.id)
                                            closeRemoveModal()
                                        }}
                                    >
                                        Rimuovi
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </>
    )
}