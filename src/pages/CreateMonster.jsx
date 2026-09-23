import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import ContentNotPermitted from "../Components/ContentNotPermitted";

export default function CreateMonster() {

    const { isAdmin } = useAuth();

    const API_URL = `${import.meta.env.VITE_API_URL}/monster`;

    const navigate = useNavigate();

    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [armorClass, setArmorClass] = useState("");
    const [lifePoint, setLifePoint] = useState("");
    const [moviment, setMoviment] = useState("");
    const [strength, setStrength] = useState(0);
    const [dexterity, setDexterity] = useState(0);
    const [constitution, setConstitution] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [wisdom, setWisdom] = useState(0);
    const [charisma, setCharisma] = useState(0);
    const [challengeRating, setChallengeRating] = useState("");
    const [savingThrow, setSavingThrow] = useState("");
    const [sense, setSense] = useState("");
    const [skills, setSkills] = useState("");
    const [immunity, setImmunity] = useState("");
    const [resistence, setResistence] = useState("");
    const [vulnerability, setVulnerability] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [initiative, setInitiative] = useState(0);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        api
            .get(`${API_URL}/${id}`)
            .then((response) => {

                const monster = response.data;

                setName(monster.name ?? "");
                setArmorClass(monster.armorClass ?? "");
                setLifePoint(monster.lifePoint ?? "");
                setMoviment(monster.moviment ?? "");
                setStrength(monster.strength ?? 0);
                setDexterity(monster.dexterity ?? 0);
                setConstitution(monster.constitution ?? 0);
                setIntelligence(monster.intelligence ?? 0);
                setWisdom(monster.wisdom ?? 0);
                setCharisma(monster.charisma ?? 0);
                setChallengeRating(monster.challengeRating ?? "");
                setSavingThrow(monster.savingThrow ?? "");
                setSense(monster.sense ?? "");
                setSkills(monster.skills ?? "");
                setImmunity(monster.immunity ?? "");
                setResistence(monster.resistence ?? "");
                setVulnerability(monster.vulnerability ?? "");
                setSize(monster.size ?? "");
                setType(monster.type ?? "");
                setInitiative(monster.initiative ?? 0);
            })
            .catch((error) => {

                console.error(
                    "Errore nel caricamento del mostro:",
                    error
                );

                setError("Impossibile caricare il mostro.");
            });

    }, [id]);

    function saveMonster(event) {

        event.preventDefault();

        const monster = {
            name: name,
            armorClass: Number(armorClass),
            lifePoint: Number(lifePoint),
            moviment: moviment,
            strength: Number(strength),
            dexterity: Number(dexterity),
            constitution: Number(constitution),
            intelligence: Number(intelligence),
            wisdom: Number(wisdom),
            charisma: Number(charisma),
            challengeRating: Number(challengeRating),
            savingThrow: savingThrow,
            sense: sense,
            skills: skills,
            immunity: immunity,
            resistence: resistence,
            vulnerability: vulnerability,
            size: size,
            type: type,
            initiative: Number(initiative)
        };

        const request = isEditMode
            ? api.put(`${API_URL}/updateMonster`, {
                ...monster,
                id: Number(id)
            })
            : api.post(`${API_URL}/create`, monster);

        request
            .then((response) => {
                navigate("/admin/lista-mostri");
            })
            .catch((error) => {

                console.error(
                    isEditMode
                        ? "Errore nella modifica del mostro:"
                        : "Errore nella creazione del mostro:",
                    error
                );

                setError(
                    isEditMode
                        ? "Impossibile modificare il mostro."
                        : "Impossibile creare il mostro."
                );
            });
    }

    // MODIFICA: aggiunto il form completo per la creazione e modifica del mostro
    return (
        <>
            <div className="d-none d-lg-flex justify-content-center mt-4">
                <div className="create-page">

                    <div className="create-page-header">
                        <h2>{isEditMode ? "Modifica mostro" : "Crea mostro"}</h2>
                    </div>

                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}

                    {isAdmin ? (
                        <form onSubmit={saveMonster}>

                            {/* MODIFICA: sezione informazioni principali */}
                            <div className="card mt-4">
                                <div className="card-body">

                                    <h4>Informazioni principali</h4>

                                    <div className="row">

                                        <div className="col-12 col-md-6 mt-3">
                                            <label className="form-label">Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 mt-3">
                                            <label className="form-label">Tipo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 mt-3">
                                            <label className="form-label">Taglia</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={size}
                                                onChange={(e) => setSize(e.target.value)}
                                            />
                                        </div>



                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Classe Armatura</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                value={armorClass}
                                                onChange={(e) => setArmorClass(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Punti Ferita</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                value={lifePoint}
                                                onChange={(e) => setLifePoint(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Movimento</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={moviment}
                                                onChange={(e) => setMoviment(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 mt-3">
                                            <label className="form-label">Grado di sfida</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="0"
                                                step="0.01"
                                                value={challengeRating}
                                                onChange={(e) => setChallengeRating(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 col-md-6 mt-3">
                                            <label className="form-label">Iniziativa</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="15"
                                                value={initiative}
                                                onChange={(e) => setInitiative(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* MODIFICA: sezione caratteristiche */}
                            <div className="card mt-4">
                                <div className="card-body">

                                    <h4>Caratteristiche</h4>

                                    <div className="row">

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Forza</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={strength}
                                                onChange={(e) => setStrength(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Destrezza</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={dexterity}
                                                onChange={(e) => setDexterity(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Costituzione</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={constitution}
                                                onChange={(e) => setConstitution(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Intelligenza</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={intelligence}
                                                onChange={(e) => setIntelligence(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Saggezza</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={wisdom}
                                                onChange={(e) => setWisdom(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 col-md-4 mt-3">
                                            <label className="form-label">Carisma</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="-5"
                                                max="10"
                                                value={charisma}
                                                onChange={(e) => setCharisma(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* MODIFICA: sezione informazioni aggiuntive */}
                            <div className="card mt-4">
                                <div className="card-body">

                                    <h4>Informazioni aggiuntive</h4>

                                    <div className="row">

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Tiri salvezza</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                maxLength="100"
                                                value={savingThrow}
                                                onChange={(e) => setSavingThrow(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Sensi</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={sense}
                                                onChange={(e) => setSense(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Abilità</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Immunità</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={immunity}
                                                onChange={(e) => setImmunity(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Resistenze</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={resistence}
                                                onChange={(e) => setResistence(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 mt-3">
                                            <label className="form-label">Vulnerabilità</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={vulnerability}
                                                onChange={(e) => setVulnerability(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* MODIFICA: pulsanti del form */}
                            <div className="d-flex justify-content-center gap-3 mt-4 mb-5">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/admin/lista-mostri")}
                                >
                                    Annulla
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {isEditMode ? "Salva modifiche" : "Crea mostro"}
                                </button>

                            </div>

                        </form>
                    ) : (
                        <ContentNotPermitted />
                    )}

                </div>
            </div>

            {/* MODIFICA: contenuto mostrato su mobile e tablet */}
            <div className="d-flex d-lg-none justify-content-center mt-5">
                <div className="text-center">

                    <ContentNotPermitted />

                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => navigate("/home")}
                    >
                        Torna alla home
                    </button>

                </div>
            </div>
        </>
    );
}