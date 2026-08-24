import { useCalendar } from "../context/CalendarContext"

export default function WeeckColumn() {
    const { weeks } = useCalendar()
    return (
        <div className="week-column">

            {weeks.map((week) => (
                <div
                    key={week}
                    className="week-name"
                >
                    {week}
                </div>
            ))}

        </div>

    )
}