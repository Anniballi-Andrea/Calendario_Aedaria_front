import { useCalendar } from "../context/CalendarContext"

export default function DayGreed({ index, }) {

    const { weeks, days, dayOfYear, displayYear, yearCount, DAYS_IN_WEEK, DAYS_IN_SEASON } = useCalendar()

    const holidays = {
        0: {
            1: "Festa di primavera",
            2: "Festa della semina",
            5: "Festa della fertilità",
            8: "Labarium",
            10: "Trilunio d'estate"
        },
        1: {
            5: "Solalto",
            10: "Trilunio d'autunno"
        },
        2: {
            2: "Giorno delle messi",
            4: "Anniversario della nomina del primo Pater",
            5: "Grangelo",
            10: "Trilunio d'inverno"
        },
        3: {
            1: "Pianto antico",
            5: "Lunganotte",
            10: "Trilunio di primavera"
        }
    }


    return (
        <div className="calendar-grid">

            {weeks.map((week, weekIndex) => (

                days.map((day, dayIndex) => {

                    const absoluteDay =
                        index * DAYS_IN_SEASON +
                        weekIndex * DAYS_IN_WEEK +
                        dayIndex
                    const isCurrentDay =
                        displayYear === yearCount &&
                        absoluteDay === dayOfYear

                    const weekNumber = weekIndex + 1
                    const dayNumber = dayIndex + 1

                    const holidayName =
                        (dayNumber === 6 || dayNumber === 7)
                            ? holidays[index]?.[weekNumber]
                            : null

                    const isHoliday = Boolean(holidayName)

                    return (
                        <div
                            key={`${week}-${day}`}
                            className={`calendar-day 
                                ${isCurrentDay ? "current-day" : ""}
                                ${isHoliday ? "holiday" : ""}
                            `}
                        >

                            <span className="day-number">
                                {dayNumber}
                            </span>
                            {isHoliday && (
                                <span className="holiday-name">
                                    {holidayName}
                                </span>
                            )}

                        </div>
                    )
                })

            ))}

        </div>
    )
}