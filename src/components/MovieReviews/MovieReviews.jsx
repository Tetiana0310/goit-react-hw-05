import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmReviews } from "../../services/api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFilmReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFilmReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getFilmReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading ...</p>}
      {error && <p>Sorry, 404</p>}
      {!loading && !error && reviews.length === 0 && (
        <p>Sorry. We don't have reviews.</p>
      )}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((item) => (
            <li key={item.id}>
              <h2>Author: {item.author}</h2>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
