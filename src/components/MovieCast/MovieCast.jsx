import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmCast } from "../../services/api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFilmCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilmCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getFilmCast();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      {loading && <p>Loading ...</p>}
      {error && <p>Sorry, 404</p>}
      {!loading && !error && cast.length === 0 && (
        <p>Sorry. We don't know the information</p>
      )}
      {cast.length > 0 && (
        <ul>
          {cast.map((item) => (
            <li key={item.id}>
              {item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                  alt={item.name}
                  width="100"
                />
              ) : (
                <p>No image</p>
              )}
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
