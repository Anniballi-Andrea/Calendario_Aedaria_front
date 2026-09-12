import { useEffect, useRef, useState } from "react";

import api from "../api/api";

export default function BackendLoader({ children }) {

    const API_URL = `${import.meta.env.VITE_API_URL}/days/get`;

    const [backendReady, setBackendReady] = useState(false);

    const slowRequest = useRef(false);

    useEffect(() => {

        const reloadPending =
            sessionStorage.getItem("backendWakeupReload");
        if (reloadPending === "true") {

            sessionStorage.removeItem("backendWakeupReload");

            setBackendReady(true);

            return;
        }
        const slowRequestTimer = setTimeout(() => {

            slowRequest.current = true;

        }, 3000);

        api

            .get(API_URL)

            .then(() => {

                clearTimeout(slowRequestTimer);
                if (slowRequest.current) {

                    sessionStorage.setItem(
                        "backendWakeupReload",
                        "true"
                    );

                    window.location.reload();

                    return;
                }

                setBackendReady(true);

            })

            .catch((error) => {

                clearTimeout(slowRequestTimer);

                console.error(
                    "Backend non raggiungibile:",
                    error
                );

            });

        return () => {

            clearTimeout(slowRequestTimer);

        };

    }, []);

    if (!backendReady) {

        return (
            <div className="backend-loader">

                <h1>
                    Aedaria
                </h1>

                <p>
                    Il regno si sta risvegliando...
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
        );
    }
    return children;
}