import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  function onSearch() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type) params.set("type", type);
    if (year) params.set("year", year);
    const qs = params.toString();
    const path = qs ? `/search?${qs}` : "/search";
    navigate(path);
    console.log("navigate ->", path);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  }

  return (
    <div className="Search" id="search">
      <input
        className="search__input"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <select
        className="search__input"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>

      <input
        className="search__input"
        type="number"
        placeholder="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <button className="search__btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
