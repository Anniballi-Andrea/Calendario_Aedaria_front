import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";
import axios from "axios";
import { useEffect } from "react";
import SpellDetail from "../Components/SpellDetail";

export default function PageTest() {
    const API_URL = "http://localhost:8080/api/spells";

    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);

    const levels = Array.from(
        { length: 10 },
        (_, index) => index
    );

    // Recupera gli incantesimi dal backend
    function getSpells() {
        setLoading(true);
        setError("");

        axios
            .get(API_URL)
            .then((response) => {
                const data = response.data;
                setSpells(data);
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
        getSpells();
    }, []);

    const filteredSpells = spells.filter((spell) => {

        const matchName = spell.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());

        const matchLevel =
            selectedLevel === null ||
            spell.level === selectedLevel;

        return matchName && matchLevel;
    });

    // Recupera il dettaglio di un incantesimo

    // Elimina l'incantesimo selezionato
    function deleteSpell(spellId) {

        const confirmed = window.confirm(
            "Vuoi davvero eliminare questo incantesimo?"
        );

        if (!confirmed) {
            return;
        }

        axios
            .delete(`${API_URL}/${spellId}`)
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
                    />

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
                                item={filteredSpells}
                                selectedItem={selectedSpell}
                                setSelectedItem={setSelectedSpell}
                                setShowDetail={setShowDetail}
                                updateSlgLink={"incantesimo"}
                                deleteItem={deleteSpell}
                                editPath={(id) => `/incantesimi/modifica/${id}`}
                            />

                        </div>

                        <SpellDetail
                            selectedSpell={selectedSpell}
                            setSelectedSpell={setSelectedSpell}
                            setShowDetail={setShowDetail} />

                    </div>

                </div>

            </div>

        </div>
    );
}