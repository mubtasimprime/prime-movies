export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="card bg-base-200 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {movie.rating && (
          <span className="badge badge-warning absolute right-2 top-2 font-bold">
            ⭐ {movie.rating}
          </span>
        )}
      </figure>

      <div className="card-body gap-2 p-4">
        <h3 className="card-title line-clamp-1 text-base">{movie.title}</h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/60">
          <span>{movie.year}</span>
          <span>•</span>
          <span className="text-warning">
            {movie.rating ? `⭐ ${movie.rating}` : "Not rated"}
          </span>
        </div>

        <div className="card-actions mt-2">
          <button
            type="button"
            onClick={() => onSelect(movie)}
            className="btn btn-primary btn-sm btn-block"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}
