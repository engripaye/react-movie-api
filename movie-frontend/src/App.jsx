import './App.css'
import MovieCard from "./component/MovieCard.jsx";

function App() {
  const movieNumber = 1;

  return (
      <>
        {movieNumber === 1 && <MovieCard movie={{title: "Tim's film", release_date: "2024"}}/>}

  </>
  );



}

export default App
