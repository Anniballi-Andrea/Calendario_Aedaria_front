export default function ButtonChangeDays({ setDaysToAdd, setShowModal, setModalName, name, title, dayQuantity, buttonType }) {
    return (
        <div>
            <button
                className={`btn btn-${buttonType} ms-3`}
                onClick={() => { setDaysToAdd(dayQuantity), setShowModal(true), setModalName(title) }}
            >
                {name}
            </button>
        </div>
    )
}