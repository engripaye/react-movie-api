import MovieCard from "../component/MovieCard.jsx";

function Home() {

    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1998"},
        {id: 3, title: "Matrix", release_date: "1999"},

    ];

    const handleSearch = () => {

    }


    return <div className="Home">

        <form onSubmit={handleSearch} className="search-form">
            <input type="test"
                   placeholder="search for movies"
                   className="search-input"/>
            <button type="submit" className="search-button">Search</button>
        </form>
        <div className="movies-grid">
            {movies.map(movie =>
                <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
}

export default Home