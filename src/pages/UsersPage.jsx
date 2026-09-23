import { useNavigate } from "react-router-dom"

export default function UsersPage() {
    const navigate = useNavigate()
    return (
        <div className="data-page">
            <h1> Pagine in fase di preparazione</h1>
            <h2>si prega di tornare indietro</h2>
            <button
                type="button"
                className="btn btn-outline-success btn-sm me-2 border-3 fw-bold mb-2"
                onClick={() => navigate("/admin")} >
                ← Torna indietro
            </button>

        </div>
    )
}