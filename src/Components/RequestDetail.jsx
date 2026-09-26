

import BackgroundDetail from "./BackgroundDetail";
import SpellRequestDetail from "./SpellRequestDetail";
import TalentDetail from "./TalentDetail";

export default function RequestDetail({
    request,
    setSelectedItem,
    setShowDetail,
    approveRequest,
    rejectRequest
}) {

    if (!request) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7 mt-3">

            {request.status === "PENDING" && (
                <div className="d-flex justify-content-center gap-2 mb-3">

                    <button
                        type="button"
                        className="btn btn-success fw-bold"
                        onClick={() => approveRequest(request.id)}
                    >
                        Approva
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger fw-bold"
                        onClick={() => rejectRequest(request.id)}
                    >
                        Rigetta
                    </button>

                </div>
            )}


            {request.type === "SPELL" && (
                <SpellRequestDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {request.type === "TALENT" && (
                <TalentDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {request.type === "BACKGROUND" && (
                <BackgroundDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {!["SPELL", "TALENT", "BACKGROUND"].includes(request.type) && (
                <div className="data-page-section text-center p-4">
                    Tipo di request non supportato.
                </div>
            )}

        </div>
    );
}