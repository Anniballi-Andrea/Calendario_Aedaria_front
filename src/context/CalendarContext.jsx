import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useResource } from "./ResourceContext";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {

    const { activeSession } = useResource()
    const [sessionId, setSessionId] = useState(null)

    useEffect(() => {
        if (activeSession) {
            setSessionId(activeSession.id)
        }
    }, [activeSession])

    const API_URL = sessionId ? `${import.meta.env.VITE_API_URL}/session/${sessionId}/calendar`
        : null;

    const [classLoader, setClassLoader] = useState(false);

    const [dayCount, setDayCount] = useState();

    const [backendStatus, setBackendStatus] = useState("loading");

    function getDay() {
        if (!API_URL) {
            return
        }
        api
            .get(`${API_URL}`, {
                timeout: 3000
            })
            .then((response) => {
                const data = response.data;
                setDayCount(data);

            })
            .catch((error) => {
                console.error("Errore:", error);

            });
    }

    function checkBackendStatus() {
        setBackendStatus("loading");
        api
            .get(`${import.meta.env.VITE_API_URL}/health`, {
                timeout: 3000
            })
            .then(() => {
                setBackendStatus("ready")
            })
            .catch((error) => {
                console.error("Backend non raggiungibile:", error)

                setBackendStatus("error")
            })
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
        if (!sessionId) {
            setDayCount(1)
            return
        }
        getDay();
    }, [sessionId]);

    useEffect(() => {
        if (dayCount === undefined) {
            return
        }

        setDisplaySeason(seasonIndex)
        setDisplayYear(yearCount)
    }, [dayCount])

    useEffect(() => {
        checkBackendStatus()
    }, [])

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

                carouselRef,
                classLoader,
                setClassLoader,
                backendStatus,
                sessionId
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    return useContext(CalendarContext);
}