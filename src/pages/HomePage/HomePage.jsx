import { fetchFilms } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilms();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {loading && <p>Loading ...</p>}
      {error && <p>Sorry, 404</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
