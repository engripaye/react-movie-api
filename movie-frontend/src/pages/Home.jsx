import MovieCard from "../component/MovieCard.jsx";
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
    getPopularNollywood
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
    const [kdramaOfTheDay, setKdramaOfTheDay] = useState(null);
    const [nollywood, setNollywood] = useState([]);

    const recommended = Array.isArray(nowPlaying)
        ? nowPlaying.filter(movie => movie.vote_average > 7)
        : [];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [pop, now, top, tv, korean, latestKdrama, nollywoodMovies] = await Promise.all([
                    getPopularMovies().catch(() => []),
                    getNowPlayingMovies().catch(() => []),
                    getTopRatedMovies().catch(() => []),
                    getPopularTV().catch(() => []),
                    getKoreanTV().catch(() => []),
                    getLatestKoreanTV().catch(() => []),
                    getPopularNollywood().catch(() => [])
                ]);

                setPopular(pop || []);
                setNowPlaying(now || []);
                setTopRated(top || []);
                setTvShows(tv || []);

                // Popular Korean dramas (top-rated)
                const koreanFiltered = (korean || []).filter(
                    show => show.vote_average > 7
                );
                setKoreanSeries(koreanFiltered);

                // Latest Korean dramas for hero section (take first 7–10)
                if (latestKdrama && latestKdrama.length > 0) {
                    setKdramaOfTheDay(latestKdrama.slice(0, 10)); // top 10 latest
                }

                setNollywood(nollywoodMovies || []);

            } catch (err) {
                console.error(err);
                setError("Failed to load content...");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSearch = async e => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setPopular(Array.isArray(results) ? results : []);
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
                    <Section
                        title="🇰🇷 Korean Series"
                        movies={koreanSeries}
                        onPlay={handleOpenTrailer}
                    />
                    {/* 🔥 Korean Dramas of the Day */}
                    {kdramaOfTheDay.length > 0 && (
                        <Section
                            title="🔥 Korean Dramas of the Day"
                            movies={kdramaOfTheDay}
                            onPlay={handleOpenTrailer}
                        />
                    )}

                    <Section
                        title="🎬 Popular Nollywood Movies"
                        movies={nollywood}
                        onPlay={handleOpenTrailer}
                    />


                </>
            )}

            <TrailerModal
                videoKey={selectedTrailer}
                onClose={() => setSelectedTrailer(null)}
            />
        </div>
    );
}

// ✅ Safe Section Component
const Section = ({ title, movies = [], onPlay }) => (
    <div>
        <h2 style={{ margin: "1rem" }}>{title}</h2>
        <div className="movies-row">
            {Array.isArray(movies) && movies.length > 0 ? (
                movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onPlay={() => onPlay(movie)} />
                ))
            ) : (
                <div style={{ margin: "1rem" }}>No movies available</div>
            )}
        </div>
    </div>
);

export default Home;