export default function AccountManager({ logout }) {

    const handleDeleteAccount = () => {

        const confirmed = window.confirm(
            "Sei sicuro di voler eliminare il tuo account? Questa operazione non può essere annullata."
        );

        if (!confirmed) {
            return;
        }


    };


    return (
        <div className="data-page mb-3">
            <div className="card shadow-sm mb-2">

                <div className="card-header bg-transparent py-3">
                    <h4 className="mb-0">
                        Gestione account
                    </h4>
                </div>

                <div className="card-body">

                    <div className="d-flex justify-content-between
                            align-items-center
                            flex-wrap gap-3">

                        <div>

                            <h5 className="mb-1">
                                Logout
                            </h5>

                            <p className="mb-0 text-muted">
                                Esci dal tuo account.
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>


                    <hr className="my-4" />

                    <div className="border border-danger rounded p-3">

                        <div className="d-flex justify-content-between
                                align-items-center
                                flex-wrap gap-3">

                            <div>

                                <h5 className="mb-1 text-danger">
                                    Elimina account
                                </h5>

                                <p className="mb-0 text-muted">
                                    L'eliminazione dell'account è permanente
                                    e non può essere annullata.
                                </p>

                            </div>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={handleDeleteAccount}
                            >
                                Elimina account
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}