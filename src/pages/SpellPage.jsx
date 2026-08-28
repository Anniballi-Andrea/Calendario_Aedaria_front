
import axios from "axios";
import { useEffect, useState } from "react";
import SpellPageHeader from "../Components/SpellPageHeader";
import SpellPageList from "../Components/SpellPageList";
import SpellPageDetail from "../Components/SpellPageDetail";

export default function SpellPage() {

    const API_URL = "http://localhost:8080/api/spells";

    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);

    const [search, setSearch] = useState("");
    const [level, setLevel] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDetail, setShowDetail] = useState(false);


    // Recupera gli incantesimi dal backend
    function getSpells() {

        setLoading(true);
        setError("");

        if (search.trim() !== "") {

            const params = {
                name: search.trim()
            };

            if (level !== null) {
                params.level = level;
            }

            axios
                .get(`${API_URL}/search`, {
                    params: params
                })
                .then((response) => {

                    const data = response.data;

                    setSpells(data);

                })
                .catch((error) => {

                    console.error("Errore nel recupero degli incantesimi:", error);
                    setError("Impossibile recuperare gli incantesimi.");

                })
                .finally(() => {

                    setLoading(false);

                });

            return;
        }


        if (level !== null) {

            axios
                .get(`${API_URL}/level/${level}`)
                .then((response) => {

                    const data = response.data;

                    setSpells(data);

                })
                .catch((error) => {

                    console.error("Errore nel recupero degli incantesimi:", error);
                    setError("Impossibile recuperare gli incantesimi.");

                })
                .finally(() => {

                    setLoading(false);

                });

            return;
        }


        axios
            .get(API_URL)
            .then((response) => {

                const data = response.data;

                setSpells(data);

            })
            .catch((error) => {

                console.error("Errore nel recupero degli incantesimi:", error);
                setError("Impossibile recuperare gli incantesimi.");

            })
            .finally(() => {

                setLoading(false);

            });

    }


    // Recupera gli incantesimi all'avvio e quando cambiano ricerca/livello
    useEffect(() => {

        getSpells();

    }, [search, level]);


    // Recupera il dettaglio di un incantesimo
    function selectSpell(id) {

        axios
            .get(`${API_URL}/${id}`)
            .then((response) => {

                const data = response.data;

                setSelectedSpell(data);
                setShowDetail(true);

            })
            .catch((error) => {

                console.error(
                    "Errore nel recupero dell'incantesimo:",
                    error
                );

                setError("Impossibile recuperare l'incantesimo.");

            });

    }


    // Elimina l'incantesimo selezionato
    function deleteSpell() {

        if (!selectedSpell) {
            return;
        }

        const confirmed = window.confirm(
            `Vuoi davvero eliminare "${selectedSpell.name}"?`
        );

        if (!confirmed) {
            return;
        }

        axios
            .delete(`${API_URL}/${selectedSpell.id}`)
            .then(() => {

                setSelectedSpell(null);
                setShowDetail(false);

                getSpells();

            })
            .catch((error) => {

                console.error(
                    "Errore durante la cancellazione:",
                    error
                );

                setError("Impossibile eliminare l'incantesimo.");

            });

    }


    // Raggruppa gli incantesimi per livello
    function getSpellsByLevel() {

        return spells.reduce((groups, spell) => {

            if (!groups[spell.level]) {
                groups[spell.level] = [];
            }

            groups[spell.level].push(spell);

            return groups;

        }, {});

    }


    const spellsByLevel = getSpellsByLevel();

    return (
        <div className="container-fluid pb-5">
            <div className="d-flex justify-content-center mt-4">
                <div className="data-page">

                    {/* HEADER */}
                    <SpellPageHeader search={search} setSearch={setSearch} level={level} setLevel={setLevel} />

                    {/* CONTENUTO */}
                    <div className="data-page-content">

                        {/* LISTA */}
                        <SpellPageList
                            showDetail={showDetail}
                            loading={loading}
                            error={error}
                            spells={spells}
                            spellsByLevel={spellsByLevel}
                            selectedSpell={selectedSpell}
                            selectSpell={selectSpell}
                        />

                        {/* DETTAGLIO */}
                        <SpellPageDetail
                            showDetail={showDetail}
                            selectedSpell={selectedSpell}
                            deleteSpell={deleteSpell}
                            setSelectedSpell={setSelectedSpell}
                            setShowDetail={setShowDetail}
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}