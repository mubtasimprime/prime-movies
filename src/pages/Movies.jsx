import { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Loading from "../components/Loading";
import { getShows, searchShows } from "../api/tvmaze";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const query = search.trim();

    const timer = setTimeout(() => {
      setLoading(true);
      setError("");

      const request = query ? searchShows(query) : getShows(0);
      request
        .then((data) => {
          setMovies(data);
          setActiveGenre("All");
        })
        .catch(() => setError("Could not load movies. Please try again."))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  const genres = useMemo(() => {
    const genres = new Set(["All"]);
    movies.forEach((movie) =>
      movie.genres.forEach((genre) => genres.add(genre)),
    );
    return [...genres];
  }, [movies]);

  const visibleMovies = useMemo(() => {
    if (activeGenre === "All") return movies;
    return movies.filter((movie) => movie.genres.includes(activeGenre));
  }, [movies, activeGenre]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-10">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Browse Movies & Shows</h1>
        <p className="mt-2 text-base-content/60">
          Type to search the TVMaze database in real time.
        </p>
      </div>

      <div className="mx-auto mb-6 flex max-w-2xl items-center gap-2">
        <label className="input input-bordered input-lg flex w-full items-center gap-2">
          <span className="text-base-content/50">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies by title, e.g. Breaking Bad…"
            className="grow"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </label>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`btn btn-sm ${
              activeGenre === genre ? "btn-primary" : "btn-ghost btn-outline"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : visibleMovies.length === 0 ? (
        <div className="py-20 text-center text-base-content/60">
          <p className="text-2xl">No movies found.</p>
          <p className="mt-2">Try a different search or genre.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-base-content/60">
            Showing {visibleMovies.length} result
            {visibleMovies.length !== 1 && "s"}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />
            ))}
          </div>
        </>
      )}
      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
