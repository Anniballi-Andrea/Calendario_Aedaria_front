import { useState } from "react"
import HpBar from "./HpBar"

export default function MonsterCard({
    monster,
    changeTempLife,
    applyDamage,
    applyHeal,
    removeMonster
}) {



    const [inputDanno, setInputDanno] = useState("")
    const [inputCura, setInputCura] = useState("")
    const [text, setText] = useState("")
    const [activeSection, setActiveSection] = useState("stats")

    function showSection(section) {
        setActiveSection(section)
    }

    function handleDanno(event) {

        event.preventDefault()

        const danno = Number(inputDanno)

        if (danno <= 0) {
            return
        }

        // MODIFICA: il danno viene gestito dal MonsterManager,
        // prima sui PF temporanei e poi sui PF normali
        applyDamage(
            monster.instanceId,
            danno
        )

        setInputDanno("")
    }

    function handleCura(event) {

        event.preventDefault()

        const cura = Number(inputCura)

        if (cura <= 0) {
            return
        }

        // MODIFICA: la cura viene applicata solamente ai PF normali
        applyHeal(
            monster.instanceId,
            cura
        )

        setInputCura("")
    }

    function handleTempPf(event) {

        const value = Math.max(
            0,
            Number(event.target.value)
        )

        // MODIFICA: aggiorna i PF temporanei nel MonsterManager
        changeTempLife(
            monster.instanceId,
            value
        )
    }

    function formatModifier(value) {

        return value > 0 ? `+${value}` : value
    }

    return (

        <div className="card mb-3 left-item-vh">

            <div className="card-header text-center">

                <div className="mb-2">
                    {monster.name}
                </div>

                <div className="text-center mb-2">
                    GS: {monster.challengeRating}
                </div>
                <HpBar el={monster} />

                <div className="d-flex justify-content-center mt-2">

                    <div className="me-2">

                        {monster.currentLifePoint === 0 ? (
                            "morto"
                        ) : (
                            <>
                                <span className="active fw-bold">
                                    {"PF: "}
                                </span>

                                {monster.currentLifePoint}/{monster.maxLifePoint}
                            </>
                        )}

                    </div>

                    <div className="me-2">

                        <span className="active fw-bold">
                            {"CA: "}
                        </span>

                        {monster.armorClass}

                    </div>

                </div>

                <div className="text-center">

                    <span className="active fw-bold">
                        {"Velocità: "}
                    </span>

                    {monster.moviment}

                </div>

            </div>

            <div className="card-body">

                <div className="d-flex align-items-center">

                    <form
                        className="me-3 "
                        onSubmit={handleDanno}
                    >

                        <div className="input-group">

                            <input
                                className="form-control"
                                type="number"
                                min="0"
                                value={inputDanno}
                                onChange={(event) =>
                                    setInputDanno(event.target.value)
                                }
                                placeholder="danno"
                            />

                            <button
                                className="btn btn-sm btn-warning"
                                type="submit"
                            >
                                <img
                                    src="/img/sword_icon.svg"
                                    alt=""
                                />
                            </button>

                        </div>

                    </form>

                    <form
                        className=""
                        onSubmit={handleCura}>

                        <div className="input-group">

                            <input
                                className="form-control"
                                type="number"
                                min="0"
                                value={inputCura}
                                onChange={(event) =>
                                    setInputCura(event.target.value)
                                }
                                placeholder="cura"
                            />

                            <button
                                className="btn btn-sm btn-success text-dark"
                                type="submit"
                            >
                                <i className="bi bi-heart-fill"></i>
                            </button>

                        </div>

                    </form>

                </div>

                <div className="row row-cols-2 justify-content-center mt-2 mb-2">

                    <div className="col text-center">

                        <label
                            className="form-label"
                            htmlFor={`tempPf-${monster.instanceId}`}
                        >
                            <span className="active fw-bold">
                                {"TEMP PF:"}
                            </span>
                        </label>

                        <input
                            id={`tempPf-${monster.instanceId}`}
                            className="form-control text-center"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={monster.tempLifePoint}
                            onChange={handleTempPf}
                        />

                    </div>

                </div>
                <div className="row row-cols-5 g-2 mt-2">
                    <div className="col">

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary w-100"
                            onClick={() => showSection("stats")}
                        >
                            S
                        </button>

                    </div>

                    {monster.traits?.length > 0 && (

                        <div className="col">

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary w-100"
                                onClick={() => showSection("traits")}
                            >
                                T
                            </button>

                        </div>

                    )}

                    {monster.actions?.length > 0 && (

                        <div className="col">

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary w-100"
                                onClick={() => showSection("actions")}
                            >
                                A
                            </button>

                        </div>

                    )}

                    {monster.bonusActions?.length > 0 && (

                        <div className="col">

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary w-100"
                                onClick={() => showSection("bonusActions")}
                            >
                                AB
                            </button>

                        </div>

                    )}

                    {monster.legendaryActions?.length > 0 && (

                        <div className="col">

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary w-100"
                                onClick={() => showSection("legendaryActions")}
                            >
                                AL
                            </button>

                        </div>

                    )}

                </div>

                <div className="row row-cols-3 mt-3">

                    <div className="col">

                        <span className="active fw-bold">
                            {"STR: "}
                        </span>

                        {formatModifier(monster.strength)}

                    </div>

                    <div className="col">

                        <span className="active fw-bold">
                            {"DEX: "}
                        </span>

                        {formatModifier(monster.dexterity)}

                    </div>

                    <div className="col">

                        <span className="active fw-bold">
                            {"CONS: "}
                        </span>

                        {formatModifier(monster.constitution)}

                    </div>

                    <div className="col mt-2">

                        <span className="active fw-bold">
                            {"INT: "}
                        </span>

                        {formatModifier(monster.intelligence)}

                    </div>

                    <div className="col mt-2">

                        <span className="active fw-bold">
                            {"SAG: "}
                        </span>

                        {formatModifier(monster.wisdom)}

                    </div>

                    <div className="col mt-2">

                        <span className="active fw-bold">
                            {"CAR: "}
                        </span>

                        {formatModifier(monster.charisma)}

                    </div>

                </div>
                <div className="row row-cols-1 justify-content-start">
                    {activeSection === "stats" && (
                        <>
                            {monster.savingThrow && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Tiri salvezza:"}
                                    </span>{" "}
                                    {monster.savingThrow}
                                </div>
                            )}

                            {monster.skills && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Abilità:"}
                                    </span>{" "}
                                    {monster.skills}
                                </div>
                            )}

                            {monster.immunity && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Immunità:"}
                                    </span>{" "}
                                    {monster.immunity}
                                </div>
                            )}

                            {monster.resistence && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Resistenze:"}
                                    </span>{" "}
                                    {monster.resistence}
                                </div>
                            )}

                            {monster.vulnerability && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Vulnerabilità:"}
                                    </span>{" "}
                                    {monster.vulnerability}
                                </div>
                            )}

                            {monster.sense && (
                                <div className="col  mt-2 pt-2 text-start">
                                    <span className="active fw-bold">
                                        {"Sensi:"}
                                    </span>{" "}
                                    {monster.sense}
                                </div>
                            )}
                        </>
                    )}

                    {activeSection === "traits" &&
                        monster.traits.map((trait) => (
                            <div
                                className="col  mt-2 pt-2 text-start"
                                key={trait.id}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: trait.description
                                    }}
                                />
                            </div>
                        ))}

                    {activeSection === "actions" &&
                        monster.actions.map((action) => (
                            <div
                                className="col  mt-2 pt-2 text-start"
                                key={action.id}
                            >
                                <div
                                    dangerouslySetInnerHTML={{

                                        __html: action.description
                                    }}
                                />
                            </div>
                        ))}

                    {activeSection === "bonusActions" &&
                        monster.bonusActions.map((action) => (
                            <div
                                className="col  mt-2 pt-2 text-start"
                                key={action.id}
                            >
                                <div
                                    dangerouslySetInnerHTML={{

                                        __html: action.description
                                    }}
                                />
                            </div>
                        ))}

                    {activeSection === "legendaryActions" &&
                        monster.legendaryActions.map((action) => (
                            <div
                                className="col  mt-2 pt-2 text-start"
                                key={action.id}
                            >
                                <div
                                    dangerouslySetInnerHTML={{

                                        __html: action.description
                                    }}
                                />
                            </div>
                        ))}
                </div>

                <div className="row row-cols-1 mt-3">

                    <textarea
                        name="monsterText"
                        placeholder="testo..."
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)
                        }
                    />

                </div>

                <div className="mt-2 d-flex justify-content-center mt-3 ">

                    <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                            removeMonster(monster.instanceId)
                        }
                    >
                        Elimina
                    </button>

                </div>

            </div>

        </div>
    )
}