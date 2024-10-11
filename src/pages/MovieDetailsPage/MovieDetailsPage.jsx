import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchFilmById } from "../../services/api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const back = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getFilmById = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilmById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getFilmById();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry, 404</p>;
  if (!movie) return null;

  const { poster_path, title, overview, release_date, vote_average, genres } =
    movie;

  return (
    <div>
      <div>
        <Link to={back.current}>← Go back</Link>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
          />
        )}
      </div>
      <div>
        <ul>
          <li>
            <h2>
              {title} ({release_date})
            </h2>
          </li>
          <li>
            <p>User Score: {vote_average.toFixed(1)} %</p>
          </li>
          <li>
            <p>Overview: </p>
            <p>{overview}</p>
          </li>
          <li>
            <p>Genres:</p>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
