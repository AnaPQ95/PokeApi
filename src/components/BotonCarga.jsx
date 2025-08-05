import { useContext } from "react"
import { urlContext } from "../App"

export default function BotonCarga () {
    const {next, previous, setCurrentUrl} = useContext(urlContext)

    const botonLeft = () => {
        if (previous) {
            setCurrentUrl(previous)
        }
    }

    const botonRight = () => {
        if (next) {
            setCurrentUrl(next)
        }
    }

    return (
        <div className="paginacion">
        <button disabled={!previous} className="boton paginacion__botonLeft" onClick={botonLeft}>◀</button>
        <button disabled={!next} className="boton paginacion__botonRight" onClick={botonRight}>▶</button>
        </div>
    )
}