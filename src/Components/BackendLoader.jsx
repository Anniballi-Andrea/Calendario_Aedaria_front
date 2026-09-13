import { useEffect, useRef, useState } from "react";

import api from "../api/axiosConfig";
export default function BackendLoader({ children }) {

    const API_URL = `${import.meta.env.VITE_API_URL}/days/get`;

    // MODIFICA: cooldown massimo previsto per il risveglio del backend.
    const COOLDOWN_SECONDS = 65;

    const [backendReady, setBackendReady] = useState(false);
    const [countdown, setCountdown] = useState(COOLDOWN_SECONDS);

    const slowRequest = useRef(false);
    const backendResponse = useRef(false);

    useEffect(() => {

        const reloadPending =
            sessionStorage.getItem("backendWakeupReload");

        if (reloadPending === "true") {

            sessionStorage.removeItem("backendWakeupReload");

            setBackendReady(true);

            return;
        }

        // MODIFICA: avvia il conto alla rovescia indipendentemente
        // dalla velocità di risposta del backend.
        const countdownInterval = setInterval(() => {

            setCountdown((previous) => {

                if (previous <= 1) {

                    clearInterval(countdownInterval);

                    return 0;
                }

                return previous - 1;

            });

        }, 1000);

        // MODIFICA: controlla se la richiesta supera i 3 secondi
        // per capire se Render sta effettuando il risveglio.
        const slowRequestTimer = setTimeout(() => {

            slowRequest.current = true;

        }, 3000);

        api
            .get(API_URL)
            .then(() => {

                clearTimeout(slowRequestTimer);

                backendResponse.current = true;

                // Se il backend ha impiegato più di 3 secondi,
                // manteniamo il comportamento di reload già presente.
                if (slowRequest.current) {

                    sessionStorage.setItem(
                        "backendWakeupReload",
                        "true"
                    );

                    window.location.reload();

                    return;
                }

                // MODIFICA: se il backend risponde prima della fine
                // del cooldown, aspettiamo che il conto alla rovescia termini.
                if (countdown === 0) {

                    setBackendReady(true);

                }

            })
            .catch((error) => {

                clearTimeout(slowRequestTimer);
                clearInterval(countdownInterval);

                console.error(
                    "Backend non raggiungibile:",
                    error
                );

            });

        return () => {

            clearTimeout(slowRequestTimer);
            clearInterval(countdownInterval);

        };

    }, []);

    // MODIFICA: quando il countdown arriva a zero e il backend
    // ha già risposto, l'applicazione può essere avviata.
    useEffect(() => {

        if (countdown === 0 && backendResponse.current) {

            setBackendReady(true);

        }

    }, [countdown]);

    if (!backendReady) {

        return (
            <div className="d-lg-flex justify-content-center mt-5">

                <div className="create-page text-center w-50 mt-5">

                    <h1>
                        Aedaria
                    </h1>

                    <p>
                        Il regno si sta risvegliando...
                    </p>

                    {/* MODIFICA: mostra il tempo rimanente del cooldown. */}
                    <p>
                        Avvio dell'applicazione tra{" "}
                        <strong>{countdown}</strong> secondi...
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