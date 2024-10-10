import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPAge/NotFoundPAge";  
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MoviePage from "./pages/MoviePage?MoviePage"
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
       <Route path="/movies/:movieId/cast" element={<MovieCast />} />
      <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}/>
   </Routes>
  )
}


