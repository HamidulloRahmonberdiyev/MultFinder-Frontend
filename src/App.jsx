import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import DisneyMagicalHeader from "./components/ui/DisneyMagicalHeader";
import ThemeToggle from "./components/layout/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { filterMovies } from "./utils/filterMovies";
import { MOVIES } from "./data/movies";

function App() {
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const filteredImages = filterMovies(MOVIES, search);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center justify-start pt-20 md:pt-32 px-4">
        <DisneyMagicalHeader />

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

export default App;
