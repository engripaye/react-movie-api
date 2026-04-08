const API_KEY = "2a523adf071b2222307a4fb87ed980c4"
const BASE_URL = "https://api.themoviedb.org/3"


const fetchMultiplePages = async (url, pages = 2) => {
    let results = [];

    for (let i = 1; i <= pages; i++) {
        const res = await fetch(`${url}&page=${i}`);
        const data = await res.json();
        results = [...results, ...(data.results || [])];
    }

    return results;
};


export const getPopularMovies = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
        2
    );
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    return data.results
};

export const getNowPlayingMovies = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
        2
    );
};

export const getTopRatedMovies = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
        2
    );
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
    return await fetchMultiplePages(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
        2
    );
};

export const getKoreanTV = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`,
        2
    );
};
export const getLatestKoreanTV = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&sort_by=first_air_date.desc`,
        2
    );
};

// Get popular Telenovelas (Spanish/Latin dramas)
export const getTelenovelas = async () => {
    return await fetchMultiplePages(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=es&sort_by=popularity.desc`,
        2
    );
};
