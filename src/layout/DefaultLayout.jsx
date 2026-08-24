
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useCalendar } from "../context/CalendarContext";


export default function DefaultLayout() {

    const { displaySeason } = useCalendar()

    return (
        <div className={`season-${displaySeason}`}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>

    )
}