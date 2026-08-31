import { useNavigate } from "react-router-dom";

export default function SubClassHeader({ selectedSubClass, setSelectedSubClass, subClasses, navigateTo, navigateToCreateSkill }) {

    const navigate = useNavigate()
    return (
        <div className="data-page-section">
            <div className="d-flex justify-content-between ">
                <div>
                    <h2>
                        Sottoclassi
                    </h2>
                </div>

                <div className="d-none d-lg-block">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                            navigate(navigateTo)
                        }
                    >
                        +
                    </button>
                </div>

            </div>
            <div className="col-12 col-lg-7 col-xl-5">
                <div className="d-flex align-items-center mt-3">

                    <select
                        className="form-select"
                        value={selectedSubClass?.id || ""}
                        onChange={(event) => {
                            const subClass =
                                subClasses?.find(
                                    (subClass) =>
                                        subClass.id ===
                                        Number(event.target.value)
                                );

                            setSelectedSubClass(
                                subClass || null
                            );
                        }}
                    >
                        <option value="">
                            Scegli una sottoclasse
                        </option>

                        {subClasses?.map((subClass) => (
                            <option
                                key={subClass.id}
                                value={subClass.id}
                            >
                                {subClass.name}
                            </option>
                        ))}
                    </select>

                    {selectedSubClass && (
                        <button
                            type="button"
                            className="btn btn-primary ms-2"
                            onClick={() =>
                                navigate(navigateToCreateSkill)
                            }
                        >
                            +
                        </button>
                    )}

                </div>
            </div>
        </div>
    )
}