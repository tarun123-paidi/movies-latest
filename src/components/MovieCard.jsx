import { useState } from "react"

function MovieCard({ movie, removeButton, removeMovie }) {
  const [showPopup, setShowPopup] = useState(false)

  const saveMovie = () => {
    const savedMovies =
      JSON.parse(localStorage.getItem("savedMovies")) || []

    const alreadySaved = savedMovies.find(
      (item) => item.id === movie.id
    )

    if (!alreadySaved) {
      savedMovies.push(movie)
      localStorage.setItem("savedMovies", JSON.stringify(savedMovies))
    }

    alert("Movie saved successfully!")
    setShowPopup(false)
  }

  return (
    <>
      <div className="movie-card" onClick={() => setShowPopup(true)}>
        {removeButton && (
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation()
              removeMovie(movie.id)
            }}
          >
            ×
          </button>
        )}

        <img className="poster-img" src={movie.poster} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Released: {movie.date}</p>
        <p>Year: {movie.year}</p>
        <p>{movie.genre}</p>
        <p>⭐ {movie.rating}</p>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <button
              className="popup-close"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <img className="popup-img" src={movie.poster} alt={movie.title} />

            <div className="popup-info">
              <h2>{movie.title}</h2>
              <p><b>Released:</b> {movie.date}</p>
              <p><b>Year:</b> {movie.year}</p>
              <p><b>Genre:</b> {movie.genre}</p>
              <p><b>Rating:</b> ⭐ {movie.rating}</p>
              <p><b>Summary:</b> {movie.summary || movie.overview}</p>

              <button className="save-btn" onClick={saveMovie}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieCard