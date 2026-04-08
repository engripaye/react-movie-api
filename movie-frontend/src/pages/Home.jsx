import MovieCard from "../component/MovieCard.jsx";
import { useRef } from "react";
import { useState, useEffect } from "react";
import TrailerModal from "../component/TrailerModal.jsx";
import {
    searchMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getMovieTrailer,
    getPopularTV,
    getKoreanTV,
    getLatestKoreanTV,
    getTelenovelas
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
    const [koreanSeries, setKoreanSeries] = useState([]);
    const [kdramaOfTheDay, setKdramaOfTheDay] = useState([]); // ✅ FIXED
    const [telenovelas, setTelenovelas] = useState([]);

    const recommended = Array.isArray(nowPlaying)
        ? nowPlaying.filter(movie => movie.vote_average > 7).slice(0, 20)
        : [];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [
                    pop,
                    now,
                    top,
                    tv,
                    korean,
                    latestKdrama,
                    telenovelaShows
                ] = await Promise.all([
                    getPopularMovies().catch(() => []),
                    getNowPlayingMovies().catch(() => []),
                    getTopRatedMovies().catch(() => []),
                    getPopularTV().catch(() => []),
                    getKoreanTV().catch(() => []),
                    getLatestKoreanTV().catch(() => []),
                    getTelenovelas().catch(() => [])
                ]);

                // ✅ LIMIT EVERYTHING TO 20
                setPopular(pop.slice(0, 20));
                setNowPlaying(now.slice(0, 20));
                setTopRated(top.slice(0, 20));
                setTvShows(tv.slice(0, 20));
                setTelenovelas(telenovelaShows.slice(0, 20));

                // ✅ Korean filtered + limited
                const koreanFiltered = korean
                    .filter(show => show.vote_average > 7)
                    .slice(0, 20);

                setKoreanSeries(koreanFiltered);

                // ✅ FIXED (no null crash)
                setKdramaOfTheDay(latestKdrama.slice(0, 20));

            } catch (err) {
                console.error(err);
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
            setPopular(results.slice(0, 20)); // ✅ keep UI consistent
        } catch (err) {
            console.error(err);
            setError("Search failed...");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenTrailer = async (movie) => {
        try {
            const key = await getMovieTrailer(
                movie.id,
                movie.first_air_date ? "tv" : "movie"
            );
            setSelectedTrailer(key);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies or series..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
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
                    <Section title="🇰🇷 Korean Series" movies={koreanSeries} onPlay={handleOpenTrailer} />

                    {kdramaOfTheDay.length > 0 && (
                        <Section
                            title="🔥 Korean Dramas of the Day"
                            movies={kdramaOfTheDay}
                            onPlay={handleOpenTrailer}
                        />
                    )}

                    <Section title="📺 Telenovelas" movies={telenovelas} onPlay={handleOpenTrailer} />
                </>
            )}

            <TrailerModal
                videoKey={selectedTrailer}
                onClose={() => setSelectedTrailer(null)}
            />
        </div>
    );
}

// ✅ SAFE SECTION COMPONENT
const Section = ({ title, movies = [], onPlay }) => {
    const rowRef = useRef(null);

    const scrollLeft = () => {
        rowRef.current.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        rowRef.current.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    };

    return (
        <div className="section">
            <div className="section-header">
                <h2>{title}</h2>

                <div className="scroll-buttons">
                    <button onClick={scrollLeft} className="scroll-btn">◀</button>
                    <button onClick={scrollRight} className="scroll-btn">▶</button>
                </div>
            </div>

            <div className="movies-row" ref={rowRef}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onPlay={() => onPlay(movie)}
                        />
                    ))
                ) : (
                    <div>No movies available</div>
                )}
            </div>
        </div>
    );
};


export default Home;