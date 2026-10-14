import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import JumboUser from "../Components/JumboUser";
import SessionCardBody from "../Components/SessionCardBody";
import SessionCardHeader from "../Components/SessionCardHeader";
import AccountData from "./AccountData";
import AccountDataChange from "../Components/AccountDataChange";
import AccountManager from "./AccountManager";
import SessionDataCard from "../Components/SessionDataCard";

export default function Profile() {

    const API_URL = `${import.meta.env.VITE_API_URL}/session`;
    const { username, role, logout } = useAuth();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [sessions, setSessions] = useState([]);

    const [selectedSession, setSelectedSession] = useState(null);
    const [loadingAction, setLoadingAction] = useState(false);

    const createSession = () => {

        const sessionName = window.prompt(
            "Inserisci il nome della sessione:"
        );

        if (!sessionName || sessionName.trim() === "") {
            return;
        }

        const session = {
            name: sessionName.trim()
        };

        api
            .post(`${API_URL}/create`, session)
            .then(() => {
                loadSessions();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function loadSessions() {

        api
            .get(`${API_URL}/my`)
            .then((response) => {
                const updatedSessions = response.data;

                setSessions(updatedSessions);

                setSelectedSession((currentSession) => {

                    if (!currentSession) {
                        return null;
                    }

                    return updatedSessions.find(
                        (session) => session.id === currentSession.id
                    ) || null;
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const openSession = (session) => {
        setSelectedSession(session)
    }

    const closeSession = () => {
        setSelectedSession(null);
    }


    useEffect(() => {
        loadSessions();
    }, []);

    return (
        <div className="container py-5 ">

            <JumboUser username={username} role={role} />
            <div className="row justify-content-around">
                <div className="  data-page-col col-md-6 mb-3">
                    <div className="card shadow-sm mb-2 ">
                        <SessionCardHeader createSession={createSession} />
                        <SessionCardBody sessions={sessions} createSession={createSession} openSession={openSession} />

                    </div>
                </div>
                <div className="data-page-col col-md-5 mb-3">
                    <AccountData username={username} role={role} />
                </div>
            </div>

            {error && (
                <div
                    className="alert alert-danger alert-dismissible"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {success && (
                <div
                    className="alert alert-success alert-dismissible"
                    role="alert"
                >
                    {success}
                </div>
            )}

            <AccountDataChange setError={setError} setSuccess={setSuccess} />

            <AccountManager logout={logout} />

            {selectedSession && (
                <SessionDataCard
                    selectedSession={selectedSession}
                    closeSession={closeSession}
                    API_URL={API_URL}
                    username={username}
                    loadingAction={loadingAction}
                    setLoadingAction={setLoadingAction}
                    setSelectedSession={setSelectedSession}
                    setError={setError}
                    loadSessions={loadSessions}
                    sessions={sessions} />
            )}
        </div>
    )

}