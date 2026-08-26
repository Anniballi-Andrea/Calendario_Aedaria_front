import InitiativeInput from "./InitiativeImput";

export default function InitiativeCards({ name, player, editedPlayers, handlePlayerChange, changePlayer, openRemoveModal }) {

    return (
        <div className="row g-2 card-body align-items-end">

            <div className="col-12 col-md-2">
                <div className="player-name-wrapper">
                    <span className="fw-bold">
                        {name}
                    </span>
                </div>
            </div>

            <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"initiative"} label={"Init"} />

            <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"dex"} label={"Dex"} />

            <InitiativeInput player={player} editedPlayers={editedPlayers} handlePlayerChange={handlePlayerChange} field={"priority"} label={"Priorità"} />

            <div className="col-12 col-md-4 d-flex gap-2 justify-content-md-end">
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

        </div>
    )
}