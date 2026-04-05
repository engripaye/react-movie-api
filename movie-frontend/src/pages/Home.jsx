import MovieCard from "../component/MovieCard.jsx";
import { useState, useEffect } from "react";
import TrailerModal from "../component/TrailerModal.jsx";
import {
    searchMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getMovieTrailer,
    getPopularTV
} from "../services/api.js";

import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // ⭐ Recommended movies
    const recommended = nowPlaying.filter(movie => movie.vote_average > 7);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pop, now, top, tv] = await Promise.all([
                    getPopularMovies(),
                    getNowPlayingMovies(),
                    getTopRatedMovies(),
                    getPopularTV()
                ]);

                setPopular(pop);
                setNowPlaying(now);
                setTopRated(top);
                setTvShows(tv);
            } catch (err) {
                console.log(err);
                setError("Failed to load content...");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setPopular(results);
        } catch (err) {
            setError("Search failed...");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenTrailer = async (id) => {
        const key = await getMovieTrailer(id);
        setSelectedTrailer(key);
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies or series..."
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
                    <Section title="🔥 Recommended Movies" movies={recommended} onPlay={handleOpenTrailer} />
                    <Section title="🆕 Now Playing" movies={nowPlaying} onPlay={handleOpenTrailer} />
                    <Section title="⭐ Popular Movies" movies={popular} onPlay={handleOpenTrailer} />
                    <Section title="🏆 Top Rated" movies={topRated} onPlay={handleOpenTrailer} />
                    <Section title="📺 Popular Series" movies={tvShows} onPlay={handleOpenTrailer} />
                </>
            )}

            <TrailerModal
                videoKey={selectedTrailer}
                onClose={() => setSelectedTrailer(null)}
            />
        </div>
    );
}

// ✅ Section Component
const Section = ({ title, movies, onPlay }) => (
    <div>
        <h2 style={{ margin: "1rem" }}>{title}</h2>
        <div className="movies-row">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={onPlay}
                />
            ))}
        </div>
    </div>
);

export default Home;