import { useNavigate } from "react-router-dom"

export default function AdminPage() {

    const navigate = useNavigate()

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5">

                    <div className="col d-flex">
                        <div
                            className="data-page box-shadow-t text-center h-100 w-100 d-flex align-items-center justify-content-center"
                            onClick={() => navigate("/admin/lista-mostri")}
                        >
                            <h1 className="mb-0">
                                Lista Mostri
                            </h1>
                            <div className="card-image-container">
                                <img
                                    src="/img/drago-rosso.jpg"
                                    alt="Mostri"
                                    className="card-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col d-flex">
                        <div
                            className="data-page box-shadow-t text-center h-100 w-100 d-flex align-items-center justify-content-center"
                            onClick={() => navigate("/classe/crea-classe")}
                        >
                            <h1 className="mb-0">
                                Aggiungi classe
                            </h1>
                            <div className="card-image-container">
                                <img
                                    src="/img/classi.jpg"
                                    alt="classi"
                                    className="card-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col d-flex">
                        <div
                            className="data-page box-shadow-t text-center h-100 w-100 d-flex align-items-center justify-content-center"
                            onClick={() => navigate("/admin/utenti")}
                        >
                            <h1 className="mb-0">
                                Lista utenti
                            </h1>
                            <div className="card-image-container">
                                <img
                                    src="/img/utenti.jpg"
                                    alt="utenti"
                                    className="card-image"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}