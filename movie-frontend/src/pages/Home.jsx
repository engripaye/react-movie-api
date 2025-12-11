import MovieCard from "../component/MovieCard.jsx";
import {useState} from "react";
import "../css/Home.css"
function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1998"},
        {id: 3, title: "Matrix", release_date: "1999"},

    ];

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