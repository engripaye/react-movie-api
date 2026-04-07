const API_KEY = "2a523adf071b2222307a4fb87ed980c4"
const BASE_URL = "https://api.themoviedb.org/3"


export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    return data.results
};

export const getNowPlayingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
};

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
};

export const getMovieTrailer = async (id, type = "movie") => {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();

    const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return trailer ? trailer.key : null;
};

export const getPopularTV = async () => {
    const res = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
};

export const getKoreanTV = async () => {
    const res = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`
    );
    const data = await res.json();
    return data.results;
};
