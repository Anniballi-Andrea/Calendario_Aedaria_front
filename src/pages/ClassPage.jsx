import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import SubClassHeader from "../Components/SubClassHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";

export default function ClassPage() {

    const API_URL = "http://localhost:8080/api/class";
    const { slug } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSubClass, setSelectedSubClass] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null)
    const [showDetail, setShowDetail] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [selectedLevel, setSelectedLevel] = useState(null);

    const levels = Array.from(
        { length: 20 },
        (_, index) => index + 1
    );

    function getClass() {
        setLoading(true);
        setError("");
        axios
            .get(`${API_URL}/get-by-slug/${slug}`)
            .then((response) => {
                const data = response.data;
                setClassData(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero della classe:", error);
                setError("Impossibile recuperare la classe.");
            })
            .finally(() => { setLoading(false); });
    }



    useEffect(() => { getClass(); }, [slug]);

    function deleteSkill(skillId) {

        axios
            .delete(`${API_URL}/skills/delete/${skillId}`)
            .then(() => {

                // Ricarica la classe per aggiornare la lista delle skill
                getClass();

                // Se era selezionata la skill eliminata,
                // svuota il dettaglio
                if (selectedSkill?.id === skillId) {
                    setSelectedSkill(null);
                }

            })
            .catch((error) => {

                console.error(
                    "Errore nell'eliminazione dell'abilità:",
                    error
                );

                setError("Impossibile eliminare l'abilità.");

            });
    }

    const filteredSkills = classData?.skills?.filter((skill) => {

        const matchName = skill.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());

        const matchLevel =
            selectedLevel === null ||
            skill.level === selectedLevel;

        return matchName && matchLevel;
    }) || [];

    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento classe...
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

    if (!classData) {
        return null;
    }

    return (
        <div className="container-fluid pb-5">
            <div className="d-flex justify-content-center mt-4">
                <div className="data-page">
                    <PageHeader
                        name={classData.name}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        levels={levels}
                        showDetail={showDetail}
                    />
                    <div className=" row justify-content-between ">

                        <div className={showDetail
                            ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                            : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"}>

                            <SubClassHeader
                                selectedSubClass={selectedSubClass}
                                subClasses={classData.subClasses}
                            />

                            <PageSectionLeft
                                name={"Abilità"}
                                navigateTo={`/classe/${slug}/skill/nuova`}
                                item={filteredSkills}
                                selectedItem={selectedSkill}
                                setSelectedItem={setSelectedSkill}
                                setShowDetail={setShowDetail}
                                updateSlgLink={"skill"}
                                deleteItem={deleteSkill}
                                slug={slug} />
                        </div>

                        <PageSectionRight
                            selectedItem={selectedSkill}
                            setSelectedItem={setSelectedSkill}
                            setShowDetail={setShowDetail}
                            emptyMessage={"Nessuna abilità selezionata"} />
                    </div>

                </div>
            </div>
        </div>
    )
}