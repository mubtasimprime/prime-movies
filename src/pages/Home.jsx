import { useEffect, useState } from "react";
import { Link } from "react-router";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Loading from "../components/Loading";
import { getShows } from "../api/tvmaze";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getShows(0)
      .then((shows) => {
        const top = [...shows]
          .filter((show) => show.rating)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        setTrending(top);
      })
      .catch(() => setTrending([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Banner />
      <section id="trending" className="mx-auto max-w-7xl px-4 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <p className="mt-1 text-base-content/60">
              The highest-rated titles right now.
            </p>
          </div>
          <Link to="/movies" className="btn btn-outline btn-sm">
            See all →
          </Link>
        </div>

        {loading ? (
          <Loading label="Loading trending titles…" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-base-200 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3">
          <div>
            <div className="text-4xl font-extrabold text-primary">10k+</div>
            <p className="mt-1 text-base-content/60">Movies & TV Shows</p>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-primary">Live</div>
            <p className="mt-1 text-base-content/60">Data from TVMaze API</p>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-primary">Free</div>
            <p className="mt-1 text-base-content/60">No account needed</p>
          </div>
        </div>
      </section>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
