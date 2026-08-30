export default function SubClassHeader({ selectedSubClass, subClasses }) {
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
                        onClick={() => {
                        }}
                    >
                        +
                    </button>
                </div>

            </div>
            <div className="col-12 col-lg-7 col-xl-5">
                <select
                    className="form-select mt-3  "
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
            </div>
        </div>
    )
}