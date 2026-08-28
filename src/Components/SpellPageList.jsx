export default function SpellPageList({ showDetail, loading, error, spells, spellsByLevel, selectedSpell, selectSpell }) {

    return (
        <div
            className={
                showDetail
                    ? "data-page-sidebar d-none d-lg-block"
                    : "data-page-sidebar"
            }
        >

            {loading && (
                <div className="text-center p-4">
                    Caricamento incantesimi...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading &&
                !error &&
                spells.length === 0 && (
                    <div className="data-page-empty">
                        Nessun incantesimo trovato.
                    </div>
                )}

            {!loading &&
                !error &&
                Object.keys(spellsByLevel)
                    .sort(
                        (a, b) =>
                            Number(a) - Number(b)
                    )
                    .map((spellLevel) => (

                        <div
                            className="data-page-section"
                            key={spellLevel}
                        >

                            <h2>
                                {spellLevel === "0"
                                    ? "Trucchetti"
                                    : `Livello ${spellLevel}`
                                }
                            </h2>

                            <div className="data-page-list">

                                {spellsByLevel[
                                    spellLevel
                                ].map((spell) => (

                                    <div
                                        key={spell.id}
                                        className="card mb-2"
                                    >

                                        <button
                                            type="button"
                                            className={`btn spell-list-button ${selectedSpell?.id ===
                                                spell.id
                                                ? "btn-warning"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                selectSpell(
                                                    spell.id
                                                )
                                            }
                                        >
                                            <span>
                                                {spell.name}
                                            </span>
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

        </div>
    )
}