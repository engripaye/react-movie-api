import MovieCard from "../component/MovieCard.jsx";
import {useState, useEffect} from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css"
function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = getPopularMovies()

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
        setSearchQuery("")

    }


    return <div className="Home">

        <form onSubmit={handleSearch} className="search-form">
            <input type="test"
                   placeholder="search for movies"
                   className="search-input"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
        <div className="movies-grid">
            {movies.map(
                (movie) =>
                    (
                <MovieCard movie={movie} key={movie.id}/>
                )
                )
            }
        </div>
    </div>

}

export default Home