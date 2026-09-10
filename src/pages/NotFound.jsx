import ContentNotPermitted from "../Components/ContentNotPermitted";

export default function NotFound() {
    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-3 mt-5 text-center ">
                <div className="data-page p-4">
                    <h1>404</h1>
                    <h2>Pagina non trovata</h2>
                    <ContentNotPermitted />
                </div>

            </div>
        </div>
    )
}