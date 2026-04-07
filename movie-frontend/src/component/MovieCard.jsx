import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext.jsx";
import { useState, useRef } from "react";
import { getMovieTrailer } from "../services/api.js";

function MovieCard({ movie, onPlay }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    const [hoverTrailer, setHoverTrailer] = useState(null);

    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(async () => {
            const key = await getMovieTrailer(
                movie.id,
                movie.first_air_date ? "tv" : "movie"
            );
            setHoverTrailer(key);
        }, 500); // prevent too many API calls
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setHoverTrailer(null);
    };

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    // ✅ Use poster first, then backdrop, then placeholder
    const imageUrl = hoverTrailer
        ? null
        : movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : "/placeholder.png"; // put a placeholder.png in your public folder

    return (
        <div
            className="movie-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="movie-poster">
                {hoverTrailer ? (
                    <iframe
                        className="hover-trailer"
                        src={`https://www.youtube.com/embed/${hoverTrailer}?autoplay=1&mute=1`}
                        title="Trailer"
                        allow="autoplay"
                    />
                ) : (
                    <img src={imageUrl} alt={movie.title || movie.name} />
                )}

                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {favorite ? "❤️" : "🤍"}
                    </button>
                    <button onClick={() => onPlay(movie)}>▶️</button>
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title || movie.name}</h3>
                <p>{(movie.release_date || movie.first_air_date)?.split("-")[0]}</p>
                <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
    );
}

export default MovieCard;