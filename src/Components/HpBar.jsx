import { useEffect, useState } from "react"

export default function HpBar({ el }) {

    const [psStat, setPsStat] = useState(100)
    const [color, setColor] = useState("rgba(78, 221, 11, 0.479)")

    function changePfBar(value) {

        if (value > 75) {
            setColor("rgba(78, 221, 11, 0.48)")
        } else if (value > 50) {
            setColor("rgba(233, 250, 0, 0.48)")
        } else if (value > 15) {
            setColor("rgba(253, 188, 9, 0.48)")
        } else {
            setColor("rgba(221, 11, 11, 0.48)")
        }

    }

    useEffect(() => {

        // MODIFICA: usa i nuovi nomi delle proprietà del mostro
        const currentLife = Number(el.currentLifePoint)
        const maxLife = Number(el.maxLifePoint)

        // MODIFICA: evita NaN quando i PF massimi non sono validi
        if (maxLife <= 0 || Number.isNaN(currentLife)) {
            setPsStat(0)
            changePfBar(0)
            return
        }

        // MODIFICA: calcola la percentuale usando i PF attuali e massimi
        const percentage = (currentLife / maxLife) * 100

        setPsStat(percentage)
        changePfBar(percentage)

    }, [el.currentLifePoint, el.maxLifePoint])

    return (
        <div
            className="ps_bar_body"
            style={{ border: `1px solid ${color}` }}
        >
            <div
                className="ps_bar_stat"
                style={{
                    width: `${psStat}%`,
                    backgroundColor: color
                }}
            ></div>

            <div className="ps_bar_hover text-center">
                {el.currentLifePoint} / {el.maxLifePoint}
            </div>
        </div>
    )
}