import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const countries = [
  { label: "Indian", value: "Indian" },
  { label: "Italian", value: "Italian" },
  { label: "Canadian", value: "Canadian" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activecountry = params.get("country");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col gap-4">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">MealDB</Link>
            <Link to="/">Categories</Link>
            <Link to="/favorites">Favorites</Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64"
              placeholder="search meals"
            />
            <button
              type="submit"
              className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100"
            >
              search
            </button>
          </form>
        </div>

        {/* Country buttons */}
        <div className="flex justify-center gap-4">
          {countries.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                if (activecountry === c.value) {
                  navigate("/");
                } else {
                  navigate(`/?country=${c.value}`);
                }
              }}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activecountry === c.value
                  ? "bg-white text-emerald-900"
                  : "bg-emerald-700 text-white hover:bg-emerald-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

      </nav>
    </header>
  );
};

export default Header;
