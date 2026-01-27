import "./NavBar.css";


export default function NavBar({ title = "Movies", bgSrc = "/reel-assets/nav-bg.jpg", showBg = true }) {
  const hasBg = Boolean(showBg && bgSrc);

  return (
    <nav className={"nav" + (hasBg ? " nav--img" : "")}>
      {hasBg && <div className="nav__bg" style={{ backgroundImage: `url("${bgSrc}")` }} />}
      {hasBg && <div className="nav__shade" />}

      <div className="nav__left">
        <a href="/">
          <img
            className="nav__logo"
            src="/reel-assets/20200712_132207_Original.jpg"
            alt="site logo"
          />
        </a>
      </div>

      <div className="nav__center">
        <h1 className="nav__h1">{title}</h1>
      </div>

      <div className="nav__right" />
    </nav>
  );
}
