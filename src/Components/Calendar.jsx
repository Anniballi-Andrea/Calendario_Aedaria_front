
import CalendarHeader from "./CalendarHeader"
import DayGreed from "./DayGreed"
import WeeckColumn from "./WeeckColumn"
import CauroselBotton from "./CauroselBotton"
import { useCalendar } from "../context/CalendarContext"
import { useState } from "react"
import DayCard from "./DayCard"
import { useEffect } from "react"
import { Carousel } from "bootstrap"

export default function Calendar() {

    const {
        carouselRef,
        seasons,
        displaySeason,
        setDisplaySeason,
        displayYear,
        setDisplayYear
    } = useCalendar();

    const [selectedDay, setSelectedDay] = useState(null);

    const handleDayClick = (day, rect) => {

        setSelectedDay({
            ...day,
            rect
        });
    };

    useEffect(() => {

        if (!carouselRef.current) return;

        const carousel = new Carousel(
            carouselRef.current,
            {
                interval: false,
                wrap: true,
                touch: true
            }
        );

        const handleSlide = (event) => {

            const oldSeason = event.from;
            const newSeason = event.to;

            setDisplaySeason(newSeason);

            if (oldSeason === 3 && newSeason === 0) {
                setDisplayYear((year) => year + 1);
            }

            if (oldSeason === 0 && newSeason === 3) {
                setDisplayYear((year) => Math.max(0, year - 1));
            }
        };

        carouselRef.current.addEventListener(
            "slid.bs.carousel",
            handleSlide
        );

        return () => {

            if (carouselRef.current) {
                carouselRef.current.removeEventListener(
                    "slid.bs.carousel",
                    handleSlide
                );
            }

            carousel.dispose();
        };

    }, []);

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
                            className={`carousel-item ${index === displaySeason ? "active" : ""
                                }`}
                        >

                            <div className="season">

                                <CalendarHeader season={season} />

                                <div className="calendar">

                                    <WeeckColumn />

                                    {/* Griglia dei giorni */}
                                    <DayGreed
                                        index={index}
                                        onDayClick={handleDayClick}
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <CauroselBotton />

            </div>

            {selectedDay && (

                <DayCard
                    key={`${selectedDay.year}-${selectedDay.seasonIndex}-${selectedDay.weekNumber}-${selectedDay.dayNumber}`}
                    day={selectedDay}
                    onClose={() => setSelectedDay(null)}
                />

            )}

        </div>
    );
}