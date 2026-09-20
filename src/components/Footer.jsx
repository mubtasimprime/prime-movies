import { Link } from "react-router";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer footer-center gap-6 bg-base-300 p-10 text-base-content"
    >
      <aside>
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold"
        >
          <span>🎬</span>
          <span>
            Prime<span className="text-primary">Movies</span>
          </span>
        </Link>
        <p className="max-w-md text-base-content/60">
          Your gateway to trending movies and TV shows.
        </p>
        <p className="text-sm text-base-content/50">
          © 2026 PrimeMovies — Built for learning.
        </p>
      </aside>

      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/movies" className="link link-hover">
          Movies
        </Link>
        <a href="#trending" className="link link-hover">
          Trending
        </a>
      </nav>
    </footer>
  );
}
