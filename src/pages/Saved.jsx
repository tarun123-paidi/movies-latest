import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MovieCard from "../components/MovieCard"

function Saved() {
  const navigate = useNavigate()

  const [savedMovies, setSavedMovies] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)

  useEffect(() => {
    const movies =
      JSON.parse(localStorage.getItem("savedMovies")) || []

    setSavedMovies(movies)
  }, [])

  const removeMovie = (id) => {
    const updatedMovies = savedMovies.filter(
      (movie) => movie.id !== id
    )

    setSavedMovies(updatedMovies)

    localStorage.setItem(
      "savedMovies",
      JSON.stringify(updatedMovies)
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => prev + 4)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (savedMovies.length === 0) {
    return (
      <div className="page empty">
        <h1>Your Saved Movie Bucket is Empty</h1>

        <button onClick={() => navigate("/browse")}>
          Browse Movies
        </button>

        <footer className="footer">
          <button onClick={() => navigate("/browse")}>
            ← Previous
          </button>
        </footer>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="saved-top">
        <h1>Saved Movie Bucket</h1>
      </div>

      <div className="card-grid browse-grid">
        {savedMovies.slice(0, visibleCount).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            removeButton={true}
            removeMovie={removeMovie}
          />
        ))}
      </div>

      <footer className="footer">
        <button onClick={() => navigate("/browse")}>
          ← Previous
        </button>
      </footer>
    </div>
  )
}

export default Saved