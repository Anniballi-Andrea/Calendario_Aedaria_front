import { useNavigate } from "react-router-dom"

export default function PageCard({ navigateTo, pageName, img, alt }) {

    const navigate = useNavigate()

    return (
        <div className="col d-flex">
            <div
                className="data-page box-shadow-t text-center h-100 w-100 d-flex flex-column align-items-center"
                onClick={() => navigate(navigateTo)}
            >
                <h1 className="mb-3 page-card-title">
                    {pageName}
                </h1>

                <div className="card-image-container">
                    <img
                        src={img}
                        alt={alt}
                        className="card-image"
                    />
                </div>
            </div>
        </div>
    )
}