import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import PageHeader from "../Components/PageHeader";
import PageSectionLeft from "../Components/PageSectionLeft";
import PageSectionRight from "../Components/PgeSectionRight";
import { useNavigate } from "react-router-dom";
import RequestDetail from "../Components/RequestDetail";
import RequestPendingList from "../Components/RequestPendingList";

export default function RequestPage() {

    const API_URL = `${import.meta.env.VITE_API_URL}/request`;

    const [requestData, setRequestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);

    const navigate = useNavigate();

    function getRequests() {
        setLoading(true);
        setError("");

        api
            .get(API_URL)
            .then((response) => {
                const data = response.data;

                setRequestData(data);
            })
            .catch((error) => {
                console.error(
                    "Errore nel recupero delle request:",
                    error
                );

                setError("Impossibile recuperare le request.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getRequests();
        setSelectedRequest(null);
        setShowDetail(false);
    }, []);

    const filteredRequests = requestData.filter((request) =>
        request.name?.toLowerCase().includes(searchValue.toLowerCase())
    );

    function approveRequest(id) {
        api
            .post(`${API_URL}/${id}/approve`)
            .then(() => {
                // MODIFICA: aggiorna la lista dopo l'approvazione
                getRequests();
                setSelectedRequest(null);
                setShowDetail(false);
            })
            .catch((error) => {
                console.error(
                    "Errore nell'approvazione della request:",
                    error
                );

                setError("Impossibile approvare la request.");
            });
    }

    function rejectRequest(id) {
        api
            .post(`${API_URL}/${id}/reject`)
            .then(() => {
                // MODIFICA: aggiorna la lista dopo il rifiuto
                getRequests();
                setSelectedRequest(null);
                setShowDetail(false);
            })
            .catch((error) => {
                console.error(
                    "Errore nel rifiuto della request:",
                    error
                );

                setError("Impossibile rigettare la request.");
            });
    }

    if (loading) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="text-center p-4">
                            Caricamento Request...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid pb-5">
                <div className="d-flex justify-content-center mt-4">
                    <div className="data-page">
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid pb-5">
            <div className="d-flex justify-content-center mt-4">
                <div className="data-page">

                    <button
                        type="button"
                        className="btn btn-outline-success border-3 fw-bold mb-2"
                        onClick={() => navigate("/")}
                    >
                        ← Torna indietro
                    </button>

                    <PageHeader
                        name={"Lista request"}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        showDetail={showDetail}
                    />

                    <div className="row justify-content-between">

                        <div
                            className={
                                showDetail
                                    ? "col-12 col-lg-5 data-page-sidebar mt-4 border-right d-none d-lg-block"
                                    : "col-12 col-lg-5 data-page-sidebar mt-4 border-right"
                            }
                        >
                            <RequestPendingList
                                item={requestData}
                                selectedItem={selectedRequest}
                                setSelectedItem={setSelectedRequest}
                                setShowDetail={setShowDetail}
                            />

                        </div>

                        <RequestDetail
                            request={selectedRequest}
                            setSelectedItem={setSelectedRequest}
                            setShowDetail={setShowDetail}
                            approveRequest={approveRequest}
                            rejectRequest={rejectRequest}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}