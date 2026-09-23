import { useNavigate } from "react-router-dom";
import SafeHtml from "./SafeHtml";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function MonsterDetail({
    selectedMonster,
    setSelectedMonster,
    setShowDetail,
    setMonsterDetail
}) {

    const { isAdmin } = useAuth();
    const navigate = useNavigate()

    function deleteTrait(traitId) {

        if (!window.confirm("Vuoi eliminare questo tratto?")) {
            return;
        }

        api.delete(
            `${import.meta.env.VITE_API_URL}/trait/${traitId}`
        )
            .then(() => {
                setMonsterDetail({
                    ...selectedMonster,
                    traits: selectedMonster.traits.filter(
                        (trait) => trait.id !== traitId
                    )
                });
            })
            .catch((error) => {

                console.error(
                    "Errore nell'eliminazione del tratto:",
                    error
                );
            });
    }

    function deleteAction(actionId) {

        if (!window.confirm("Vuoi eliminare questa azione?")) {
            return;
        }

        api.delete(
            `${import.meta.env.VITE_API_URL}/action/${actionId}`
        )
            .then(() => {

                setMonsterDetail({
                    ...selectedMonster,
                    actions: selectedMonster.actions.filter(
                        (action) => action.id !== actionId
                    )
                });
            })
            .catch((error) => {

                console.error(
                    "Errore nell'eliminazione dell'azione:",
                    error
                );
            });
    }
    function deleteBonusAction(bonusActionId) {

        if (!window.confirm("Vuoi eliminare questa azione bonus?")) {
            return;
        }

        api.delete(
            `${import.meta.env.VITE_API_URL}/bonus-action/${bonusActionId}`
        )
            .then(() => {


                setMonsterDetail({
                    ...selectedMonster,
                    bonusActions: selectedMonster.bonusActions.filter(
                        (bonusAction) =>
                            bonusAction.id !== bonusActionId
                    )
                });
            })
            .catch((error) => {

                console.error(
                    "Errore nell'eliminazione dell'azione bonus:",
                    error
                );
            });
    }



    if (!selectedMonster) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7 mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 card mt-3">

                    <div className="card-header text-center position-relative">

                        <h5>
                            {selectedMonster.name}
                        </h5>

                        <div>
                            {selectedMonster.size && (
                                <span className="badge text-bg-primary">
                                    {selectedMonster.size}
                                </span>
                            )}

                            {selectedMonster.type && (
                                <span className="badge text-bg-secondary ms-2">
                                    {selectedMonster.type}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            className="btn btn-close position-absolute top-0 end-0 m-2"
                            onClick={() => {
                                setShowDetail(false);
                                setSelectedMonster(null);
                                setMonsterDetail(null);
                            }}
                            aria-label="Chiudi"
                        />

                    </div>

                    <div className="card-body left-item-vh mb-3">

                        <div className="row">

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Classe Armatura:</strong>
                                <div>{selectedMonster.armorClass}</div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Punti Ferita:</strong>
                                <div>{selectedMonster.lifePoint}</div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Movimento:</strong>
                                <div>{selectedMonster.moviment}</div>
                            </div>

                            <div className="col-12 col-md-6 col-xxl-3 mt-2">
                                <strong>Grado di Sfida:</strong>
                                <div>{selectedMonster.challengeRating}</div>
                            </div>

                        </div>

                        <hr />

                        <strong>Caratteristiche:</strong>

                        <div className="row">

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Forza:</strong>
                                <div>{selectedMonster.strength}</div>
                            </div>

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Destrezza:</strong>
                                <div>{selectedMonster.dexterity}</div>
                            </div>

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Costituzione:</strong>
                                <div>{selectedMonster.constitution}</div>
                            </div>

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Intelligenza:</strong>
                                <div>{selectedMonster.intelligence}</div>
                            </div>

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Saggezza:</strong>
                                <div>{selectedMonster.wisdom}</div>
                            </div>

                            <div className="col-6 col-md-4 mt-2">
                                <strong>Carisma:</strong>
                                <div>{selectedMonster.charisma}</div>
                            </div>

                        </div>

                        <hr />

                        <div className="row">

                            {selectedMonster.initiative !== null &&
                                selectedMonster.initiative !== undefined && (
                                    <div className="col-12 col-md-6 mt-2">
                                        <strong>Iniziativa:</strong>
                                        <div>{selectedMonster.initiative}</div>
                                    </div>
                                )}

                            {selectedMonster.savingThrow && (
                                <div className="col-12 col-md-6 mt-2">
                                    <strong>Tiri salvezza:</strong>
                                    <div>{selectedMonster.savingThrow}</div>
                                </div>
                            )}

                        </div>

                        {selectedMonster.sense && (
                            <>
                                <hr />

                                <strong>Sensi:</strong>
                                <p>
                                    {selectedMonster.sense}
                                </p>
                            </>
                        )}

                        {selectedMonster.skills && (
                            <>
                                <hr />

                                <strong>Abilità:</strong>
                                <p>
                                    {selectedMonster.skills}
                                </p>
                            </>
                        )}

                        {selectedMonster.immunity && (
                            <>
                                <hr />

                                <strong>Immunità:</strong>
                                <p>
                                    {selectedMonster.immunity}
                                </p>
                            </>
                        )}

                        {selectedMonster.resistence && (
                            <>
                                <hr />

                                <strong>Resistenze:</strong>
                                <p>
                                    {selectedMonster.resistence}
                                </p>
                            </>
                        )}

                        {selectedMonster.vulnerability && (
                            <>
                                <hr />

                                <strong>Vulnerabilità:</strong>
                                <p>
                                    {selectedMonster.vulnerability}
                                </p>
                            </>
                        )}

                        <div className="d-flex flex-wrap gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate(`/admin/monster/${selectedMonster.id}/tratto/create`)}
                            >
                                <i className="bi bi-plus-lg"> Tratto</i>
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() =>
                                    navigate(
                                        `/admin/monster/${selectedMonster.id}/azione/create`
                                    )
                                }
                            >
                                <i className="bi bi-plus-lg"> Azioni</i>
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate(`/admin/monster/${selectedMonster.id}/azione-bonus/create`)}
                            >
                                <i className="bi bi-plus-lg"> Azioni bonus</i>
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() => navigate("/")}
                            >
                                <i className="bi bi-plus-lg"> Leggendarie</i>
                            </button>

                        </div>

                        {selectedMonster.traits &&
                            selectedMonster.traits.length > 0 && (
                                <>
                                    <hr />

                                    <strong>Tratti:</strong>

                                    {selectedMonster.traits.map((trait) => (
                                        <div
                                            key={trait.id}
                                            className="mt-3"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: trait.description
                                                }}
                                            />

                                            {isAdmin && (
                                                <div className="d-flex gap-1 mt-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/trait/modifica/${trait.id}`
                                                            )
                                                        }
                                                        title="Modifica tratto"
                                                        aria-label="Modifica tratto"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            deleteTrait(trait.id)
                                                        }
                                                        title="Elimina tratto"
                                                        aria-label="Elimina tratto"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                        {selectedMonster.actions &&
                            selectedMonster.actions.length > 0 && (
                                <>
                                    <hr />

                                    <strong>Azioni:</strong>

                                    {selectedMonster.actions.map((action) => (
                                        <div
                                            key={action.id}
                                            className="mt-3"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: action.description
                                                }}
                                            />
                                            {isAdmin && (
                                                <div className="d-flex gap-1 mt-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/azione/modifica/${action.id}`
                                                            )
                                                        }
                                                        title="Modifica tratto"
                                                        aria-label="Modifica tratto"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            deleteAction(action.id)
                                                        }
                                                        title="Elimina tratto"
                                                        aria-label="Elimina tratto"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                        {selectedMonster.bonusActions &&
                            selectedMonster.bonusActions.length > 0 && (
                                <>
                                    <hr />

                                    <strong>Azioni bonus:</strong>

                                    {selectedMonster.bonusActions.map((bonusAction) => (
                                        <div
                                            key={bonusAction.id}
                                            className="mt-3"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: bonusAction.description
                                                }}
                                            />
                                            {isAdmin && (
                                                <div className="d-flex gap-1 mt-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/azione-bonus/modifica/${bonusAction.id}`
                                                            )
                                                        }
                                                        title="Modifica tratto"
                                                        aria-label="Modifica tratto"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            deleteBonusAction(bonusAction.id)
                                                        }
                                                        title="Elimina tratto"
                                                        aria-label="Elimina tratto"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                    </div>
                </div>
            </div>
        </div>
    );
}