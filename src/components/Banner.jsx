import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getShows } from "../api/tvmaze";

export default function Banner() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    getShows(0)
      .then((shows) => {
        const withImage = shows.filter((show) => show.backdrop && show.rating);
        setFeatured(withImage[2] || withImage[0] || null);
      })
      .catch(() => setFeatured(null));
  }, []);

  return (
    <section
      className="hero relative min-h-[70vh] overflow-hidden"
      style={{
        backgroundImage: featured?.backdrop
          ? `url(${featured.backdrop})`
          : "linear-gradient(135deg, #1e1b4b, #0b0d14)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/85 to-base-100/40" />

      <div className="hero-content relative z-10 w-full max-w-6xl flex-col items-start px-4 py-20 text-left lg:px-10">
        <span className="badge badge-primary badge-lg mb-4 gap-2 font-semibold">
          🔥 Now Trending
        </span>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">
          Unlimited <span className="text-primary">Movies</span> & Shows, All in
          One Place.
        </h1>

        <p className="mt-5 max-w-xl text-base text-base-content/70 md:text-lg">
          Discover trending titles, explore genres, and dive into thousands of
          movies and TV shows powered by the TVMaze database. Your next favorite
          watch is one click away.
        </p>

        {featured && (
          <p className="mt-4 text-sm text-base-content/60">
            Featured: <span className="font-semibold">{featured.title}</span>
            {featured.rating && (
              <span className="ml-2 text-warning">⭐ {featured.rating}</span>
            )}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/movies" className="btn btn-primary btn-lg">
            Explore Movies
          </Link>
          <a href="#trending" className="btn btn-outline btn-lg">
            View Trending
          </a>
        </div>
      </div>
    </section>
  );
}
