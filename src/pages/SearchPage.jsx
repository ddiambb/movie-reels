import "./SearchPage.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Skeleton from "../components/Skeleton.jsx";

const API_KEY = "f99a07df";
const NO_POSTER = "https://via.placeholder.com/300x450?text=No+Poster";

export default function SearchPage() {
  const location = useLocation();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const q = params.get("q") || "";
  const type = params.get("type") || "";
  const year = params.get("year") || "";

  const fromDetail = location.state?.fromDetail;
  const returnedImdb = location.state?.imdbID;

  const [favMovie, setFavMovie] = useState(null);

  useEffect(() => {
    if (!fromDetail || !returnedImdb) return;

    let mounted = true;

    (async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${returnedImdb}`,
        );
        const data = await res.json();
        if (mounted && data && data.Response !== "False") {
          setFavMovie({ Title: data.Title, Poster: data.Poster });
        }
      } catch (e) {
        console.error("fav fetch", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [fromDetail, returnedImdb]);

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) return;

    (async () => {
      setLoading(true);
      setError("");
      setMovies([]);

      try {
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}`;
        if (type) url += `&type=${type}`;
        if (year) url += `&y=${year}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data?.Response === "False") {
          setMovies([]);
          return;
        }

        setMovies((data.Search || []).slice(0, 10)); //  8 movies
      } catch (e) {
        console.error(e);
        setError("Failed to load movies. Try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [q, type, year]);

  return (
    <div className="page">
      <NavBar title="Results" showBg={true} bgSrc="/2063931.jpg" />

      <div className="pagePad">
        <Link className="backBtn" to="/">
          ← Back
        </Link>

        {fromDetail ? (
          <div className="favPosterLarge">
            <h1 className="searchTitleSide">Movie</h1>

            <div className="favPosterLarge__wrap">
              {favMovie?.Poster && favMovie.Poster !== "N/A" ? (
                <img
                  className="favPosterLarge__img"
                  src={favMovie.Poster}
                  alt={favMovie.Title}
                />
              ) : (
                <div className="favPosterLarge__placeholder" />
              )}

              <div className="favPosterLarge__title">
                {favMovie?.Title || "Favorite"}
              </div>
            </div>
          </div>
        ) : (
       
          <h1 className="searchTitle">Movie</h1>
        )}
        <SearchBar />

        {!q ? <p>Type a movie and hit Search.</p> : null}
        {loading ? <Skeleton type="grid" count={8} /> : null}
        {!loading && q && movies.length === 0 && !error ? (
          <p>No movies found.</p>
        ) : null}
        {error ? <p>{error}</p> : null}

        <div className="resultsGrid">
          {movies.map((m) => {
            const poster =
              m.Poster && m.Poster !== "N/A" ? m.Poster : NO_POSTER;

            return (
              <Link
                className="resultCard"
                key={m.imdbID}
                to={`/movie/${m.imdbID}${location.search}`}
              >
                <img className="resultImg" src={poster} alt={m.Title} />
                <div className="resultMeta">
                  <div className="resultTitle">{m.Title}</div>
                  <div className="resultYear">{m.Year}</div>
                </div>
              </Link>
            );
          })}
        </div>
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
