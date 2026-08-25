import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function Initiative() {

    const [playerName, setPlayerName] = useState("")
    const [playerDex, setPlayerDex] = useState(0)
    const [playerInit, setPlayerInit] = useState(0)
    const [playerPriority, setPlayerPriority] = useState(0)
    const [editedPlayers, setEditedPlayers] = useState({})
    const [playerToRemove, setPlayerToRemove] = useState(null)
    const [initiative, setInitiative] = useState([])
    const [turnCount, setTurnCount] = useState(0)
    const [round, setRound] = useState(() => {
        const savedRound = localStorage.getItem("initiativeRound")

        return savedRound ? Number(savedRound) : 1
    })

    const API_URL = "http://localhost:8080/api/initiative"


    useEffect(() => {
        getPlayerList()
        getTurnCount()
    }, [])

    useEffect(() => {
        localStorage.setItem("initiativeRound", round)
    }, [round])


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
        if (initiative.length === 0) return

        const currentPlayerIndex =
            ((turnCount % initiative.length) + initiative.length) %
            initiative.length

        if (n === 1 && currentPlayerIndex === initiative.length - 1) {
            setRound(prev => prev + 1)
        }

        if (n === -1 && currentPlayerIndex === 0 && round > 1) {
            setRound(prev => prev - 1)
        }

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
            .then(async () => {

                const updateRequests = initiative.map(player =>
                    axios.put(`${API_URL}/changePlayer`, {
                        ...player,
                        initiative: 0
                    })
                )

                await Promise.all(updateRequests)

                setRound(1)

                getTurnCount()
                getPlayerList()
            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }


    const currentPlayerIndex =
        initiative.length > 0
            ? ((turnCount % initiative.length) + initiative.length) %
            initiative.length
            : 0

    function handlePlayerChange(id, field, value) {
        setEditedPlayers(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }))
    }
    function changePlayer(player) {
        const editedPlayer = {
            ...player,
            ...editedPlayers[player.id],
            dex: Number(
                editedPlayers[player.id]?.dex ?? player.dex
            ),
            initiative: Number(
                editedPlayers[player.id]?.initiative ?? player.initiative
            ),
            priority: Number(
                editedPlayers[player.id]?.priority ?? player.priority
            )
        }

        axios
            .put(`${API_URL}/changePlayer`, editedPlayer)
            .then(() => {
                setEditedPlayers(prev => {
                    const updated = { ...prev }
                    delete updated[player.id]
                    return updated
                })

                getPlayerList()
            })
            .catch((error) => {
                console.error("Errore:", error)
            })
    }
    function openRemoveModal(player) {
        setPlayerToRemove(player)
    }

    function closeRemoveModal() {
        setPlayerToRemove(null)
    }

    return (
        <div className="initiative-pannel">

            <div className="col text-center mt-3">

                <h2>Iniziativa</h2>


                {/* Form aggiunta giocatore */}

                <div className="mt-3">

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


                {/* Controlli turno */}

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


                {/* Lista giocatori */}

                <div className="mt-3 row justify-content-center">
                    <div className="col-12 col-lg-8 col-xl-6 mb-5">

                        {initiative.length > 0 ? (

                            initiative.map((player, index) => (
                                <div className="d-flex " key={player.id} >
                                    <div
                                        className={`card initiative-player-card  ${index === currentPlayerIndex
                                            ? "initiative-player-active"
                                            : ""
                                            }`}
                                    >
                                        <div className="row g-2 card-body align-items-end">

                                            <div className="col-12 col-md-2">
                                                <div className="player-name-wrapper">
                                                    <span className="fw-bold">
                                                        {player.name}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-md-2">
                                                <label
                                                    htmlFor={`initiative-${player.id}`}
                                                    className="form-label mb-1"
                                                >
                                                    Init
                                                </label>

                                                <input
                                                    id={`initiative-${player.id}`}
                                                    type="number"
                                                    className="form-control"
                                                    value={
                                                        editedPlayers[player.id]?.initiative ??
                                                        player.initiative
                                                    }
                                                    onChange={event =>
                                                        handlePlayerChange(
                                                            player.id,
                                                            "initiative",
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="col-4 col-md-2">
                                                <label
                                                    htmlFor={`dex-${player.id}`}
                                                    className="form-label mb-1"
                                                >
                                                    Dex
                                                </label>

                                                <input
                                                    id={`dex-${player.id}`}
                                                    type="number"
                                                    className="form-control"
                                                    value={
                                                        editedPlayers[player.id]?.dex ??
                                                        player.dex
                                                    }
                                                    onChange={event =>
                                                        handlePlayerChange(
                                                            player.id,
                                                            "dex",
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="col-4 col-md-2">
                                                <label
                                                    htmlFor={`priority-${player.id}`}
                                                    className="form-label mb-1"
                                                >
                                                    Priorità
                                                </label>

                                                <input
                                                    id={`priority-${player.id}`}
                                                    type="number"
                                                    className="form-control"
                                                    value={
                                                        editedPlayers[player.id]?.priority ??
                                                        player.priority
                                                    }
                                                    onChange={event =>
                                                        handlePlayerChange(
                                                            player.id,
                                                            "priority",
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="col-12 col-md-4 d-flex gap-2 justify-content-md-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => changePlayer(player)}
                                                >
                                                    Salva
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => openRemoveModal(player)}
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
        </div>
    )
}