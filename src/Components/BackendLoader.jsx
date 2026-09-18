import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useCalendar } from "../context/CalendarContext";

export default function BackendLoader({ children }) {

    const { backendStatus } = useCalendar();

    const API_URL =
        `${import.meta.env.VITE_API_URL}/days/get`;

    const TIMER_SECONDS = 210;

    const CHECK_INTERVAL = 15000;

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

                    if (attempt === 1) {
                        setAttempt(2);
                        return 0;
                    }

                    setError(true);

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
            backendStatus !== "error" ||
            backendReady ||
            error
        ) {
            return;
        }

        // MODIFICA: variabile per gestire il timeout
        // del prossimo controllo.
        let timeoutId;

        // MODIFICA: controllo sequenziale del backend.
        // La richiesta successiva viene programmata
        // solo dopo la conclusione della precedente.
        const checkBackend = () => {

            api
                .get(API_URL, {
                    // MODIFICA: concediamo 15 secondi al server
                    // per rispondere.
                    timeout: 15000
                })
                .then(() => {

                    setBackendReady(true);

                    window.location.reload();

                })
                .catch((error) => {

                    console.error(
                        "Backend ancora non raggiungibile:",
                        error
                    );

                    // MODIFICA: programmiamo il controllo successivo
                    // solo dopo che la richiesta precedente è terminata.
                    timeoutId = setTimeout(
                        checkBackend,
                        CHECK_INTERVAL
                    );
                });
        };

        // MODIFICA: il primo controllo viene effettuato
        // dopo 15 secondi.
        timeoutId = setTimeout(
            checkBackend,
            CHECK_INTERVAL
        );

        return () => {
            // MODIFICA: annulliamo il prossimo controllo
            // quando l'effect viene terminato.
            clearTimeout(timeoutId);
        };

    }, [
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