import PageCard from "../Components/PageCard";
import api from "../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { useCalendar } from "../context/CalendarContext";

export default function ClassListPage() {

    const { classLoader } = useCalendar()

    const API_URL = `${import.meta.env.VITE_API_URL}/class`;

    const [classes, setClasses] = useState([])

    useEffect(() => {

        api
            .get(`${API_URL}/get-all-summary`)
            .then(response => {
                setClasses(response.data)
            })
            .catch(error => {
                console.error("Errore nel recupero delle classi:", error)
            })

    }, [classLoader])

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5">
                {classes && classes.map((classItem) => (
                    <PageCard key={classItem.id} pageName={classItem.name} navigateTo={`/classe/${classItem.slug}`} img={`/img/${classItem.slug}.jpg`} alt={"none"} />
                ))}
            </div>
        </div>
    )
}