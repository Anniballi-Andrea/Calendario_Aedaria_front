import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const responseText = await response.text();

            console.log("Login URL:", API_URL);
            console.log("Login status:", response.status);
            console.log("Login response:", responseText);

            if (!response.ok) {
                throw new Error(
                    `Login fallito: HTTP ${response.status}`
                );
            }

            const data = JSON.parse(responseText);

            console.log("Login data:", data);

            login(data);

            navigate("/");

        } catch (error) {

            console.error("Errore login:", error);

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className=" col-12 col-md-6 col-lg-4 mt-5">
                    <div className="data-page">
                        <h1 className="text-center mb-4">
                            Login
                        </h1>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                />
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Accesso..." : "Accedi"}
                            </button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}