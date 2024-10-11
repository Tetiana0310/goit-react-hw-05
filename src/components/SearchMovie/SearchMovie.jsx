import React from "react";
import toast from "react-hot-toast";
import css from "./SearchMovie.module.css";

export default function SearchMovie({ onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const queryMovies = form.elements.query.value.trim();

    if (queryMovies === "") {
      toast.error("Please, enter your request!");
      return;
    }
    onSearch(queryMovies);
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        name="query"
        type="text"
        autoComplete="off"
        autoFocus
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
