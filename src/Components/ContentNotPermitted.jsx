import gandalf from "../assets/gif/Gandalf.gif"
export default function ContentNotPermitted() {
    return (
        <div className="text-center">
            <h1>Non dovresti essere qui, torna indietro!!</h1>

            <div>
                <img
                    src={gandalf}
                    alt="Gandalf"
                />
            </div>
        </div>
    );
}