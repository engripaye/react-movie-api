# 🎬 React Movie Explorer

A modern React application that consumes a public Movie API (TMDB or any custom movie API) to display trending films, search titles, view detailed information, and provide a smooth, responsive user experience.

---

## 🚀 Features

✔ **Browse Trending Movies** – Fetches live data from a movie API
✔ **Search Movies** – Real-time search powered by API queries
✔ **Movie Details Page** – Overview, poster, ratings, release date, cast, and more
✔ **Responsive UI** – Fully mobile-friendly layout
✔ **Reusable Components** – Cards, lists, modals, loaders
✔ **API Integration with Axios/Fetch**
✔ **Clean Folder Structure & Modular Codebase**
✔ **Environment Variables for API Keys**
✔ **Error Handling & Loading States**

---

## 🛠️ Tech Stack

**Frontend:**

* React 18
* Vite / CRA (depending on setup)
* Axios / Fetch API
* React Router
* TailwindCSS / CSS Modules / Styled Components

**API:**

* TMDB Movie API (or any other movie REST API)

---

## 📁 Project Structure

```
src/
 ├── components/
 │     ├── MovieCard.jsx
 │     ├── Navbar.jsx
 │     └── Loader.jsx
 ├── pages/
 │     ├── Home.jsx
 │     ├── Search.jsx
 │     └── MovieDetails.jsx
 ├── services/
 │     └── movieService.js
 ├── assets/
 ├── App.jsx
 ├── main.jsx
.env
```

---

## 🔌 API Configuration

Create a `.env` file in the root directory:

```
VITE_MOVIE_API_KEY=your_api_key_here
VITE_MOVIE_BASE_URL=https://api.themoviedb.org/3
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/react-movie-explorer.git
cd react-movie-explorer
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

---

## 🔍 Example API Service (`movieService.js`)

```javascript
import axios from "axios";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
const baseUrl = import.meta.env.VITE_MOVIE_BASE_URL;

export const getTrendingMovies = async () => {
  const response = await axios.get(`${baseUrl}/trending/movie/week`, {
    params: { api_key: apiKey }
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: { api_key: apiKey, query }
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseUrl}/movie/${id}`, {
    params: { api_key: apiKey }
  });
  return response.data;
};
```

---

## 🖥️ Screenshots (Optional)

*Add your app screenshots here: homepage, search page, movie details page.*

---

## 🧪 Improvements (Roadmap)

🔹 Add user authentication
🔹 Add watchlist / favorites
🔹 Add movie trailers (YouTube embed)
🔹 Add pagination or infinite scroll
🔹 Add dark/light mode

---

## 🤝 Contributing

Contributions are welcome!
Please open an issue or submit a pull request.

---

## 📝 License

This project is open source and available under the **MIT License**.

---
