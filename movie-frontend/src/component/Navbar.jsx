import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar({ toggleTheme, theme }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Engr. Ipaye's Movie App</Link>
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>

                {/*/!* ✅ ADD THIS *!/*/}
                {/*<button className="theme-toggle" onClick={toggleTheme}>*/}
                {/*    {theme === "dark" ? "🌞 Light" : "🌙 Dark"}*/}
                {/*</button>*/}
            </div>
        </nav>
    );
}

export default Navbar;