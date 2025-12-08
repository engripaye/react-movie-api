import MovieCard from "../component/MovieCard.jsx";

function Home() {

    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1998"},
        {id: 3, title: "Matrix", release_date: "1999"},

    ]


    return <div className="Home">

        <form></form>
        <div className="movies-grid">
            {movies.map(movie =>
                <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
}

export default Home