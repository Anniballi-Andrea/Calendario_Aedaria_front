import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function getUsernameFromToken() {

    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub;
    } catch {
        return null;
    }
}

export default function SessionTest() {

    const API_URL = `${import.meta.env.VITE_API_URL}/session`;

    const [sessionName, setSessionName] = useState("");
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState("");

    const username = getUsernameFromToken();

    useEffect(() => {
        loadSessions();
    }, []);

    function loadSessions() {

        api
            .get(`${API_URL}/my`)
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function createSession() {

        const session = {
            name: sessionName
        };

        api
            .post(`${API_URL}/create`, session)
            .then(() => {
                setSessionName("");
                loadSessions();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function inviteUser(sessionId) {

        const invitedUsername = window.prompt(
            "Inserisci lo username dell'utente da invitare:"
        );

        if (!invitedUsername) {
            return;
        }

        api
            .post(`${API_URL}/${sessionId}/invite`, null, {
                params: {
                    username: invitedUsername
                }
            })
            .then(() => {
                alert("Utente aggiunto alla sessione.");
                loadSessions()
            })
            .catch((error) => {
                console.error(error);

                alert(
                    error.response?.data?.message ||
                    "Impossibile aggiungere l'utente alla sessione."
                );
            });
    }

    return (
        <div className="container mt-4 data-page">

            <h2 className="mb-4">
                Test Sessioni
            </h2>

            <div className="mb-4">

                <label className="form-label">
                    Nome sessione
                </label>

                <div className="d-flex gap-2">

                    <input
                        type="text"
                        className="form-control"
                        value={sessionName}
                        onChange={(event) => setSessionName(event.target.value)}
                        placeholder="Nome della sessione"
                    />

                    <button
                        className="btn btn-primary"
                        onClick={createSession}
                    >
                        Crea
                    </button>

                </div>

            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <h3>
                Le mie sessioni
            </h3>

            {sessions.length === 0 ? (

                <p>
                    Non appartieni ancora a nessuna sessione.
                </p>

            ) : (

                <div className="list-group">

                    {sessions.map((session) => {

                        const isMaster =
                            session.master?.username === username;

                        return (
                            <div
                                key={session.id}
                                className="list-group-item"
                            >

                                <strong>
                                    {session.name}
                                </strong>

                                <div>
                                    ID: {session.id}
                                </div>

                                <div>
                                    Master: {session.master?.username}
                                </div>
                                <div>
                                    giocatori:
                                    <ul>
                                        {session.members.map((membro) => (
                                            membro.role === "PLAYER" && (
                                                <li>{membro.user.username}</li>
                                            )

                                        ))}
                                    </ul>

                                </div>

                                {isMaster && (
                                    <button
                                        className="btn btn-success mt-2"
                                        onClick={() => inviteUser(session.id)}
                                    >
                                        Invita giocatore
                                    </button>
                                )}

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}