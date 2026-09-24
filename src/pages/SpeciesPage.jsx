import { useState } from "react";
import api from "../api/axiosConfig";
import { useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";
import { useNavigate } from "react-router-dom";

export default function SpeciesPage() {

    const API_URL = `${import.meta.env.VITE_API_URL}/species`;

    const [speciesData, setSpeciesData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState(null)
    const navigate = useNavigate()

    function getSpecies() {
        setLoading(true);
        setError("");
        api
            .get(`${API_URL}/getSpecies`)
            .then((response) => {
                const data = response.data;
                setSpeciesData(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero delle specie:", error);
                setError("Impossibile recuperare le specie.");
            })
            .finally(() => { setLoading(false); });
    }

    useEffect(() => {
        getSpecies()
        setSelectedSpecies(null)
        setShowDetail(false)
    }, []);

    function deleteSpecies(id) {
        api
            .delete(`${API_URL}/deleteSpecies/${id}`)
            .then(() => {
                getSpecies();

                if (selectedSpecies?.id === id) {
                    setSelectedSpecies(null);
                    setShowDetail(false);
                }
            })
            .catch((error) => {
                console.error(
                    "Errore nell'eliminazione della specie:",
                    error
                );

                setError("Impossibile eliminare la specie.");
            });
    }

    const filteredSpecies = speciesData.filter((species) =>
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
                    <button
                        type="button"
                        className="btn btn-outline-success border-3 fw-bold mb-2"
                        onClick={() => navigate("/dati-di-gioco")}
                    >
                        ← Torna indietro
                    </button>
                    <PageHeader
                        name={"Lista specie"}
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
                                navigateTo={"/aggiungi-specie"}
                                item={filteredSpecies}
                                selectedItem={selectedSpecies}
                                setSelectedItem={setSelectedSpecies}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"incantesimo"}
                                deleteItem={deleteSpecies}
                                editPath={(id) => `/specie/modifica/${id}`}
                            />
                        </div>

                        <PageSectionRight
                            selectedItem={selectedSpecies}
                            setSelectedItem={setSelectedSpecies}
                            setShowDetail={setShowDetail}
                            emptyMessage={"Nessuna Specie selezionata"} />

                    </div>

                </div>
            </div>
        </div>
    )

}