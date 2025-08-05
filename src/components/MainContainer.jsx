import { useContext, useState, useEffect } from "react"
import { urlContext } from "../App";
import Carta from "./Carta";
import '../styles/cartaStyle.css'

export default function MainContainer () {
    const { currentUrl, setNext, setPrevious, busqueda, setBusqueda, pokeLista, tipoSeleccionado, setTipoSeleccionado } = useContext(urlContext)
    const [pokemonList, setPokemonList] = useState([])
    
    useEffect(() => {
        setPokemonList([])

        if(!tipoSeleccionado && busqueda.trim() === ""){
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })        
            fetch(currentUrl)
                .then((res) => {
                    if (!res.ok){
                        throw new Error (error)
                    }
                    return res.json()
                })
                    .then((data) => {
                        setNext(data.next)
                        setPrevious(data.previous)
                        const pokemons = data.results

                        return Promise.all(
                            pokemons.map((e) => 
                                fetch(e.url).then((res) => {
                                    if (!res.ok) {
                                        throw new Error (error)
                                    }
                                    return res.json()
                                }
                            )
                        )
                        )
                    })

                        .then((fullData) => {
                                setPokemonList(fullData)
                        }) 
        } else if (busqueda){
            setNext(null)
            setPrevious(null)
            setTipoSeleccionado(null)

            const filtrados = pokeLista.filter(pokemon => 
                pokemon.name.toLowerCase().includes(busqueda.toLowerCase()) && pokemon.id <=1302)

            Promise.all(
                filtrados.map(p => 
                    fetch(p.url)
                        .then(res => {
                            if(!res.ok) throw new Error (error)
                            return res.json()
                        })
                )
            )

            .then(fullData => {
                const filtradosFinales = fullData.filter(pokemon => pokemon.id <=1302)
                setPokemonList(filtradosFinales)
            })
            .catch(() => setPokemonList([]))
        } else if (tipoSeleccionado){
            setNext(null)
            setPrevious(null)
            setBusqueda("")

            fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`)
                .then(res => res.json())
                .then((data) => {
                    const pokemons = data.pokemon.map(p => p.pokemon)

                    return Promise.all(
                        pokemons.map(p =>
                          fetch(p.url)
                            .then(res => {
                              if (!res.ok) throw new Error("Error al cargar Pokémon")
                              return res.json()})))
                })
                .then((fullData) => {
                    const filtradosFinales = fullData.filter(
                    (pokemon) => pokemon.id <= 1302);
                
                    setPokemonList(filtradosFinales);
                })
        }

    }, [currentUrl, busqueda, tipoSeleccionado])

    return (
        <section className="main__container">
            {pokemonList.map((p) => (<Carta key={p.id} pokemon ={p}></Carta>))}
        </section>
    )
}