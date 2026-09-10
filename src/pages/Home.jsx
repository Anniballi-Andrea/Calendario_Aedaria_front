import Calendar from "../Components/Calendar";
import SurvivolPannel from "../Components/SurvivolPannel";
import { useAuth } from "../context/AuthContext";
import { useCalendar } from "../context/CalendarContext";


export default function Home() {

    const { isAdmin } = useAuth()

    const { displaySeason } = useCalendar()


    return (
        <div className={`container-fluid `}>
            <div className="row justify-content-center">
                {
                    isAdmin &&
                    <div className="col-4 d-none d-lg-block">
                        <SurvivolPannel />
                    </div>
                }

                <div className="col-12 col-lg-8">
                    <Calendar />
                </div>

            </div>

        </div>
    )
}