import NavBar from "../components/NavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  return (
    <div className="page">
      <NavBar title="Movie Reels" showBg={false} />

      <header className="hero">
        <div className="hero__text">
          <h1 className="hero__h1">Movie Reels</h1>
          <h2 className="hero__h2">Find movies, series, and episodes fast.</h2>
          <h3 className="hero__h3">
            Search by title, filter by type, and narrow by year.
          </h3>
        </div>

        <img
          className="hero__img"
          src="/reel-assets/AdobeStock_1756116270.jpeg"
          alt="Cinema seats"
        />
      </header>

      <section className="homeSearch">
        <SearchBar />
      </section>
      <section className="imageGrid">
        <img className="imageGrid__img" src="/reel-assets/AdobeStock_9313023.jpeg" alt="Promo 2" />
        <img className="imageGrid__img" src="/reel-assets/AdobeStock_1519436537_Preview.jpeg" alt="Promo 1" />
        <img className="imageGrid__img" src="/reel-assets/AdobeStock_1158763149.jpeg" alt="Promo 4" />
        <img className="imageGrid__img" src="/reel-assets/AdobeStock_960815742.jpeg" alt="Promo 3" />
      </section>

    </div>
  );
}
