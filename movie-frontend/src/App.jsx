import './App.css'
import MovieCard from "./component/MovieCard.jsx";

function App() {
  const movieNumber = 1;

  return (
      <>
        {movieNumber === 1 ? (<MovieCard movie={{title: "Tim's film", release_date: "2024"}}/>)
            : (
            <MovieCard movie={{title: "Joe's film", release_date: "2021"}}/>
          )}

  </>
  );



}

export default App
