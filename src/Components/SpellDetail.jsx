
export default function SpellDetail({
    selectedSpell,
    setSelectedSpell,
    setShowDetail
}) {

    if (!selectedSpell) {
        return null;
    }

    return (
        <div className="col-12 col-lg-7 card mt-3">

            <div className="card-header text-center position-relative">

                <h5>
                    {selectedSpell.name}
                </h5>

                <div>
                    <span className="badge text-bg-primary">
                        Livello {selectedSpell.level}
                    </span>

                    <span className="badge text-bg-secondary ms-2">
                        {selectedSpell.school}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-close position-absolute top-0 end-0 m-2"
                    onClick={() => {
                        setShowDetail(false);
                        setSelectedSpell(null);
                    }}
                    aria-label="Chiudi"
                />
            </div>

            <div className="card-body">


                <hr />

                <div className="row">

                    <div className="col-12 col-md-6 col-lg-3 mt-2">
                        <strong>Tempo di lancio:</strong>
                        <div>{selectedSpell.castMethod}</div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mt-2">
                        <strong>Gittata:</strong>
                        <div>{selectedSpell.castRange}</div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3  mt-2">
                        <strong>Componenti:</strong>
                        <div>{selectedSpell.components}</div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3  mt-2">
                        <strong>Durata:</strong>
                        <div>{selectedSpell.duration}</div>
                    </div>

                </div>

                {selectedSpell.materials && (
                    <>
                        <hr />

                        <h6>Materiali:</h6>
                        <p>
                            {selectedSpell.materials}
                        </p>
                    </>
                )}

                <h6>Descrizione:</h6>
                <p>
                    {selectedSpell.effect}
                </p>


                {selectedSpell.upgrade && (
                    <>
                        <hr />

                        <h6>Potenzia a livelli superiori:</h6>
                        <p>
                            {selectedSpell.upgrade}
                        </p>
                    </>
                )}

            </div>
        </div>
    );
}