import { useState, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import api from "../api/axiosConfig";
import MonsterDetail from "../Components/MonsterDetail";
import { useNavigate } from "react-router-dom";

export default function MonsterPage() {

    const API_URL = `${import.meta.env.VITE_API_URL}/monster`;
    const navigate = useNavigate()

    const [monsters, setMonsters] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [monsterDetail, setMonsterDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [challengeRating, setChallengeRating] = useState("");

    const showFeatureButton = false;

    function getMonsters() {
        setLoading(true);
        setError("");

        api
            .get(`${API_URL}/getMonster`, {
                params: {
                    page: currentPage,
                    size: 20,
                    name: searchQuery || undefined,
                    challengeRating: challengeRating !== ""
                        ? Number(challengeRating)
                        : undefined
                }
            })
            .then((response) => {
                setMonsters(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero dei mostri:",
                    error
                );

                setError("Impossibile recuperare i mostri.");
            })
            .finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        getMonsters();
    }, [currentPage, searchQuery, challengeRating]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    useEffect(() => {
        setCurrentPage(0);
    }, [challengeRating]);

    function deleteMonster(monsterId) {

        const confirmed = window.confirm(
            "Vuoi davvero eliminare questo mostro?"
        );

        if (!confirmed) {
            return;
        }

        api
            .delete(`${API_URL}/deleteMonster/${monsterId}`)
            .then(() => {

                if (selectedMonster?.id === monsterId) {
                    setSelectedMonster(null);
                    setMonsterDetail(null);
                    setShowDetail(false);
                }

                getMonsters();
            })
            .catch((error) => {
                console.error(
                    "Errore durante la cancellazione:",
                    error
                );

                setError(
                    "Impossibile eliminare il mostro."
                );
            });
    }

    function getMonsterDetail(monsterId) {

        api
            .get(`${API_URL}/${monsterId}`)
            .then((response) => {
                setMonsterDetail(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero del dettaglio del mostro:",
                    error
                );

                setError(
                    "Impossibile recuperare il dettaglio del mostro."
                );
            });
    }

    useEffect(() => {

        if (!selectedMonster?.id) {
            return;
        }

        getMonsterDetail(selectedMonster.id);

    }, [selectedMonster]);

    const filteredMonsters = monsters.filter((monster) =>
        monster.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    if (loading) {

        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento mostri...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {

        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="container-fluid pb-5">

            <div className="d-flex justify-content-center mt-4">

                <div className="data-page">
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm me-2 border-3 fw-bold mb-2"
                        onClick={() => navigate("/admin")} >
                        ← Torna indietro
                    </button>

                    <PageHeader
                        name="Mostri"
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                        showFeatureButton={showFeatureButton}
                    />
                    <div className="row mt-3">
                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="challengeRating"
                                className="form-label fw-bold"
                            >
                                Grado di sfida
                            </label>

                            <select
                                id="challengeRating"
                                className="form-select"
                                style={{ width: "100px" }}
                                value={challengeRating}
                                onChange={(event) =>
                                    setChallengeRating(event.target.value)
                                }
                            >
                                <option value="">
                                    Tutti
                                </option>

                                <option value="0">0</option>
                                <option value="0.125">1/8</option>
                                <option value="0.25">1/4</option>
                                <option value="0.5">1/2</option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                            </select>

                        </div>
                    </div>

                    <div className="row justify-content-between">

                        <div
                            className={
                                showDetail
                                    ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                                    : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"
                            }
                        >

                            <PageSectionLeft
                                name={"Lista"}
                                navigateTo={"/admin/monster/create"}
                                item={filteredMonsters}
                                selectedItem={selectedMonster}
                                setSelectedItem={setSelectedMonster}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"mostro"}
                                deleteItem={deleteMonster}
                                editPath={(id) => `/admin/monster/modifica/${id}`}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />

                        </div>

                        <MonsterDetail
                            selectedMonster={monsterDetail}
                            setSelectedMonster={setSelectedMonster}
                            setShowDetail={setShowDetail}
                            setMonsterDetail={setMonsterDetail} />
                    </div>

                </div>

            </div>

        </div>
    );
}