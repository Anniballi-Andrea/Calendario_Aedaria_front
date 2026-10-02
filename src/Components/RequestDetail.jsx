
import BackgroundRequestDetail from "./BackgroundRequestDetail";
import PageSectionRight from "./PgeSectionRight";
import SkillRequestDetail from "./skillRequestDetail";
import SpeciesRequestDetail from "./SpeciesRequestDetail";
import SpellRequestDetail from "./SpellRequestDetail";
import TalentRequestDetail from "./TalentRequestDetail";

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


            {request.requestType === "SPELL" && (
                <SpellRequestDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {request.requestType === "SPECIES" && (
                <SpeciesRequestDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {request.requestType === "TALENT" && (
                <TalentRequestDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {request.requestType === "BACKGROUND" && (
                <BackgroundRequestDetail
                    request={request}
                    setSelectedItem={setSelectedItem}
                    setShowDetail={setShowDetail}
                />
            )}

            {
                request.requestType === "SKILL" && (
                    <SkillRequestDetail
                        request={request}
                        setSelectedItem={setSelectedItem}
                        setShowDetail={setShowDetail}
                    />
                )

            }


            {!["SPELL", "TALENT", "SPECIES", "BACKGROUND", "SKILL"].includes(request.requestType) && (
                <div className="data-page-section text-center p-4">
                    Tipo di request non supportato.
                </div>
            )}

        </div>
    );
}