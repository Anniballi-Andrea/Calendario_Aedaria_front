import gandalf from "../assets/gif/Gandalf.gif"
export default function ContentNotPermitted() {
    return (
        <div className="text-center">
            <h1>Non dovresti essere qui, torna indietro!!</h1>

            <div >
                <img
                    className="w-100"
                    src={gandalf}
                    alt="Gandalf"
                />
            </div>
        </div>
    );
}