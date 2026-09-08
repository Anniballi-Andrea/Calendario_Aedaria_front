import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";

export default function ClassFeaturePage() {

    const { slug } = useParams();
    const featureName = slug === "warlock" ? "Suppliche Occulte" : slug === "stregone" ? "Metamagia" : slug === "guerriero" ? "Tattiche" : null;

    const API_URL = `${import.meta.env.VITE_API_URL}/class-features`;

    const [feature, setFeature] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const showFeatureButton = false;

    function getFeatures() {
        setLoading(true);
        setError("");

        axios
            .get(`${API_URL}/by-class/${slug}`)
            .then((response) => {
                const data = response.data;
                setFeature(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero delle feature di classe:", error);
                setError("Impossibile recuperare le feature di classe.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getFeatures();
    }, [slug]);


    const filteredFeatures = feature.filter((feature) => {
        const matchName = feature.name.toLowerCase().includes(searchValue.toLowerCase());
        return matchName;
    })

    function deleteFeature(id) {
        const confirmed = window.confirm("Sei sicuro di voler eliminare questa feature di classe?");
        if (!confirmed) {
            return;
        }

        axios
            .delete(`${API_URL}/delete/${id}`)
            .then(() => {
                if (selectedFeature?.id === id) {
                    setSelectedFeature(null);
                    setShowDetail(false);
                }
                getFeatures();
            })
            .catch((error) => {
                console.error("Errore nell'eliminazione della feature di classe:", error);
                setError("Impossibile eliminare la feature di classe.");
            });
    }

    if (loading) {

        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            {`Caricamento ${featureName}...`}
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
                        name={featureName}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                        slug={slug}
                        showFeatureButton={showFeatureButton} />

                    <div className="row justify-content-between">

                        <div
                            className={
                                showDetail
                                    ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                                    : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"}>

                            <PageSectionLeft
                                name={"Lista"}
                                navigateTo={`/classe/${slug}/feature/aggiungi-feature`}
                                item={filteredFeatures}
                                selectedItem={selectedFeature}
                                setSelectedItem={setSelectedFeature}
                                setShowDetail={setShowDetail}
                                deleteItem={deleteFeature}
                                slug={slug}
                                updateSlugLink={"feature"}
                            />

                        </div>
                        <PageSectionRight
                            selectedItem={selectedFeature}
                            setSelectedItem={setSelectedFeature}
                            setShowDetail={setShowDetail}
                            emptyMessage={`Seleziona un opzione per visualizzarne i dettagli.`}
                        />

                    </div>

                </div>

            </div>

        </div>


    )


}