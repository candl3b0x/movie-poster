import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [source, setSource] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reply, setReply] = useState(false);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);

    if (movies) {
      setReply(true);
    } else {
      setReply(false);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} setSource={setSource} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">{reply ? "" : <h2> No movies found</h2>}</div>
      )}

      {source && (
        <div className="popup-image">
          <span onClick={() => setSource(null)}> &times;</span>
          <img src={source} alt={source} />
        </div>
      )}
    </div>
  );
};
export default App;
