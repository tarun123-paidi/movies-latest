import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { movies } from "../data/movies"
import MovieCard from "../components/MovieCard"
import ColumnSortTable from "../components/ColumnSortTable"

function Browse() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [genre, setGenre] = useState("All")
  const [sort, setSort] = useState("Newest")
  const [browsePage, setBrowsePage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)
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

  let filteredMovies = movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const genreMatch = genre === "All" || movie.genre === genre
    const yearMatch = year === "" || movie.year === Number(year)
    const dateMatch = date === "" || movie.date === date

    return searchMatch && genreMatch && yearMatch && dateMatch
  })

  if (sort === "AZ") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (sort === "ZA") {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title))
  }

  if (sort === "Newest") {
    filteredMovies.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  if (sort === "Oldest") {
    filteredMovies.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const moviesPerPage = 30
  const totalPages = 1
  const startIndex = (browsePage - 1) * moviesPerPage
  const currentMovies = filteredMovies
    .slice(startIndex, startIndex + moviesPerPage)
    .slice(0, visibleCount)

  const clearFilters = () => {
    setSearch("")
    setYear("")
    setDate("")
    setGenre("All")
    setSort("Newest")
    setBrowsePage(1)
    setShowFilter(false)
  }

  return (
    <div className="page bottom-space">
      <div className="browse-top">
        <h1>Browse Movies</h1>
        <button className="clear-btn" onClick={clearFilters}>
          Remove All
        </button>
      </div>

      <div className="filter-panel">
        <div className="field-box">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search movie name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setBrowsePage(1)
            }}
          />
        </div>

        <div className="field-box filter-box">
          <label>Filter</label>
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            Date & Year ▼
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              <input
                type="number"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                  setBrowsePage(1)
                }}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  setBrowsePage(1)
                }}
              />
            </div>
          )}
        </div>

        <div className="field-box">
          <label>Genre</label>
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value)
              setBrowsePage(1)
            }}
          >
            <option>All</option>
            <option>Action</option>
            <option>Sci-Fi</option>
            <option>Romance</option>
            <option>Horror</option>
            <option>Comedy</option>
            <option>Sports</option>
            <option>Adventure</option>
            <option>Drama</option>
            <option>Fantasy</option>
          </select>
        </div>

        <div className="field-box">
          <label>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="AZ">A → Z</option>
            <option value="ZA">Z → A</option>
            <option value="Newest">Latest → Old</option>
            <option value="Oldest">Old → Latest</option>
          </select>
        </div>
      </div>

      <ColumnSortTable movies={filteredMovies} />

      <div className="card-grid browse-grid">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
  <footer className="footer">
   <button onClick={() => navigate("/")}>
    ← Previous
  </button>

  <button onClick={() => navigate("/saved")}>
    Next →
  </button>
</footer>
     
    </div>
  )
}

export default Browse



































































/*import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { movies } from "../data/movies"
import MovieCard from "../components/MovieCard"
import ColumnSortTable from "../components/ColumnSortTable"

function Browse() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [year, setYear] = useState("")
  const [date, setDate] = useState("")
  const [genre, setGenre] = useState("All")
  const [sort, setSort] = useState("Newest")
  const [browsePage, setBrowsePage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)
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

  let filteredMovies = movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const genreMatch = genre === "All" || movie.genre === genre
    const yearMatch = year === "" || movie.year === Number(year)
    const dateMatch = date === "" || movie.date === date

    return searchMatch && genreMatch && yearMatch && dateMatch
  })

  if (sort === "AZ") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (sort === "ZA") {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title))
  }

  if (sort === "Newest") {
    filteredMovies.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  if (sort === "Oldest") {
    filteredMovies.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const moviesPerPage = 30
  const totalPages = 1
  const startIndex = (browsePage - 1) * moviesPerPage
  const currentMovies = filteredMovies
    .slice(startIndex, startIndex + moviesPerPage)
    .slice(0, visibleCount)

  const clearFilters = () => {
    setSearch("")
    setYear("")
    setDate("")
    setGenre("All")
    setSort("Newest")
    setBrowsePage(1)
    setShowFilter(false)
  }

  return (
    <div className="page bottom-space">
      <div className="browse-top">
        <h1>Browse Movies</h1>
        <button className="clear-btn" onClick={clearFilters}>
          Remove All
        </button>
      </div>

      <div className="filter-panel">
        <div className="field-box">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search movie name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setBrowsePage(1)
            }}
          />
        </div>

        <div className="field-box filter-box">
          <label>Filter</label>
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            Date & Year ▼
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              <input
                type="number"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                  setBrowsePage(1)
                }}
              />

              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  setBrowsePage(1)
                }}
              />
            </div>
          )}
        </div>

        <div className="field-box">
          <label>Genre</label>
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value)
              setBrowsePage(1)
            }}
          >
            <option>All</option>
            <option>Action</option>
            <option>Sci-Fi</option>
            <option>Romance</option>
            <option>Horror</option>
            <option>Comedy</option>
            <option>Sports</option>
            <option>Adventure</option>
            <option>Drama</option>
            <option>Fantasy</option>
          </select>
        </div>

        <div className="field-box">
          <label>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="AZ">A → Z</option>
            <option value="ZA">Z → A</option>
            <option value="Newest">Latest → Old</option>
            <option value="Oldest">Old → Latest</option>
          </select>
        </div>
      </div>

      <ColumnSortTable movies={filteredMovies} />

      <div className="card-grid browse-grid">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <footer className="footer">
        <button
          onClick={() => {
            if (browsePage > 1) setBrowsePage(browsePage - 1)
            else navigate("/")
          }}
        >
          ← Previous
        </button>
        

       <div className="page-numbers">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setBrowsePage(num)}
              className={browsePage === num ? "active-page" : ""}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (browsePage < totalPages) setBrowsePage(browsePage + 1)
          }}
        >
          Next →
        </button>
      </footer>
    </div>
  )
}

export default Browse*/