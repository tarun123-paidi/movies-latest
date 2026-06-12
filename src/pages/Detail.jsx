import { useNavigate, useParams } from "react-router-dom"
import { movies } from "../data/movies"

function Detail({ savedMovies, saveMovie }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const movie = movies.find((item) => item.id === Number(id))

  if (!movie) {
    return <h1>Movie Not Found</h1>
  }

  const isSaved = savedMovies.some((item) => item.id === movie.id)

  const handleSave = () => {
    saveMovie(movie)
    navigate("/")
  }

  return (
    <div className="page detail-page">

      
      <div className="detail-actions">
        
          
        <button onClick={handleSave} className="save-top-btn">
          {isSaved ? "Saved ✓ Go Home" : "Save Movie"}
        </button>

      </div>

      <div className="detail-card">
        <img src={movie.poster} alt={movie.title} className="detail-img" />

        <div className="detail-info">
          <h1>{movie.title}</h1>

          <div className="movie-meta">
            <p><b>Year:</b> {movie.year}</p>
            <p><b>Release Date:</b> {movie.date}</p>
            <p><b>Genre:</b> {movie.genre}</p>
            <p><b>Rating:</b> ⭐ {movie.rating}</p>
          </div>

          <div className="summary-box">
            <h2>Summary</h2>
            <p>{movie.summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
