import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "../Components/PageHeader"
import api from "../api/axiosConfig";
import PageSectionLeft from "../Components/PageSectionLeft";
import { useEffect } from "react";
import WeaponDetail from "../Components/WeaponDetail";

export default function WeaponPage() {

    const API_URL = `${import.meta.env.VITE_API_URL}/items`;


    const [searchValue, setSearchValue] = useState()
    const [showDetail, setShowDetail] = useState()

    const navigate = useNavigate()

    const [itemData, setItemData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemDetail, setItemDetail] = useState(null)

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    function dataFatch() {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
            page: currentPage,
            size: 20
        });
        api
            .get(`${API_URL}/weapon?${params.toString()}`)
            .then((response) => {
                const data = response.data;
                setItemData(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei dati:", error);
                setError("Impossibile recuperare i dati.");
            })
            .finally(() => { setLoading(false); });
    }

    function FetchItemDetail(itemId) {
        api
            .get(`${API_URL}/${itemId}`)
            .then((response) => {
                setItemDetail(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero dei dati:",
                    error
                );

                setError(
                    "Impossibile recuperare i dati."
                );
            });
    }

    function deleteItem(id) {
        api
            .delete(`${API_URL}/${id}`)
            .then(() => {
                dataFatch()

                if (selectedItem?.id === id) {
                    setSelectedItem(null);
                    setShowDetail(false);
                }
            })
            .catch((error) => {
                console.error(
                    "Errore nell'eliminazione del oggetto:",
                    error
                );

                setError("Impossibile eliminare l'oggetto.");
            });
    }


    useEffect(() => {
        dataFatch();
        setSelectedItem(null);
        setShowDetail(false);
    }, [currentPage]);

    useEffect(() => {

        if (!selectedItem?.id) {
            return;
        }

        FetchItemDetail(selectedItem.id);

    }, [selectedItem]);



    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento Dati...
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
                        onClick={() => navigate("/dati-di-gioco/oggetti")}
                    >
                        ← Torna indietro
                    </button>
                    <PageHeader
                        name={"Lista Armi"}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                    />
                    <div className=" row justify-content-between ">
                        <div className={showDetail
                            ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                            : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"}>
                            <PageSectionLeft
                                name={"Lista Armi"}
                                navigateTo={"/dati-di-gioco/oggetti/aggiungi/arma"}
                                item={itemData}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                                setShowDetail={setShowDetail}
                                updateSlugLink={"armi"}
                                deleteItem={deleteItem}
                                editPath={(id) => `/dati-di-gioco/oggetti/modifica/arma/${id}`}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        <WeaponDetail
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            setShowDetail={setShowDetail}
                            setTalentDetail={setItemData}
                        />
                    </div>


                </div></div></div>
    )
}