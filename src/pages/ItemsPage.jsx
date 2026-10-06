import PageCard from "../Components/PageCard";

export default function ItemsPage() {

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5">

                <PageCard navigateTo={"/dati-di-gioco/oggetti/armi"} pageName={"Armi"} img={"/img/armi.jpg"} alt={"Armi"} />
                <PageCard navigateTo={"/dati-di-gioco/oggetti/armature"} pageName={"Armature"} img={"/img/armature.jpg"} alt={"Armature"} />
                <PageCard navigateTo={"/dati-di-gioco/oggetti/strumenti"} pageName={"Strumenti"} img={"/img/strumenti.jpg"} alt={"Strumenti"} />
                <PageCard navigateTo={"/dati-di-gioco/oggetti/oggetti-vari"} pageName={"Oggetti"} img={"/img/oggetti.jpg"} alt={"Oggetti"} />

            </div>
        </div>
    )

}