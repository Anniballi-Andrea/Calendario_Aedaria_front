import { useEffect, useRef, useState } from "react";

import api from "../api/axiosConfig";

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

        const savedResponseTime =
            sessionStorage.getItem("backendResponseTime");

        const waitTime = savedResponseTime
            ? Number(savedResponseTime) + 1000
            : 3000;

        const requestStart = performance.now();

        const slowRequestTimer = setTimeout(() => {

            slowRequest.current = true;

        }, waitTime);

        api

            .get(API_URL)

            .then(() => {

                clearTimeout(slowRequestTimer);


                const requestEnd = performance.now();
                const responseTime = requestEnd - requestStart;

                console.log(
                    `Backend raggiunto in ${responseTime.toFixed(0)} ms`
                );

                sessionStorage.setItem(
                    "backendResponseTime",
                    responseTime.toString()
                );

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

                const requestEnd = performance.now();
                const responseTime = requestEnd - requestStart;

                console.error(
                    `Backend non raggiungibile dopo ${responseTime.toFixed(0)} ms:`,
                    error
                );

            });

        return () => {

            clearTimeout(slowRequestTimer);

        };

    }, []);


    if (!backendReady) {

        return (
            <div className="d-flex justify-content-center mt-5">

                <div className="create-page text-center w-50 mt-5">
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


            </div>
        );
    }
    return children;
}