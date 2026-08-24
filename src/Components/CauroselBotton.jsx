import { Carousel } from "bootstrap"
import { useEffect } from "react"
import { useCalendar } from "../context/CalendarContext"

export default function CauroselBotton() {

    const {
        dayCount,
        carouselRef,
        seasonIndex,
        displaySeason,
        setDisplaySeason,
        displayYear,
        setDisplayYear,
        yearCount,
        SEASONS_IN_YEAR
    } = useCalendar();

    useEffect(() => {

        if (carouselRef.current) {

            new Carousel(carouselRef.current, {
                interval: false,
                wrap: true
            });

        }

    }, []);

    useEffect(() => {

        if (!carouselRef.current) return;

        const carousel = Carousel.getInstance(carouselRef.current);

        if (!carousel) return;

        if (seasonIndex !== displaySeason) {
            carousel.to(seasonIndex);
        }

    }, [dayCount]);


    function nextSeason() {

        const carousel = Carousel.getInstance(carouselRef.current);

        if (!carousel) return;

        const newSeason =
            displaySeason < SEASONS_IN_YEAR - 1
                ? displaySeason + 1
                : 0;

        const newYear =
            displaySeason < SEASONS_IN_YEAR - 1
                ? displayYear
                : displayYear + 1;

        carouselRef.current.addEventListener(
            "slid.bs.carousel",
            () => {
                console.log(
                    "PRIMA SET:",
                    newSeason,
                    newYear
                )

                setDisplaySeason(newSeason)
                setDisplayYear(newYear)

                console.log(
                    "DOPO SET:",
                    newSeason,
                    newYear
                )
            },
            { once: true }
        )

        carousel.next();
    }


    function previousSeason() {

        const carousel = Carousel.getInstance(carouselRef.current);

        if (!carousel) return;

        if (displaySeason === 0 && displayYear === 0) {
            return;
        }

        const newSeason =
            displaySeason > 0
                ? displaySeason - 1
                : SEASONS_IN_YEAR - 1;

        const newYear =
            displaySeason > 0
                ? displayYear
                : displayYear - 1;

        carouselRef.current.addEventListener(
            "slid.bs.carousel",
            () => {
                setDisplaySeason(newSeason);
                setDisplayYear(newYear);
            },
            { once: true }
        );

        carousel.prev();
    }


    return (
        <>
            <button
                className="carousel-control-prev"
                type="button"
                onClick={previousSeason}
            >
                <span className="calendar-arrow calendar-arrow-prev">
                    ‹
                </span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                onClick={nextSeason}
            >
                <span className="calendar-arrow calendar-arrow-next">
                    ›
                </span>
            </button>
        </>
    );
}