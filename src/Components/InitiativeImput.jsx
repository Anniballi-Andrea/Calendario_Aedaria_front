export default function InitiativeInput({
    player,
    editedPlayers,
    handlePlayerChange,
    field,
    label,
    type = "number"
}) {

    return (
        <div className="col-4 col-md-2 d-none d-lg-block">
            <label
                htmlFor={`${field}-${player.id}`}
                className="form-label mb-1"
            >
                {label}
            </label>

            <input
                id={`${field}-${player.id}`}
                type={type}
                className="form-control"
                value={
                    editedPlayers[player.id]?.[field] ??
                    player[field]
                }
                onChange={event =>
                    handlePlayerChange(
                        player.id,
                        field,
                        event.target.value
                    )
                }
            />
        </div>
    )
}