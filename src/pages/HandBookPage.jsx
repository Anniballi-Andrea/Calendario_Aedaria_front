import PageCard from "../Components/PageCard"

export default function HandBookPage() {


    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5">
                    <PageCard navigateTo={"/dati-di-gioco/incantesimi"} pageName={"Magia"} img={"/img/magic-img.jpg"} alt={"Magia"} />
                    <PageCard navigateTo={"/dati-di-gioco/specie"} pageName={"Specie"} img={"/img/specie-img.jpg"} alt={"Specie"} />
                    <PageCard navigateTo={"/dati-di-gioco/talenti"} pageName={"Talenti"} img={"/img/talent-img.jpg"} alt={"Talenti"} />
                    <PageCard navigateTo={"/dati-di-gioco/background"} pageName={"Background"} img={"/img/background-img.jpg"} alt={"Background"} />
                    <PageCard navigateTo={"/dati-di-gioco/classi"} pageName={"Classi"} img={"/img/classi.jpg"} alt={"Classi"} />
                </div>
            </div>
        </>
    )
}