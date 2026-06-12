import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import Detail from "./pages/Detail"
import Saved from "./pages/Saved"

function App() {
  const [savedMovies, setSavedMovies] = useState([])

  const saveMovie = (movie) => {
    const exists = savedMovies.find((item) => item.id === movie.id)

    if (!exists) {
      setSavedMovies([...savedMovies, movie])
    }
  }

  const removeMovie = (movie) => {
    setSavedMovies(savedMovies.filter((item) => item.id !== movie.id))
  }

  return (
    <Routes>
      <Route path="/" element={<Home savedCount={savedMovies.length} />} />
      <Route path="/browse" element={<Browse />} />
      <Route
        path="/movie/:id"
        element={<Detail savedMovies={savedMovies} saveMovie={saveMovie} />}
      />
      <Route
        path="/saved"
        element={<Saved savedMovies={savedMovies} removeMovie={removeMovie} />}
      />
    </Routes>
  )
}

export default App