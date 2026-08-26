import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ResourceContext = createContext();

export function ResourceProvider({ children }) {

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


    useEffect(() => {
        localStorage.setItem("playerList", JSON.stringify(playerList))
    }, [playerList])
    useEffect(() => {
        localStorage.setItem("totalWather", JSON.stringify(totalWather))
    }, [totalWather])
    useEffect(() => {
        localStorage.setItem("totalFood", JSON.stringify(totalFood))
    }, [totalFood])

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
                removePlayer
            }}
        >
            {children}
        </ResourceContext.Provider>
    );

}

export function useResource() {
    return useContext(ResourceContext);
}