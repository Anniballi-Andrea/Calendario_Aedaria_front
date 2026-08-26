export default function TurnManager({ round, initiative, changeTurn, restartTurn }) {

    return (
        <div className="mt-4">

            <div className="fw-bold fs-5 mb-2">
                Round: {round}
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2">

                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => changeTurn(-1)}
                    disabled={initiative.length === 0}
                >
                    ←
                </button>

                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={restartTurn}
                    disabled={initiative.length === 0}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => changeTurn(1)}
                    disabled={initiative.length === 0}
                >
                    →
                </button>

            </div>

        </div>
    )
}