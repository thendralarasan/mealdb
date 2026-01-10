import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams
} from "react-router-dom";
import { motion } from "framer-motion";

const countries = [
  { label: "Indian", value: "Indian" },
  { label: "Italian", value: "Italian" },
  { label: "Canadian", value: "Canadian" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const hideSearchOnHome = location.pathname === "/";
  const isCategoryPage = location.pathname === "/category";

  const selectedCategory = searchParams.get("category");
  const selectedCountry = searchParams.get("country");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleCountryClick = (country) => {
    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (selectedCountry === country) {
   
      params.delete("country");
    } else {
      params.set("country", country);
    }

    navigate(`/category?${params.toString()}`);
  };

  return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col gap-4">

      
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              MealDB
            </Link>

            <Link to="/category">Categories</Link>
            <Link to="/favorites">Favorites</Link>
          </div>

          {!hideSearchOnHome && (
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
          )}
        </div>

        {isCategoryPage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mt-3"
          >
            {countries.map((c) => (
              <button
                key={c.value}
                onClick={() => handleCountryClick(c.value)}
                className={`px-5 py-2 rounded-full font-medium transition
                  ${
                    selectedCountry === c.value
                      ? "bg-emerald-600"
                      : "bg-emerald-700 hover:bg-emerald-600"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
