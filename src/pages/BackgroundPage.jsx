import { useState } from "react";
import api from "../api/axiosConfig";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import { useEffect } from "react";
import BackgroundDetail from "../Components/BackgroundDetail";
import { useResource } from "../context/ResourceContext";
import { useNavigate } from "react-router-dom";

export default function BackgroundPage() {

    const { handbooks } = useResource()

    const API_URL = `${import.meta.env.VITE_API_URL}/background`;

    const [backgroundData, setBackgroundData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedBackground, setSelectedBackground] = useState(null)
    const [backgroundDetail, setBackgroundDetail] = useState(null)
    const [selectedHandbooks, setSelectedHandbooks] = useState([]);
    const navigate = useNavigate()

    function handleHandbookChange(handbook) {
        setSelectedHandbooks((current) =>
            current.includes(handbook)
                ? current.filter((item) => item !== handbook)
                : [...current, handbook]
        );
    }

    function getData() {
        setLoading(true);
        setError("");
        api
            .get(`${API_URL}/get`)
            .then((response) => {
                const data = response.data;
                setBackgroundData(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei Background:", error);
                setError("Impossibile recuperare i Background.");
            })
            .finally(() => { setLoading(false); });
    }

    function getDetail(id) {
        api
            .get(`${API_URL}/get/${id}`)
            .then((response) => {
                setBackgroundDetail(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero del dettaglio del Background:",
                    error
                );

                setError(
                    "Impossibile recuperare il dettaglio del Background."
                );
            });
    }

    useEffect(() => {
        getData()
        setSelectedBackground(null)
        setShowDetail(false)
    }, []);

    useEffect(() => {

        if (!selectedBackground?.id) {
            return;
        }

        getDetail(selectedBackground.id);

    }, [selectedBackground]);

    function deleteItem(id) {
        api
            .delete(`${API_URL}/delete/${id}`)
            .then(() => {
                getData();

                if (selectedBackground?.id === id) {
                    setSelectedBackground(null);
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

    const filteredBackgrounds = backgroundData.filter((items) => {
        const matchesSearch = items.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());

        const matchesHandbook =
            selectedHandbooks.length === 0 ||
            selectedHandbooks.includes(items.handbook);

        return matchesSearch && matchesHandbook;
    });

    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento...
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
                        name={"Lista background"}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                        handbooks={handbooks}
                        selectedHandbooks={selectedHandbooks}
                        handleHandbookChange={handleHandbookChange}
                    />
                    <div className=" row justify-content-between ">
                        <div className={showDetail
                            ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                            : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"}>
                            <PageSectionLeft
                                name={"Lista"}
                                navigateTo={"/aggiungi-background"}
                                item={filteredBackgrounds}
                                selectedItem={selectedBackground}
                                setSelectedItem={setSelectedBackground}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"background"}
                                deleteItem={deleteItem}
                                editPath={(id) => `/background/modifica/${id}`}
                            />
                        </div>

                        <BackgroundDetail
                            selectedItem={backgroundDetail}
                            setShowDetail={setShowDetail}
                            setSelectedItem={setSelectedBackground}
                            setBackgroundDetail={setBackgroundDetail} />
                    </div>

                </div>
            </div>
        </div>
    )
}