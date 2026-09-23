import { useAuth } from "../context/AuthContext";
import InitiativeInput from "./InitiativeImput";

export default function InitiativeCards({ name, player, editedPlayers, handlePlayerChange, changePlayer, openRemoveModal }) {

    const { isAdmin } = useAuth()

    return (
        <div className="row g-2 card-body align-items-end ">

            <div className="col-4 col-md-2 text-center d-flex align-items-center justify-content-center">

                <span className="fw-bold ">
                    {name}
                </span>

            </div>

            <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"initiative"} label={"Init"} />

            <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"dex"} label={"Dex"} />

            {isAdmin &&

                <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"priority"} label={"Priorità"} />

            }

            {
                isAdmin &&
                <div className="col-12 col-md-4  gap-2 justify-content-md-end d-none d-lg-flex">
                    <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={() => changePlayer(player)}
                    >
                        Salva
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => openRemoveModal(player)}
                    >
                        Rimuovi
                    </button>
                </div>
            }

        </div>
    )
}