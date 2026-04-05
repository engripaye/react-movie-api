import MovieCard from "../component/MovieCard.jsx";
import { useState, useEffect } from "react";
import {
    searchMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies
} from "../services/api.js";

import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const recommended = nowPlaying.filter(movie => movie.vote_average > 7);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const [pop, now, top] = await Promise.all([
                    getPopularMovies(),
                    getNowPlayingMovies(),
                    getTopRatedMovies()
                ]);

                setPopular(pop);
                setNowPlaying(now);
                setTopRated(top);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);



    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setPopular(results); // reuse section
        } catch (err) {
            setError("Search failed...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <Section title="🔥 Recommended Movies" movies={recommended} />
                    <Section title="🆕 Now Playing" movies={nowPlaying} />
                    <Section title="⭐ Popular Movies" movies={popular} />
                    <Section title="🏆 Top Rated" movies={topRated} />
                </>
            )}
        </div>
    );
}



const Section = ({ title, movies }) => (
    <div>
        <h2 style={{ margin: "1rem" }}>{title}</h2>
        <div className="movies-grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
);

export default Home;