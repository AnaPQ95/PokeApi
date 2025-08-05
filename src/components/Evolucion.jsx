import { useState } from "react"
import { urlContext } from "../App"
import { useContext } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Evolucion ({pokeName}) {
    const {pokeEvo, primeraMayusc} = useContext(urlContext)
    const [pokemonEvo, setPokemonEvo] = useState(null)
    
    useEffect(() => {
        pokeEvo(pokeName).then((data) => {
            if(data.evolves_from_species && data.evolves_from_species.name) {
                setPokemonEvo(primeraMayusc(data.evolves_from_species.name))
            } else (null)
        })
    }, [pokeName])

   return (
    <>
    {pokemonEvo ? (
        <p className="main__carta--evolucion">
            Evoluciona de: <br />
            <Link to={`/pokemon/${pokemonEvo}`} className="main__carta--evoNombre link">{pokemonEvo}</Link>   
        </p>
    ) : null}
   </>
   )
}