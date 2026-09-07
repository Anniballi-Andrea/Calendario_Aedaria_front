import { useParams } from "react-router-dom";

export default function ClassFeaturePage() {

    const { slug } = useParams();
    const featureName = slug === "warlock" ? "Suppliche Occulte" : slug === "stregone" ? "Metamagia" : slug === "guerriero" ? "Tattiche" : null;

    return (
        <h1>{featureName}</h1>
    )
}