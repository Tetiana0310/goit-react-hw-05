import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFilmSearch } from "../../services/api";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (!searchQuery) return;

    const getFilmSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilmSearch(searchQuery);
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getFilmSearch();
  }, [searchQuery]);

  const onSearch = (query) => {
    setSearchParams({ query });
    setMovies([]);
  };

  return (
    <div>
      {loading && <p>Loading ...</p>}
      {error && <p>Some problems. Please try again later</p>}
      <SearchMovie onSearch={onSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
