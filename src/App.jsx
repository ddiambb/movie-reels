import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
    </Routes>
  );
}