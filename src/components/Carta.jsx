import { useContext, useState } from 'react'
import '../styles/cartaStyle.css'
import Evolucion from './Evolucion'
import Tipos from './Tipos'
import { urlContext } from '../App'
import { Link } from 'react-router-dom'

export default function Carta ({pokemon}) {
    const {primeraMayusc} = useContext(urlContext)
    const pokeId = pokemon.id
    const pokeName = pokemon.name
    const pokeImg = pokemon.sprites.front_default
    const pokeTipos = pokemon.types

    const [favorito, setFavorito] = useState(false)

    const serFavorito = () => {
        (favorito? setFavorito(false) : setFavorito(true)) 
    }

    return (
        <article className="main__carta">
            <div className="main__carta--img">
                <p className="main__carta--id">ID / {pokeId}</p>
                <img
                    src={pokeImg}
                    alt={pokeName}
                    className="img"
                />
            </div>
            
            <figcaption className="main__carta--descripcion">
                <div className="main__carta--titulo">
                    <h1 className="main__carta--nombre">{primeraMayusc(pokeName)}</h1>
                    <div>
                        <button className={`main__carta--boton link ${favorito ? "favorito" : ""}`} onClick={serFavorito}>♥</button>
                        <button className="main__carta--boton">
                            <Link to={`/pokemon/${pokeId}`} className="link" >+</Link>
                        </button>
                    </div>
                </div>
                <Tipos pokeTipos={pokeTipos}/>
                <Evolucion pokeName={pokeName}></Evolucion>
            </figcaption>
        </article>     
)}