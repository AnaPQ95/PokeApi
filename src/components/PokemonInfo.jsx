import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { urlContext } from "../App";
import "../styles/infoStyle.css"

export default function PokemonInfo () {
    const {id} = useParams()
    const {primeraMayusc} = useContext(urlContext)
    const [pokemon, setPokemon] = useState()
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp => resp.json())
        .then(data => setPokemon(data))
    }, [id])

    if (!pokemon) return <p>Cargando...</p>

    const pokeId = pokemon.id
    const pokeName = pokemon.name
    const pokeImg = pokemon.sprites.front_default
            
    return (
        <article className="main__info">
            <section className="main__info--cabecera">
                <div className="main__info--img ">
                    <img src={pokeImg} alt={pokeName} className="img" />   
                </div>
                <div className="main__info--texto">
                    <h1 className="main__info--nombre">{primeraMayusc(pokeName)}</h1>
                    <p className="main__info--id">ID / {pokeId}</p>
                </div>
            </section>
            <div className="main__info--contenedor">
                <div className="main__info--descripcion">
                    <div></div>
                    <Link to={"/"} className="main__info--link">Volver</Link>
                </div>                
            </div>
        </article>
    )
}