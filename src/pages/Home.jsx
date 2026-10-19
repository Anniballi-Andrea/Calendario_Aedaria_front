import BackendLoader from "../Components/BackendLoader";
import Calendar from "../Components/Calendar";
import SurvivolPannel from "../Components/SurvivolPannel";
import { useAuth } from "../context/AuthContext";
import { useResource } from "../context/ResourceContext";

export default function Home() {


    const { isMaster } = useResource()

    return (
        <div className={`container-fluid `}>
            <div className="row justify-content-center">
                {
                    isMaster &&
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