import { useEffect } from "react";

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-base-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 w-full overflow-hidden rounded-t-2xl md:h-72">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="btn btn-circle btn-sm absolute right-3 top-3 border-none bg-black/50 text-white hover:bg-black/70"
          >
            ✕
          </button>
        </div>

        <div className="-mt-10 flex flex-col gap-4 p-6">
          <div className="flex flex-wrap items-end gap-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="hidden h-40 w-28 flex-none rounded-lg object-cover shadow-lg sm:block"
            />
            <div>
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                {movie.rating && (
                  <span className="badge badge-warning font-bold">
                    ⭐ {movie.rating}
                  </span>
                )}
                <span className="badge badge-ghost">
                  Released: {movie.premiered}
                </span>
                <span className="badge badge-ghost">{movie.runtime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre} className="badge badge-primary badge-outline">
                {genre}
              </span>
            ))}
          </div>

          <div>
            <h3 className="mb-1 text-lg font-semibold">Overview</h3>
            <p className="leading-relaxed text-base-content/80">
              {movie.description}
            </p>
          </div>

          <div className="mt-2 flex justify-end">
            <button type="button" onClick={onClose} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
