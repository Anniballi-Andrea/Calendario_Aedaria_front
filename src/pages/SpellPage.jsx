import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import api from "../api/axiosConfig";
import { useEffect } from "react";
import SpellDetail from "../Components/SpellDetail";


export default function SpellPage() {

    const API_URL = `${import.meta.env.VITE_API_URL}/spells`

    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [spellDetail, setSpellDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const showFeatureButton = false;

    const levels = Array.from(
        { length: 10 },
        (_, index) => index
    );

    function getSpells() {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
            page: currentPage,
            size: 20
        });

        if (searchQuery.trim() !== "") {
            params.append("name", searchQuery.trim());
        }

        if (selectedLevel !== null) {
            params.append("level", selectedLevel);
        }

        if (selectedClass !== null) {
            params.append("classId", selectedClass);
        }
        api
            .get(`${API_URL}/page?${params.toString()}`)
            .then((response) => {
                const data = response.data;

                setSpells(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero degli incantesimi:",
                    error
                );

                setError("Impossibile recuperare gli incantesimi.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue]);
    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery, selectedLevel, selectedClass]);

    useEffect(() => {
        getSpells();
    }, [currentPage, searchQuery, selectedLevel, selectedClass]);

    useEffect(() => {
        api
            .get(`${import.meta.env.VITE_API_URL}/class/get-all-summary`)
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero delle classi:",
                    error
                );

                setError(
                    "Impossibile recuperare gli incantesimi."
                );
            });
    }, []);



    function deleteSpell(spellId) {

        const confirmed = window.confirm(
            "Vuoi davvero eliminare questo incantesimo?"
        );

        if (!confirmed) {
            return;
        }

        api
            .delete(`${API_URL}/${spellId}`, {
            })
            .then(() => {

                if (selectedSpell?.id === spellId) {
                    setSelectedSpell(null);
                    setShowDetail(false);
                }

                getSpells();
            })
            .catch((error) => {
                console.error(
                    "Errore durante la cancellazione:",
                    error
                );

                setError(
                    "Impossibile eliminare l'incantesimo."
                );
            });
    }

    function getSpellDetail(spellId) {

        api
            .get(`${API_URL}/${spellId}`)
            .then((response) => {
                setSpellDetail(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero del dettaglio dell'incantesimo:",
                    error
                );

                setError(
                    "Impossibile recuperare il dettaglio dell'incantesimo."
                );
            });
    }
    useEffect(() => {

        if (!selectedSpell?.id) {
            return;
        }

        getSpellDetail(selectedSpell.id);

    }, [selectedSpell]);

    if (loading) {

        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento incantesimi...
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

                    <PageHeader
                        name="Incantesimi"
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        levels={levels}
                        showDetail={showDetail}
                        showFeatureButton={showFeatureButton}
                    />

                    <div className="dropdown">

                        <button
                            className="btn btn-primary dropdown-toggle mt-4"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {selectedClass === null
                                ? "Tutte le classi"
                                : classes.find(
                                    (dndClass) =>
                                        dndClass.id === selectedClass
                                )?.name
                            }
                        </button>

                        <ul className="dropdown-menu class-dropdown">

                            <li>
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => setSelectedClass(null)}
                                >
                                    Tutte le classi
                                </button>
                            </li>

                            {classes.map((dndClass) => (

                                <li key={dndClass.id}>

                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            setSelectedClass(dndClass.id)
                                        }
                                    >
                                        {dndClass.name}
                                    </button>

                                </li>

                            ))}

                        </ul>

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
                                navigateTo={"/aggiungi-incantesimo"}
                                item={spells}
                                selectedItem={selectedSpell}
                                setSelectedItem={setSelectedSpell}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"incantesimo"}
                                deleteItem={deleteSpell}
                                editPath={(id) => `/incantesimi/modifica/${id}`}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />

                        </div>

                        <SpellDetail
                            selectedSpell={spellDetail}
                            setSelectedSpell={setSelectedSpell}
                            setShowDetail={setShowDetail}
                            setSpellDetail={setSpellDetail} />

                    </div>

                </div>

            </div>

        </div>
    );
}