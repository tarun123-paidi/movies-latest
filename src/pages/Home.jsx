import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { movies } from "../data/movies"
import MovieCard from "../components/MovieCard"

function Home({ savedCount }) {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [search, setSearch] = useState("")

  const carouselMovies = movies.slice(0, 12)

const [visibleCount, setVisibleCount] = useState(8)

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

 /* useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev === 2 ? 0 : prev+1))
    }, 3000)

    return () => clearInterval(timer)
  }, [])*/

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/browse?search=${search}`)
  }



/*useEffect(() => {
  const timer = setInterval(() => {
    setSlide((prev) => (prev === 2 ? 0 : prev + 1))
  }, 3000)

  return () => clearInterval(timer)
}, [])*/

const changeSlide = (direction) => {
  if (direction === "next") {
    setSlide((prev) => (prev === 2 ? 0 : prev + 1))
  } else {
    setSlide((prev) => (prev === 0 ? 2 : prev - 1))
  }
}

  return (
    <div className="page">
      <header className="home-header">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movie name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="home-actions">
          <button onClick={() => navigate("/browse")} className="browse-btn">
            Browse
          </button>

          <button onClick={() => navigate("/saved")} className="saved-btn">
            Saved Movies ({savedCount})
          </button>
        </div>
      </header>

      <h1>Movie Browser</h1>

      <div className="section-title">
        <h2>Trending Movies</h2>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left-arrow" onClick={()=>changeSlide("prev")}>
          ‹
        </button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {carouselMovies.map((movie) => (
              <div className="carousel-card" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-arrow right-arrow" onClick={()=>changeSlide("next")}>
          ›
        </button>
      </div>

      <div className="carousel-dots">
       
      {[0, 1, 2].map((dot) => (
    <button
      key={dot}
      className={slide === dot ? "active-dot" : ""}
      onClick={() => setSlide(dot)}
    ></button>
  ))}

      </div>
    </div>
  )
}

export default Home
