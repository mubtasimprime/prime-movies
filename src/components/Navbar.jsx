import { Link, NavLink } from "react-router";

const navLinks = (
  <>
    <li>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Movies
      </NavLink>
    </li>
    <li>
      <a href="#trending">Trending</a>
    </li>
    <li>
      <a href="#footer">About</a>
    </li>
  </>
);

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/80 px-4 shadow-md backdrop-blur-md lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-10 mt-3 w-52 gap-1 rounded-box bg-base-200 p-2 shadow-lg"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost gap-2 px-2 text-xl normal-case">
          <span className="text-2xl">🎬</span>
          <span className="font-extrabold tracking-tight">
            Prime<span className="text-primary">Movies</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1 font-medium">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/movies" className="btn btn-primary btn-sm md:btn-md">
          Browse Movies
        </Link>
      </div>
    </div>
  );
}
