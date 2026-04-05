import './css/App.css';
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites.jsx";
import Navbar from "./component/Navbar.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { useState, useEffect } from "react";

function App() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <MovieProvider>
            <Navbar />

            {/* 🌗 Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle">
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </main>
        </MovieProvider>
    );
}

export default App;