import { useResource } from "../context/ResourceContext"


export default function SurvivolPannel() {

    const
        {
            playerList,
            setPlayerList,
            addPlayer,
            playerName,
            setPlayerName,
            totalWather,
            setTotalWather,
            totalFood,
            setTotalFood
        } = useResource()


    function changeFood(n) {
        setTotalFood(prevTotalFood => {
            const newTotal = prevTotalFood + n

            if (newTotal < 0) {
                return 0
            }

            return newTotal
        })
    }
    function changeWather(n) {
        setTotalWather(prevTotalWather => {
            const newTotal = prevTotalWather + n

            if (newTotal < 0) {
                return 0
            }

            return newTotal
        })
    }

    return (

        <div className="survival-pannel ">
            <div className="col text-center mt-3 ">
                <h2>Risorse dei Giocatori:</h2>
                <div className="container-fluid">

                    {/* Razioni */}
                    <div className="row text-center mb-3">
                        <div className="col-12 fw-bold fs-5 mb-1">
                            Razioni
                        </div>

                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center gap-2">

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => changeFood(-10)}
                                >
                                    -10
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => changeFood(-1)}
                                >
                                    -1
                                </button>

                                <div
                                    className="fs-4 fw-bold text-center"
                                    style={{ minWidth: "4ch" }}
                                >
                                    {totalFood}
                                </div>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => changeFood(1)}
                                >
                                    +1
                                </button>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => changeFood(10)}
                                >
                                    +10
                                </button>

                            </div>
                        </div>
                    </div>


                    {/* Acqua */}
                    <div className="row text-center">
                        <div className="col-12 fw-bold fs-5 mb-1">
                            Acqua
                        </div>

                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center gap-2">

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => changeWather(-10)}
                                >
                                    -10
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => changeWather(-1)}
                                >
                                    -1
                                </button>

                                <div
                                    className="fs-4 fw-bold text-center"
                                    style={{ minWidth: "4ch" }}
                                >
                                    {totalWather}
                                </div>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => changeWather(1)}
                                >
                                    +1
                                </button>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => changeWather(10)}
                                >
                                    +10
                                </button>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="mt-3">
                <form onSubmit={addPlayer} >

                    <div className="me-2">
                        <div className="d-flex align-items-center">
                            <div>
                                <input
                                    id="add-name"
                                    className="form-control"
                                    type="text"
                                    value={playerName}
                                    onChange={e => { setPlayerName(e.target.value) }}
                                    placeholder="nome..."
                                    required
                                />
                            </div>

                            <div className="ms-3">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary">Aggiungi</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div className="row row-cols-2 row-cols-xxl-3 mt-3">
                {playerList.length > 0 ? (playerList.map(player => (
                    <div className="col mt-3" key={player.id}>
                        <div className="card">
                            <div className="card-header">
                                {player.name}
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold me-2">Acqua:</span>
                                    <input className="form-check-input mt-0"
                                        type="checkbox"
                                        checked={player.useWather}
                                        onChange={() => {
                                            setPlayerList(prevPlayerList =>
                                                prevPlayerList.map(p =>
                                                    p.id === player.id
                                                        ? {
                                                            ...p,
                                                            useWather: !p.useWather
                                                        }
                                                        : p
                                                )
                                            )
                                        }}
                                        aria-label="Checkbox for following text input"></input>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold me-2"> Razioni:</span>
                                    <input className="form-check-input mt-0"
                                        type="checkbox"
                                        checked={player.useFood}
                                        onChange={() => {
                                            setPlayerList(prevPlayerList =>
                                                prevPlayerList.map(p =>
                                                    p.id === player.id
                                                        ? {
                                                            ...p,
                                                            useFood: !p.useFood
                                                        }
                                                        : p
                                                )
                                            )
                                        }}
                                        aria-label="Checkbox for following text input"></input>
                                </div>

                            </div>
                        </div>
                    </div>


                )
                )) : <p>Aggiungi giocatori</p>

                }

            </div >
        </div>

    )
}