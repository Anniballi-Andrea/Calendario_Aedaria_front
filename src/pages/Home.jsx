import Calendar from "../Components/Calendar";
import SurvivolPannel from "../Components/SurvivolPannel";
import { useCalendar } from "../context/CalendarContext";

export default function Home() {
    const { displaySeason } = useCalendar()
    return (
        <div className={`container-fluid season-${displaySeason}`}>
            <div className="row">
                <div className="col-4 d-none d-lg-block">
                    <SurvivolPannel />
                </div>
                <div className="col-12 col-lg-8">
                    <Calendar />
                </div>
            </div>

        </div>
    )
}