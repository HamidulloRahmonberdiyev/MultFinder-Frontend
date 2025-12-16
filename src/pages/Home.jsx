import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";
import DisneyMagicalHeader from "../components/ui/DisneyMagicalHeader";
import ThemeToggle from "../components/layout/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { filterMovies } from "../utils/filterMovies";
import { MOVIES } from "../data/movies";

function Home() {
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const filteredImages = filterMovies(MOVIES, search);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-32 px-4 bg-black/4 dark:bg-black/10 backdrop-blur-[4px] rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
        <DisneyMagicalHeader />

        {/* Navigation */}
        <div className="w-full max-w-2xl mb-8 flex justify-center gap-3">
          <Link
            to="/"
            className={`group relative px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/50 scale-105"
                : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Bosh sahifa
            </span>
            {location.pathname === "/" && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-75 animate-pulse"></div>
            )}
          </Link>
          <Link
            to="/cartoons"
            className={`group relative px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden ${
              location.pathname === "/cartoons"
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-xl shadow-pink-500/50 scale-105"
                : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Multfilmlar
            </span>
            {location.pathname === "/cartoons" && (
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-75 animate-pulse"></div>
            )}
          </Link>
        </div>

        <div className="w-full max-w-2xl mb-12 md:mb-16 animate-fade-in-up">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full animate-fade-in">
          <Gallery images={filteredImages} />
        </div>
      </main>
    </div>
  );
}

export default Home;

