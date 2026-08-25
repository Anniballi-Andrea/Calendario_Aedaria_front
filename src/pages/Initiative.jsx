import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function Initiative() {

    const [playerName, setPlayerName] = useState("")
    const [playerDex, setPlayerDex] = useState(0)
    const [playerInit, setPlayerInit] = useState(0)
    const [playerPriority, setPlayerPriority] = useState(0)

    const [initiative, setInitiative] = useState([])
    const [turnCount, setTurnCount] = useState(0)

    const API_URL = "http://localhost:8080/api/initiative"


    useEffect(() => {
        getPlayerList()
        getTurnCount()
    }, [])


    function getPlayerList() {
        axios
            .get(`${API_URL}/getPlayerList`)
            .then((response) => {
                const data = response.data
                setInitiative(data)
            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    function addPlayer(event) {

        event.preventDefault()

        const player = {
            name: playerName,
            dex: Number(playerDex),
            initiative: Number(playerInit),
            priority: Number(playerPriority)
        }

        axios
            .post(`${API_URL}/addPlayer`, player)
            .then(() => {

                getPlayerList()

                setPlayerName("")
                setPlayerDex(0)
                setPlayerInit(0)
                setPlayerPriority(0)

            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    function removePlayer(id) {

        axios
            .delete(`${API_URL}/deletePlayer/${id}`)
            .then(() => {

                getPlayerList()

            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    function getTurnCount() {

        axios
            .get(`${API_URL}/getRound`)
            .then((response) => {

                setTurnCount(response.data)

            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    function changeTurn(n) {

        axios
            .post(`${API_URL}/changeTurn`, { quantity: n })
            .then(() => {

                getTurnCount()

            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    function restartTurn() {

        axios
            .post(`${API_URL}/restartTurn/1`)
            .then(() => {

                getTurnCount()

            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    const currentPlayerIndex =
        initiative.length > 0
            ? turnCount % initiative.length
            : 0


    const currentRound =
        initiative.length > 0
            ? Math.floor(turnCount / initiative.length) + 1
            : 0


    return (
        <div className="initiative-pannel">

            <div className="col text-center mt-3">

                <h2>Iniziativa</h2>


                {/* Form aggiunta giocatore */}

                <div className="mt-3">

                    <form onSubmit={addPlayer}>

                        <div className="row g-2 justify-content-center align-items-end">

                            <div className="col-2">
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


                {/* Controlli turno */}

                <div className="mt-4">

                    <div className="fw-bold fs-5 mb-2">
                        Round: {currentRound}
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


                {/* Lista giocatori */}

                <div className="mt-3 row justify-content-center">
                    <div className="col-12 col-lg-8 col-xl-6">

                        {initiative.length > 0 ? (

                            initiative.map((player, index) => (
                                <div className="d-flex " key={player.id} >
                                    <div
                                        className={`card initiative-player-card  ${index === currentPlayerIndex
                                            ? "initiative-player-active"
                                            : ""
                                            }`}
                                    >
                                        <div className="row row-cols-2 row-cols-md-5 card-body justify-content-center">
                                            <div className="col">
                                                <span className="fw-bold me-3">
                                                    {player.name}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <span className="me-3">
                                                    Iniziativa:{" "}
                                                    <strong>
                                                        {player.initiative}
                                                    </strong>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <span className="me-3">
                                                    Des:{" "}
                                                    <strong>
                                                        {player.dex}
                                                    </strong>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <span>
                                                    Priorità:{" "}
                                                    <strong>
                                                        {player.priority}
                                                    </strong>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ms-3"
                                                    onClick={() =>
                                                        removePlayer(player.id)
                                                    }
                                                >
                                                    Rimuovi
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            ))

                        ) : (

                            <p className="mt-3 mb-0">
                                Aggiungi giocatori
                            </p>

                        )}
                    </div>


                </div>

            </div>

        </div>
    )
}