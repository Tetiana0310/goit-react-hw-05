import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const apiKey = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjQwNmM2MTc3MWNkYTNhMGFiZTRmZGVlOWZlN2I5NiIsIm5iZiI6MTcyODU3NzUzMi43ODg3MTEsInN1YiI6IjY3MDdmZTQ5NjcxODAxMmZjMjMzZDI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kym_k_nYC1QkheI4huAL3tCMleG4_BDfKhRBRDzBduY"

export const fetchFilms = async () => {
    const { data } = await axios.get("trending/movie/day", {
     headers: {
    Authorization: apiKey
  }
    })
    return data.results
}

export const fetchFilmById = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`, {
    headers: {
      Authorization: apiKey,
    },
  });
  return data;
};

export const fetchFilmCast = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, {
    headers: {
      Authorization: apiKey,
    },
  });
  return data
}

