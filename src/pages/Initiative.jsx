import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import FormAddInitiativePlayer from "../Components/FormAddInitiativePlayers"
import TurnManager from "../Components/TurnManager"
import InitiativeInput from "../Components/InitiativeImput"
import InitiativeCards from "../Components/InitiativeCards"
import RemoveFromInitiative from "../Components/RemoveFromInitiative"

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

                <FormAddInitiativePlayer
                    addPlayer={addPlayer}
                    playerName={playerName}
                    setPlayerName={setPlayerName}
                    playerDex={playerDex}
                    setPlayerDex={setPlayerDex}
                    playerInit={playerInit}
                    setPlayerInit={setPlayerInit}
                />
                {/* Controlli turno */}

                <TurnManager round={round} initiative={initiative} changeTurn={changeTurn} restartTurn={restartTurn} />

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
                                        <InitiativeCards
                                            name={player.name}
                                            player={player}
                                            editedPlayers={editedPlayers}
                                            handlePlayerChange={handlePlayerChange}
                                            changePlayer={changePlayer}
                                            openRemoveModal={openRemoveModal}
                                        />

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
            <RemoveFromInitiative playerToRemove={playerToRemove} closeRemoveModal={closeRemoveModal} removePlayer={removePlayer} />
        </div>
    )
}