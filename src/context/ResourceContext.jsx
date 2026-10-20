import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const ResourceContext = createContext();

export function ResourceProvider({ children }) {

    const API_URL = `${import.meta.env.VITE_API_URL}/session`;

    const { isAuthenticated } = useAuth()
    const handbooks = ["Manuale del Giocatore", "Eroi del faerun"]

    const [playerList, setPlayerList] = useState(() => {
        const savedPlayers = localStorage.getItem("playerList")

        return savedPlayers ? JSON.parse(savedPlayers) : []
    })
    const [playerName, setPlayerName] = useState("")
    const [playerWather, setPlayerWather] = useState(0)
    const [playerFood, setPlayerFood] = useState(0)

    const [totalWather, setTotalWather] = useState(() => {
        const savedTotalWather = localStorage.getItem("totalWather")

        return savedTotalWather ? JSON.parse(savedTotalWather) : 0
    })
    const [totalFood, setTotalFood] = useState(() => {
        const savedTotalFood = localStorage.getItem("totalFood")

        return savedTotalFood ? JSON.parse(savedTotalFood) : 0
    })


    const [season, setSeason] = useState(0)

    const addPlayer = (e) => {
        e.preventDefault()

        const nuovoId = crypto.randomUUID();

        const player = {
            id: nuovoId,
            name: playerName,
            useWather: true,
            useFood: true,
        }

        setPlayerList([...playerList, player])
        setPlayerName("")
    }

    const removePlayer = (id) => {
        setPlayerList(currentPlayerList =>
            currentPlayerList.filter(player => player.id !== id)
        )
    }
    const [userSessions, setUserSessions] = useState([])
    const [activeSession, setActiveSession] = useState(null)
    const [isMaster, setIsMaster] = useState(false)

    function fetchSessions() {
        api
            .get(`${API_URL}/my`)
            .then((res) => {
                const sessions = res.data
                setUserSessions(sessions)

                const savedSession = localStorage.getItem("activeSession")

                if (savedSession) {
                    const parsedSession = JSON.parse(savedSession)

                    const sessionExist = sessions.find(session => session.id === parsedSession.id)

                    if (sessionExist) {
                        setActiveSession(sessionExist)
                        return
                    }
                }
                setActiveSession(sessions.length > 0 ? sessions[0] : null)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        if (!isAuthenticated) {
            setUserSessions([])
            setActiveSession(null);
            setIsMaster(false);
            localStorage.removeItem("activeSession")
            return;
        }
        fetchSessions()


    }, [isAuthenticated])

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.removeItem("activeSession")
            return
        }

        if (activeSession) {
            localStorage.setItem(
                "activeSession",
                JSON.stringify(activeSession)
            )
        }
    })

    function checkIsMaster() {
        if (!activeSession) {
            return
        }
        const sessionId = activeSession.id;

        api
            .get(`${API_URL}/${sessionId}/is-master`)
            .then((res) => {
                setIsMaster(res.data)
            })
            .catch((err) => {
                console.log(err.message)
                setIsMaster(false)
            })
    }

    useEffect(() => {
        checkIsMaster()
    }, [activeSession]);

    useEffect(() => {
        localStorage.setItem("playerList", JSON.stringify(playerList))
    }, [playerList])
    useEffect(() => {
        localStorage.setItem("totalWather", JSON.stringify(totalWather))
    }, [totalWather])
    useEffect(() => {
        localStorage.setItem("totalFood", JSON.stringify(totalFood))
    }, [totalFood])

    useEffect(() => {
        console.log(isMaster)
    }, [isMaster])

    return (
        <ResourceContext.Provider
            value={{
                playerList,
                setPlayerList,
                playerName,
                setPlayerName,
                playerWather,
                setPlayerWather,
                playerFood,
                setPlayerFood,
                addPlayer,
                totalWather,
                totalFood,
                setTotalWather,
                setTotalFood,
                season,
                setSeason,
                removePlayer,
                handbooks,
                userSessions,
                setUserSessions,
                activeSession,
                setActiveSession,
                isMaster
            }}
        >
            {children}
        </ResourceContext.Provider>
    );

}

export function useResource() {
    return useContext(ResourceContext);
}