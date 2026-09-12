
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useCalendar } from "../context/CalendarContext";
import { useEffect } from "react";


export default function DefaultLayout() {

    const { displaySeason } = useCalendar()

    useEffect(() => {
        const seasonImages = [
            "/img/primavera.jpg",
            "/img/estate.jpg",
            "/img/autunno.jpg",
            "/img/inverno.jpg"
        ];

        seasonImages.forEach((imagePath) => {

            const image = new Image();

            image.src = imagePath;

        });

    }, []);

    return (
        <div className={`season-${displaySeason}`}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>

    )
}