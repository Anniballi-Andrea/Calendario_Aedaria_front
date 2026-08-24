import axios from "axios"
import { useState } from "react"
import Modal from "./Modal"
import ButtonChangeDays from "./ButtonChangeDays"
import { useResource } from "../context/ResourceContext"
import { useCalendar } from "../context/CalendarContext"

export default function CalendarHeader({ season }) {

    const { displayYear, getDay } = useCalendar()


    const { playerList, setTotalFood, setTotalWather } = useResource()

    const [showModal, setShowModal] = useState(false)
    const [daysToAdd, setDaysToAdd] = useState(1)
    const [modalName, setModalName] = useState("")

    function changeDays(quantity) {

        axios
            .post("http://localhost:8080/api/days/addDay", {
                quantity: quantity
            })
            .then(() => {

                if (quantity === 1) {
                    consumeResources()
                }

                getDay()
                setShowModal(false)

            })
            .catch((error) => { console.error("Errore:", error) })
    }

    function consumeResources() {
        const waterUsed = playerList.filter(player => player.useWather).length
        const foodUsed = playerList.filter(player => player.useFood).length

        setTotalWather(prev => Math.max(0, prev - waterUsed))
        setTotalFood(prev => Math.max(0, prev - foodUsed))
    }

    return (
        <div className="d-flex justify-content-between">
            <div>
                <h2 className="season-title">
                    Anno:{displayYear}-{season}
                </h2>
            </div>
            <div className="d-md-flex justify-content-between d-none " >
                <ButtonChangeDays
                    setDaysToAdd={setDaysToAdd}
                    setShowModal={setShowModal}
                    setModalName={setModalName}
                    name={"Riposo"}
                    title={"Riposo Lungo"}
                    dayQuantity={1}
                    buttonType={"primary"} />
                <ButtonChangeDays
                    setDaysToAdd={setDaysToAdd}
                    setShowModal={setShowModal}
                    setModalName={setModalName}
                    name={"+ 7"}
                    title={"Time Skip di 7 giorni"}
                    dayQuantity={7}
                    buttonType={"success"} />
                <ButtonChangeDays
                    setDaysToAdd={setDaysToAdd}
                    setShowModal={setShowModal}
                    setModalName={setModalName}
                    name={"+ 30"}
                    title={"Time Skip di 30 giorni"}
                    dayQuantity={30}
                    buttonType={"success"} />
                <ButtonChangeDays
                    setDaysToAdd={setDaysToAdd}
                    setShowModal={setShowModal}
                    setModalName={setModalName}
                    name={"Indietro"}
                    title={"Rimuovi 1 giorno"}
                    dayQuantity={-1}
                    buttonType={"danger"} />

            </div>

            {showModal && (
                <Modal changeDays={changeDays} setShowModal={setShowModal} name={modalName} daysToAdd={daysToAdd} />
            )
            }

            {
                showModal && (
                    <div className="modal-backdrop fade show"></div>
                )
            }

        </div >
    )
}