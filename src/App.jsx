import './App.css'
import Buscador from './components/Buscador'
import MainContainer from './components/MainContainer'
import BotonCarga from './components/BotonCarga'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import PokemonInfo from './components/PokemonInfo'


export const urlContext = createContext()

function App() {
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null)

  const pokeEvo = (a) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${a}`)
    .then((resp) => resp.json())
  }
  
  const pokeList = () => {
      return fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((resp) => resp.json())
      .then((data) => data.results.map((p,i) => ({name: p.name, id: i + 1, url: p.url})))
  }

  const [pokeLista, setPokeLista] = useState([])
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
      pokeList().then((data) => setPokeLista(data))
  }, [])

  const resultadosFiltrados = pokeLista.filter(pokemon =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  const primeraMayusc = (palabra) => {
    return (
      palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
  }

  return (
    <>
    <urlContext.Provider value={{ busqueda, setBusqueda, currentUrl, setCurrentUrl, next, setNext, previous, setPrevious, pokeEvo, pokeList, primeraMayusc, pokeLista, setTipoSeleccionado, tipoSeleccionado }}>
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <main className="main">
              <Buscador/>
              <MainContainer/>
            </main>
            <BotonCarga/>
          </>
        }>
      </Route>
      <Route path="/pokemon/:id" element={<PokemonInfo/>}/>
    </Routes>
    </urlContext.Provider>
    </>
  )
}

export default App
