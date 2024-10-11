import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchFilmById } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

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

  if (!movie) return null;

  const { poster_path, title, overview, release_date, vote_average, genres } =
    movie;
  return (
    <>
      {loading && <p>Loading ...</p>}
      {error && <p>Sorry, 404</p>}
      <div className={css.wrapper}>
        <Link className={css.link} to={back.current}>
          ← Go back
        </Link>
        <div className={css.movieContent}>
          {poster_path && (
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
            />
          )}
          <div className={css.info}>
            <h2>
              {title} ({release_date})
            </h2>
            <p>User Score: {vote_average.toFixed(1)} %</p>
            <p>Overview:</p>
            <p>{overview}</p>
            <p>Genres:</p>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2>Additional information</h2>
        <ul className={css.listNav}>
          <li>
            <NavLink className={css.navLink} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={css.navLink} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
