import { useEffect, useState } from "react";

import api from "../api/axiosConfig";

export default function UsersPage() {
    const API_URL = `${import.meta.env.VITE_API_URL}/users`;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10;


    useEffect(() => {
        const timeout = setTimeout(() => {

            console.log("Chiamata utenti:", {
                page: currentPage,
                size: pageSize,
                username: searchTerm
            });
            setLoading(true);
            setError("");

            api.get(`${API_URL}/getUsers`, {
                params: {
                    page: currentPage,
                    size: pageSize,
                    username: searchTerm
                }
            })
                .then((response) => {

                    setUsers(response.data.content);
                    setTotalPages(response.data.totalPages);
                })
                .catch((error) => {

                    console.error("Errore nel recupero degli utenti:", error);

                    setError("Impossibile recuperare gli utenti.");
                })
                .finally(() => {

                    setLoading(false);
                });

        }, 400);
        return () => clearTimeout(timeout);

    }, [currentPage, searchTerm]);



    const changeRole = (userId, roleId) => {

        api.put(`${API_URL}/changeRole`, null, {
            params: {
                userId: userId,
                roleId: roleId
            }
        })
            .then(() => {

                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user.id === userId
                            ? { ...user, role: roleId }
                            : user
                    )
                );
            })
            .catch((error) => {

                console.error("Errore nel cambio ruolo:", error);

                setError("Impossibile modificare il ruolo dell'utente.");
            });
    };

    const previousPage = () => {

        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {

        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };


    const handleSearchChange = (event) => {

        const value = event.target.value;

        console.log("Ricerca:", value); // MODIFICA: verifica che l'input venga intercettato

        setSearchTerm(value);
        setCurrentPage(0);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <p>Caricamento utenti...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 ">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 data-page mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="text-center">Utenti</h2>
                        </div>
                        <div className="">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cerca utente..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>


                    {users.length === 0 ? (
                        <p>Nessun utente trovato.</p>
                    ) : (
                        <div className="table-responsive">

                            <table className="table table-striped table-hover w-50 mx-auto">

                                <thead>
                                    <tr>

                                        <th>Username</th>
                                        <th>Ruolo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>

                                            <td>{user.username}</td>
                                            <td>
                                                <select
                                                    className="form-select w-50"
                                                    value={user.role}
                                                    onChange={(event) =>
                                                        changeRole(
                                                            user.id,
                                                            Number(event.target.value)
                                                        )
                                                    }
                                                >
                                                    <option value={1}>
                                                        ADMIN
                                                    </option>

                                                    <option value={2}>
                                                        USER
                                                    </option>

                                                </select>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    )}

                    {totalPages > 1 && (

                        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

                            <button
                                className="btn btn-secondary"
                                onClick={previousPage}
                                disabled={currentPage === 0}
                            >
                                Precedente
                            </button>

                            <span>
                                Pagina {currentPage + 1} di {totalPages}
                            </span>

                            <button
                                className="btn btn-secondary"
                                onClick={nextPage}
                                disabled={currentPage === totalPages - 1}
                            >
                                Successiva
                            </button>

                        </div>

                    )}

                </div>
            </div>

        </div>
    );
}