import { useResource } from "../context/ResourceContext"

export default function Modal({ setShowModal, name, daysToAdd, changeDays }) {

    const { playerList } = useResource()
    const playersUsedWater = playerList.filter(player => player.useWather)
    const playersUsedFood = playerList.filter(player => player.useFood)


    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {name}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => { setShowModal(false) }}
                        />
                    </div>

                    <div className="modal-body">
                        {daysToAdd > 0 ? (
                            <div>
                                <p>
                                    Vuoi far avanzare il tempo di {daysToAdd} {daysToAdd === 1 ? "giorno" : "giorni"}?
                                </p>
                                {daysToAdd === 1 && (
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="fw-bold">Razioni consumate da:</p>
                                            {playersUsedFood.map(p => (
                                                <p>{p.name}</p>
                                            ))}
                                        </div>
                                        <div className="col-6">
                                            <p className="fw-bold">Acqua consumata da:</p>
                                            {playersUsedWater.map(player => (
                                                <p>{player.name}</p>
                                            ))}
                                        </div>
                                    </div>


                                )}
                            </div>
                        ) : (
                            <p>
                                Vuoi tornare indietro di {Math.abs(daysToAdd)} {Math.abs(daysToAdd) === 1 ? "giorno" : "giorni"}?
                            </p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Annulla
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => changeDays(daysToAdd)}
                        >{daysToAdd > 0
                            ? daysToAdd === 1
                                ? "Riposa"
                                : "Avanza"
                            : "Indietro"
                            }
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}