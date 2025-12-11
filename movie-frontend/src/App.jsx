import './App.css'
import Home from "./pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites.jsx";
import Navbar from "./component/Navbar.jsx";

function App() {


  return (
      <div>
          <Navbar />
      <main className="main-content">

          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/favorites" element={<Favorites />}/>

          </Routes>
      </main>

    </div>

  );



}

export default App
