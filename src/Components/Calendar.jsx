
import CalendarHeader from "./CalendarHeader"
import DayGreed from "./DayGreed"
import WeeckColumn from "./WeeckColumn"
import CauroselBotton from "./CauroselBotton"
import { useCalendar } from "../context/CalendarContext"


export default function Calendar() {

    const { carouselRef, seasons, displaySeason } = useCalendar()


    return (

        <div className="calendar-container">

            <div
                ref={carouselRef}
                id="seasonCarousel"
                className="carousel slide"
            >

                <div className="carousel-inner">

                    {seasons.map((season, index) => (

                        <div
                            key={season}
                            className={`carousel-item ${index === displaySeason ? 'active' : ''}`}
                        >

                            <div className="season">

                                <CalendarHeader season={season} />

                                <div className="calendar">

                                    <WeeckColumn />

                                    {/* Griglia dei giorni */}
                                    <DayGreed index={index} />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <CauroselBotton />

            </div>

        </div>
    )
}