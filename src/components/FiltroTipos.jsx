import { useContext, useEffect, useState } from "react"
import { urlContext } from "../App"

export default function FiltroTipos () {
  const {setTipoSeleccionado} = useContext(urlContext)
    const [pokeTipo, setPokeTipo] = useState([])
    const pokemonType = () => {
        return fetch("https://pokeapi.co/api/v2/type/")
        .then((resp) => resp.json())
        .then((tipos) => tipos.results)
      }

      useEffect(() => {
        pokemonType().then((data) => setPokeTipo(data))

      }, [])
    return (
        <div className="listaTipos">
            {pokeTipo.map((e) => (
            <div onClick={() => setTipoSeleccionado(e.name)} key={e.name} className="listaTipos__tipo">{(e.name).toUpperCase()}</div>))}
        </div>        
    )
}