import { useState } from "react";

export default function AccountDataChange({ setError, setSuccess }) {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);


    const handleEmailSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoadingEmail(true);

        try {

            setSuccess("Email modificata correttamente.");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoadingEmail(false);
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Le password non coincidono.");
            return;
        }

        setLoadingPassword(true);

        try {

            setNewPassword("");
            setConfirmPassword("");

            setSuccess("Password modificata correttamente.");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoadingPassword(false);
        }
    };

    return (
        <div className="mb-5 data-page">

            <div className="mb-4">
                <h3 className="fw-bold mb-1">
                    Sicurezza
                </h3>

                <p className="text-muted mb-0 bg-s fw-bold">
                    Gestisci email e password del tuo account.
                </p>
            </div>


            <div className="row g-4">

                <div className="col-md-6">

                    <div className="card shadow-sm h-100">

                        <div className="card-header bg-transparent py-3">
                            <h5 className="mb-0">
                                Modifica email
                            </h5>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleEmailSubmit}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Nuova email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loadingEmail}
                                >
                                    {loadingEmail
                                        ? "Salvataggio..."
                                        : "Modifica email"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow-sm h-100">

                        <div className="card-header bg-transparent py-3">
                            <h5 className="mb-0">
                                Cambia password
                            </h5>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handlePasswordSubmit}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="newPassword"
                                        className="form-label"
                                    >
                                        Nuova password
                                    </label>

                                    <input
                                        id="newPassword"
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(event) =>
                                            setNewPassword(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <div className="mb-3">

                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Conferma nuova password
                                    </label>

                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loadingPassword}
                                >
                                    {loadingPassword
                                        ? "Modifica..."
                                        : "Cambia password"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}