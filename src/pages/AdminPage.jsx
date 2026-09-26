import PageCard from "../Components/PageCard"

export default function AdminPage() {

    const mosnterImg = "/img/drago-rosso.jpg"
    const classImg = "/img/classi.jpg"
    const usersImg = "/img/utenti.jpg"

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center mt-5">
                    <PageCard navigateTo={"/admin/lista-mostri"} pageName={"Lista Mostri"} img={mosnterImg} alt={"Drago rosso"} />
                    <PageCard navigateTo={"/classe/crea-classe"} pageName={"Aggiungi classe"} img={classImg} alt={"Immagine delle classi"} />
                    <PageCard navigateTo={"/admin/utenti"} pageName={"Lista utenti"} img={usersImg} alt={"utenti"} />
                    <PageCard navigateTo={"/admin/richieste"} pageName={"Richieste"} img={usersImg} alt={"utenti"} />
                </div>
            </div>
        </>
    )
}