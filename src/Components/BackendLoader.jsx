import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useCalendar } from "../context/CalendarContext";

export default function BackendLoader({ children }) {

    const { backendStatus } = useCalendar();



    const API_URL =
        `${import.meta.env.VITE_API_URL}/days/get`;

    // MODIFICA: ogni tentativo di risveglio dura 2 minuti.
    const TIMER_SECONDS = 120;

    const [countdown, setCountdown] =
        useState(TIMER_SECONDS);

    const [attempt, setAttempt] =
        useState(1);

    const [error, setError] =
        useState(false);

    const [backendReady, setBackendReady] =
        useState(false);


    useEffect(() => {

        if (
            backendStatus !== "error" ||
            backendReady ||
            error
        ) {
            return;
        }

        setCountdown(TIMER_SECONDS);

        const countdownInterval = setInterval(() => {

            setCountdown((previous) => {

                if (previous <= 1) {

                    clearInterval(countdownInterval);

                    return 0;
                }

                return previous - 1;
            });

        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };

    }, [
        backendStatus,
        attempt,
        backendReady,
        error
    ]);


    useEffect(() => {

        if (
            countdown !== 0 ||
            backendStatus !== "error" ||
            backendReady ||
            error
        ) {
            return;
        }

        api
            .get(API_URL)

            .then(() => {

                console.log(
                    "Backend raggiunto. Ricarico la pagina."
                );

                // MODIFICA: il backend è tornato disponibile.
                setBackendReady(true);

                window.location.reload();
            })

            .catch((error) => {

                console.error(
                    "Backend ancora non raggiungibile:",
                    error
                );

                /*
                 * MODIFICA:
                 * Se è fallito il primo tentativo,
                 * parte il secondo countdown.
                 */
                if (attempt === 1) {

                    setAttempt(2);

                    return;
                }

                /*
                 * MODIFICA:
                 * Anche il secondo tentativo è fallito.
                 * Mostriamo definitivamente la schermata
                 * di errore.
                 */
                setError(true);
            });

    }, [
        countdown,
        backendStatus,
        backendReady,
        error,
        attempt
    ]);


    if (backendStatus === "loading") {
        return null;
    }

    const minutes =
        Math.floor(countdown / 60);

    const seconds =
        countdown % 60;

    const formattedTime =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;



    if (error) {

        return (
            <div className="d-flex justify-content-center mt-5">

                <div className="create-page text-center w-50 mt-5">

                    <h1>
                        Aedaria
                    </h1>

                    <h2>
                        Il risveglio è fallito
                    </h2>

                    <p>
                        Il server non ha risposto entro il tempo previsto.
                    </p>

                    <p>
                        Riprova più tardi.
                    </p>

                </div>

            </div>
        );
    }

    if (
        backendStatus === "error" &&
        !backendReady
    ) {

        return (
            <div className="d-flex justify-content-center mt-5">

                <div className="create-page text-center w-50 mt-5">

                    <h1>
                        Aedaria
                    </h1>

                    <p>
                        Il regno si sta risvegliando...
                    </p>

                    <p>
                        Tempo rimanente:
                    </p>

                    <h2>
                        {formattedTime}
                    </h2>

                    <p>
                        Tentativo {attempt} di 2
                    </p>

                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Caricamento...
                        </span>
                    </div>

                </div>

            </div>
        );
    }

    return children;
}