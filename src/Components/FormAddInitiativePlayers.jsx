export default function FormAddInitiativePlayer({ addPlayer, playerName, setPlayerName, playerDex, setPlayerDex, playerInit, setPlayerInit }) {

    return (
        <div className="mt-3 d-none d-lg-block">

            <form onSubmit={addPlayer}>

                <div className="row g-2 justify-content-center align-items-end">

                    <div className="col-2">
                        <label
                            htmlFor="player-name"
                            className="form-label mb-1"
                        >
                            Nome
                        </label>
                        <input
                            id="player-name"
                            className="form-control"
                            type="text"
                            value={playerName}
                            onChange={event =>
                                setPlayerName(event.target.value)
                            }
                            placeholder="Nome..."
                            required
                        />
                    </div>


                    <div className="col-2">
                        <label
                            htmlFor="player-dex"
                            className="form-label mb-1"
                        >
                            Dex
                        </label>
                        <input
                            id="player-dex"
                            className="form-control"
                            type="number"
                            value={playerDex}
                            onChange={event =>
                                setPlayerDex(event.target.value)
                            }
                            placeholder="Destrezza"
                            required
                        />
                    </div>


                    <div className="col-2">
                        <label
                            htmlFor="player-init"
                            className="form-label mb-1"
                        >
                            Init
                        </label>
                        <input
                            id="player-init"
                            className="form-control"
                            type="number"
                            value={playerInit}
                            onChange={event =>
                                setPlayerInit(event.target.value)
                            }
                            placeholder="Iniziativa"
                            required
                        />
                    </div>

                    <div className="col-12 ">
                        <div>
                            <button
                                type="submit"
                                className="btn btn-primary "
                            >
                                Aggiungi
                            </button>
                        </div>


                    </div>

                </div>

            </form>

        </div>
    )
}