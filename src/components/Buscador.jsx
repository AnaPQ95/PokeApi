import { useContext } from "react"
import { urlContext } from "../App"
import FiltroTipos from "./FiltroTipos"

export default function Buscador () {
const {busqueda, setBusqueda} = useContext(urlContext)

    return (   
        <> 
        <input
            type="search"
            placeholder="Filtra pokemons por nombre..."
            className="main__filtro"
            value={busqueda}
            onInput={(e) => setBusqueda(e.target.value)}
        />
        <FiltroTipos></FiltroTipos>
        </> 
    )
}