import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Skeleton from "../components/Skeleton.jsx";

const API_KEY = "f99a07df";
const NO_POSTER = "https://via.placeholder.com/300x450?text=No+Poster";

export default function MovieDetails() {
  const { imdbID } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imdbID) return;

    (async () => {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await res.json();
        if (data?.Response === "False") {
          setError(data?.Error || "Movie not found");
        } else {
          setMovie(data);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [imdbID]);

  const navigate = useNavigate();

  function goBack() {
    navigate("/search", { state: { fromDetail: true, imdbID } });
  }

  return (
    <div className="page">
      <NavBar title="Details" variant="blue" showBg={true} bgSrc="/2063931.jpg" />

      <div className="pagePad">
        <button className="backBtn" onClick={goBack}>
          ← Back
        </button>

        {loading ? (
          <Skeleton type="details" />
        ) : error ? (
          <p>{error}</p>
        ) : movie ? (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <img
                src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : NO_POSTER}
                alt={movie.Title}
                style={{ width: 240, borderRadius: 10 }}
              />

              <div>
                <h2 style={{ margin: 0 }}>
                  {movie.Title} <span style={{ opacity: 0.7 }}>({movie.Year})</span>
                </h2>

                <p style={{ marginTop: 8, opacity: 0.9 }}>
                  <strong>Genre:</strong> {movie.Genre}
                </p>

                <p style={{ marginTop: 6 }}>
                  <strong>Actors:</strong> {movie.Actors}
                </p>

                <p style={{ marginTop: 6 }}>
                  <strong>Runtime:</strong> {movie.Runtime} • <strong>Rated:</strong> {movie.Rated}
                </p>

                <p style={{ marginTop: 12 }}>{movie.Plot}</p>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: 14 }}>No movie selected.</p>
        )}
      </div>
      <footer className="footer--img">
        <div
          className="footer__bg"
          style={{ backgroundImage: "url(/2063931.jpg)" }}
        />
        <div className="footer__shade" />
        <p className="footer__text">© 2025 MovieReels built with OMDb API</p>
      </footer>
    </div>
  );
}
