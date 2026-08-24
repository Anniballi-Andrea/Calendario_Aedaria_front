import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {

    const [dayCount, setDayCount] = useState();

    function getDay() {
        axios
            .get("http://localhost:8080/api/days/get")
            .then((response) => {
                const data = response.data;
                setDayCount(data);
            })
            .catch((error) => {
                console.error("Errore:", error);
            });
    }

    const DAYS_IN_WEEK = 7;
    const WEEKS_IN_SEASON = 10;
    const SEASONS_IN_YEAR = 4;

    const DAYS_IN_SEASON = DAYS_IN_WEEK * WEEKS_IN_SEASON;
    const DAYS_IN_YEAR = DAYS_IN_SEASON * SEASONS_IN_YEAR;

    const yearCount = dayCount
        ? Math.floor(dayCount / DAYS_IN_YEAR)
        : 0;

    const dayOfYear = dayCount
        ? dayCount % DAYS_IN_YEAR
        : 0;

    const seasonIndex = Math.floor(
        dayOfYear / DAYS_IN_SEASON
    );

    const days = [
        "Primo",
        "Secondo",
        "Terzo",
        "Quarto",
        "Quinto",
        "Sesto",
        "Settimo"
    ];

    const weeks = [
        "Prima",
        "Seconda",
        "Terza",
        "Quarta",
        "Quinta",
        "Sesta",
        "Settima",
        "Ottava",
        "Nona",
        "Decima"
    ];

    const seasons = [
        "Inner",
        "Ardes",
        "Solox",
        "Desith"
    ];

    const carouselRef = useRef(null);

    const [displaySeason, setDisplaySeason] = useState(seasonIndex);
    const [displayYear, setDisplayYear] = useState(yearCount);

    useEffect(() => {
        getDay();
    }, []);

    // Quando cambia il giorno corrente,
    // riportiamo il carosello alla stagione e all'anno correnti.
    useEffect(() => {
        if (dayCount === undefined) return

        setDisplaySeason(seasonIndex)
        setDisplayYear(yearCount)
    }, [dayCount])

    return (
        <CalendarContext.Provider
            value={{
                dayCount,
                setDayCount,
                getDay,

                DAYS_IN_WEEK,
                WEEKS_IN_SEASON,
                SEASONS_IN_YEAR,
                DAYS_IN_SEASON,
                DAYS_IN_YEAR,

                yearCount,
                dayOfYear,
                seasonIndex,

                days,
                weeks,
                seasons,

                displaySeason,
                setDisplaySeason,

                displayYear,
                setDisplayYear,

                carouselRef
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    return useContext(CalendarContext);
}