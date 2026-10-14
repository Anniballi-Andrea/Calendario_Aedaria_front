export default function SessionCardHeader({ createSession }) {

    return (
        <div className="card-header bg-transparent py-3">

            <div className="d-flex justify-content-between align-items-center">

                <div>
                    <h4 className="mb-1">
                        Le mie sessioni
                    </h4>

                    <small className="text-muted">
                        Le campagne a cui partecipi
                    </small>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createSession}
                >
                    + Crea sessione
                </button>

            </div>

        </div>
    )
}