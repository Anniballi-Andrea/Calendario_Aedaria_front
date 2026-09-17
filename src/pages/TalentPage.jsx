import { useState } from "react";
import api from "../api/axiosConfig";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";
import { useEffect } from "react";
import TalentDetail from "../Components/TalentDetail";

export default function TalentPage() {


    const API_URL = `${import.meta.env.VITE_API_URL}/talent`;

    const [talentData, setTalentData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTalent, setSelectedTalent] = useState(null)
    const [talentDetail, setTalentDetail] = useState(null);

    function getTalent() {
        setLoading(true);
        setError("");
        api
            .get(`${API_URL}/getTalent`)
            .then((response) => {
                const data = response.data;
                setTalentData(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei talenti:", error);
                setError("Impossibile recuperare i talenti.");
            })
            .finally(() => { setLoading(false); });
    }

    function getTalentDetail(talentId) {
        api
            .get(`${API_URL}/${talentId}`)
            .then((response) => {
                setTalentDetail(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero del dettaglio del talento:",
                    error
                );

                setError(
                    "Impossibile recuperare il dettaglio del talento."
                );
            });
    }

    useEffect(() => {
        getTalent()
        setSelectedTalent(null)
        setShowDetail(false)
    }, []);

    useEffect(() => {

        if (!selectedTalent?.id) {
            return;
        }

        getTalentDetail(selectedTalent.id);

    }, [selectedTalent]);

    function deleteSpecies(id) {
        api
            .delete(`${API_URL}/deleteSpecies/${id}`)
            .then(() => {
                getTalent();

                if (selectedTalent?.id === id) {
                    setSelectedTalent(null);
                    setShowDetail(false);
                }
            })
            .catch((error) => {
                console.error(
                    "Errore nell'eliminazione del talento:",
                    error
                );

                setError("Impossibile eliminare il talento.");
            });
    }

    const filteredTalents = talentData.filter((species) =>
        species.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento Specie...
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
                        name={"Lista talenti"}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                    />
                    <div className=" row justify-content-between ">
                        <div className={showDetail
                            ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                            : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"}>
                            <PageSectionLeft
                                name={"Lista"}
                                navigateTo={"/aggiungi-talento"}
                                item={filteredTalents}
                                selectedItem={selectedTalent}
                                setSelectedItem={setSelectedTalent}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"talenti"}
                                deleteItem={deleteSpecies}
                                editPath={(id) => `/talenti/modifica/${id}`}
                            />
                        </div>

                        <TalentDetail selectedItem={talentDetail} setShowDetail={setShowDetail} setSelectedItem={setSelectedTalent} />
                    </div>

                </div>
            </div>
        </div>
    )
}