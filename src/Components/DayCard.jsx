import { useEffect } from "react"
import { useCalendar } from "../context/CalendarContext"
import { useState } from "react"
import { createPortal } from "react-dom"

export default function DayCard({ day, onClose }) {

    const { seasons } = useCalendar()

    const seasonName = seasons[day.seasonIndex]

    const [expanded, setExpanded] = useState(false)
    const [closing, setClosing] = useState(false)
    const noteKey = `day-note-${day.year}-${day.seasonIndex}-${day.weekNumber}-${day.dayNumber}`

    const [note, setNote] = useState(() => {
        return localStorage.getItem(noteKey) || ""
    })

    useEffect(() => {
        if (note.trim() === "") {
            localStorage.removeItem(noteKey)
            return
        }

        localStorage.setItem(noteKey, note)
    }, [note, noteKey])

    useEffect(() => {

        let secondFrame

        const firstFrame = requestAnimationFrame(() => {

            secondFrame = requestAnimationFrame(() => {
                setExpanded(true)
            })

        })

        return () => {
            cancelAnimationFrame(firstFrame)

            if (secondFrame) {
                cancelAnimationFrame(secondFrame)
            }
        }

    }, [])


    const handleClose = () => {

        setClosing(true)
        setExpanded(false)

    }


    const handleTransitionEnd = (event) => {

        if (
            closing &&
            event.propertyName === "transform"
        ) {
            onClose()
        }
    }


    const initialStyle = {
        "--start-top": `${day.rect.top}px`,
        "--start-left": `${day.rect.left}px`,
        "--start-width": `${day.rect.width}px`,
        "--start-height": `${day.rect.height}px`
    }


    return createPortal(

        <div
            className={`day-card 
                ${expanded ? "day-card-expanded" : ""}
                ${closing ? "day-card-closing" : ""}
            `}
            style={initialStyle}
            onTransitionEnd={handleTransitionEnd}
        >

            <button
                type="button"
                className="day-card-close"
                onClick={handleClose}
            >
                ×
            </button>

            <h2>
                Giorno {day.dayNumber}
            </h2>
            <div className="row row-cols-3">
                <div className="col text-center  bg-secondary-subtle">
                    Anno
                </div>
                <div className="col text-center  bg-secondary-subtle">
                    Stagione
                </div>
                <div className="col text-center  bg-secondary-subtle">
                    Settimana
                </div>
                <div className="col text-center border ">
                    {day.year}
                </div>
                <div className="col text-center border-bottom border-top">
                    {seasonName}
                </div>
                <div className="col text-center border">
                    {day.weekNumber}
                </div>
            </div>

            {day.holidayName && (
                <p className="text-danger fw-bold text-center">
                    {day.holidayName}
                </p>
            )}

            <div className="mt-3">
                <label htmlFor="day-note" className="form-label fw-bold">
                    Note
                </label>

                <textarea
                    id="day-note"
                    className="form-control"
                    rows="3"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Inserisci una nota..."
                />
            </div>

        </div>,

        document.body
    )
}