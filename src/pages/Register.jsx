import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const API_URL = `${import.meta.env.VITE_API_URL}/auth/register`;

    const navigate = useNavigate();

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

            if (!response.ok) {

                if (response.status === 409) {
                    throw new Error(
                        "Username già utilizzato"
                    );
                }

                throw new Error(
                    `Registrazione fallita: HTTP ${response.status}`
                );
            }

            navigate("/login");

        } catch (error) {

            console.error("Errore registrazione:", error);

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4 mt-5">
                    <div className="data-page">

                        <h1 className="text-center mb-4">
                            Registrazione
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
                                {loading
                                    ? "Registrazione..."
                                    : "Registrati"}
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}