import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";
import DisneyMagicalHeader from "../components/ui/DisneyMagicalHeader";
import ThemeToggle from "../components/layout/ThemeToggle";
import { useTheme } from "../hooks/useTheme.jsx";
import { filterMovies } from "../utils/filterMovies";
import { MOVIES } from "../data/movies";
import Navbar from "../components/ui/Navbar.jsx";

function Home() {
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const filteredImages = filterMovies(MOVIES, search);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-10 px-4 bg-black/4 dark:bg-black/10 backdrop-blur-[4px] rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
        <DisneyMagicalHeader />

        <Navbar />

        <div className="w-full max-w-2xl mb-8 md:mb-5 animate-fade-in-up">
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

