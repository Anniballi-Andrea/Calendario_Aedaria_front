import { useEffect, useState } from "react"

import api from "../api/axiosConfig"
import MonsterCard from "./MonsterCard"

export default function MonsterManager() {

    const [monsterName, setMonsterName] = useState("")
    const [monsterQuantity, setMonsterQuantity] = useState(0)
    const [monsters, setMonsters] = useState(() => {
        const savedMonsters = localStorage.getItem("aedariaMonsters")

        return savedMonsters
            ? JSON.parse(savedMonsters)
            : []
    })
    const [monsterSuggestions, setMonsterSuggestions] = useState([])

    const API_URL = `${import.meta.env.VITE_API_URL}/monster`

    useEffect(() => {
        localStorage.setItem(
            "aedariaMonsters",
            JSON.stringify(monsters)
        )
    }, [monsters])

    function searchMonsters(value) {

        setMonsterName(value)

        if (value.trim().length < 2) {
            setMonsterSuggestions([])
            return
        }

        api
            .get(`${API_URL}/getMonster`, {
                params: {
                    name: value
                }
            })
            .then((response) => {


                setMonsterSuggestions(response.data.content || [])
            })
            .catch((error) => {

                console.error(
                    "Errore ricerca mostri:",
                    error.response?.status,
                    error.response?.data
                )

                setMonsterSuggestions([])
            })
    }

    function selectMonster(monster) {


        setMonsterName(monster.name)

        setMonsterSuggestions([])
    }

    function addMonster(event) {

        event.preventDefault()

        if (!monsterName.trim() || monsterQuantity < 1) {
            return
        }

        api
            .get(`${API_URL}/getMonster`, {
                params: {
                    name: monsterName
                }
            })
            .then((response) => {

                const monsterList = response.data.content

                const monsterSummary = monsterList.find(
                    monster =>
                        monster.name.toLowerCase() === monsterName.trim().toLowerCase()
                )

                if (!monsterSummary) {
                    console.error("Mostro non trovato:", monsterName)
                    return
                }

                return api.get(`${API_URL}/${monsterSummary.id}`)
            })
            .then((response) => {

                if (!response) {
                    return
                }

                const monster = response.data

                const newMonsters = Array.from(
                    { length: Number(monsterQuantity) },
                    () => ({
                        ...monster,
                        instanceId: crypto.randomUUID(),
                        monsterId: monster.id,
                        maxLifePoint: monster.lifePoint,
                        currentLifePoint: monster.lifePoint,
                        tempLifePoint: 0
                    })
                )
                setMonsters(prev => [
                    ...prev,
                    ...newMonsters
                ])

                setMonsterName("")
                setMonsterQuantity(0)
                setMonsterSuggestions([])
            })
            .catch((error) => {
                console.error(
                    "Errore recupero mostro:",
                    error.response?.status,
                    error.response?.data
                )
            })
    }

    function changeLife(instanceId, newLife) {

        setMonsters(prev =>
            prev.map(monster => {

                if (monster.instanceId !== instanceId) {
                    return monster
                }

                // MODIFICA: aggiorna solamente i PF effettivi
                const updatedLife = Math.max(
                    0,
                    Math.min(newLife, monster.maxLifePoint)
                )

                return {
                    ...monster,
                    currentLifePoint: updatedLife
                }
            })
        )
    }

    function changeTempLife(instanceId, newTempLife) {

        setMonsters(prev =>
            prev.map(monster => {

                if (monster.instanceId !== instanceId) {
                    return monster
                }

                return {
                    ...monster,
                    tempLifePoint: Math.max(0, newTempLife)
                }

            })
        )
    }

    function applyDamage(instanceId, damage) {

        setMonsters(prev =>
            prev.map(monster => {

                if (monster.instanceId !== instanceId) {
                    return monster
                }

                const damageToTempLife = Math.min(
                    monster.tempLifePoint,
                    damage
                )

                const remainingDamage =
                    damage - damageToTempLife
                const updatedLife = Math.max(
                    0,
                    monster.currentLifePoint - remainingDamage
                )

                return {
                    ...monster,
                    tempLifePoint:
                        monster.tempLifePoint - damageToTempLife,
                    currentLifePoint: updatedLife
                }
            })
        )
    }

    function applyHeal(instanceId, heal) {

        setMonsters(prev =>
            prev.map(monster => {

                if (monster.instanceId !== instanceId) {
                    return monster
                }

                const updatedLife = Math.min(
                    monster.maxLifePoint,
                    monster.currentLifePoint + heal
                )

                return {
                    ...monster,
                    currentLifePoint: updatedLife
                }
            })
        )
    }

    function removeMonster(instanceId) {

        setMonsters(prev =>
            prev.filter(monster => monster.instanceId !== instanceId)
        )
    }

    return (
        <div>

            <form onSubmit={addMonster}>

                <div className="row g-2 justify-content-center">

                    <div className="col-12 col-md-2">

                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome del nemico"
                                value={monsterName}
                                onChange={(event) => searchMonsters(event.target.value)}
                            />

                            {monsterSuggestions.length > 0 && (
                                <div className="list-group position-absolute w-100 z-3">

                                    {monsterSuggestions.map((monster) => (

                                        <button
                                            type="button"
                                            className="list-group-item list-group-item-action text-start"
                                            key={monster.id}
                                            onClick={() => selectMonster(monster)}
                                        >
                                            {monster.name}
                                        </button>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    <div className="col-6 col-md-2">

                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={monsterQuantity}
                            onChange={(event) => setMonsterQuantity(event.target.value)}
                        />

                    </div>

                    <div className="col-6 col-md-1">

                        <button
                            type="submit"
                            className="btn btn-sm btn-primary w-100"
                        >
                            Aggiungi
                        </button>

                    </div>

                </div>

            </form>

            <div className="row mt-3 g-3">

                {monsters.map((monster) => (
                    <div
                        className="col-12 col-md-6 col-xl-4"
                        key={monster.instanceId}
                    >


                        <MonsterCard
                            monster={monster}
                            changeTempLife={changeTempLife}
                            applyDamage={applyDamage}
                            applyHeal={applyHeal}
                            removeMonster={removeMonster} />
                    </div>
                ))}

            </div>

        </div>
    )
}