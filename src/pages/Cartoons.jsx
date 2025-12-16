import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CartoonCard from "../components/cartoons/CartoonCard";
import ThemeToggle from "../components/layout/ThemeToggle";
import { useTheme } from "../hooks/useTheme";

const Cartoons = () => {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const debounceTimer = useRef(null);

  const fetchCartoons = async (titleParam = "") => {
    try {
      setLoading(true);
      
      // API URL ni yaratish - title parametri bilan
      let apiUrl = "https://apimultifinder.unicrm.org/api/films";
      if (titleParam.trim()) {
        const params = new URLSearchParams({ title: titleParam.trim() });
        apiUrl += `?${params.toString()}`;
      }
      
      console.log("API so'rovi:", apiUrl);
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
      
      const data = await response.json();
      console.log("API dan kelgan ma'lumot:", data);
      
      // API javobi {success: true, data: [], pagination: {...}} formatida
      let filmsData = [];
      if (data.success && data.data && Array.isArray(data.data)) {
        filmsData = data.data;
      } else if (Array.isArray(data)) {
        filmsData = data;
      } else if (data.films && Array.isArray(data.films)) {
        filmsData = data.films;
      } else if (data.results && Array.isArray(data.results)) {
        filmsData = data.results;
      } else {
        console.warn("API javobi kutilgan formatda emas:", data);
        filmsData = [];
      }
      
      console.log("Films ma'lumotlari:", filmsData);
      setCartoons(filmsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("API xatosi:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dastlabki yuklash
  useEffect(() => {
    fetchCartoons();
  }, []);

  // Qidiruv o'zgarganda API ga so'rov yuborish (debounce bilan)
  useEffect(() => {
    // Avvalgi timer ni tozalash
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Yangi timer o'rnatish - 500ms kutadi
    debounceTimer.current = setTimeout(() => {
      fetchCartoons(search);
    }, 500);

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-32 px-4 bg-black/4 dark:bg-black/10 backdrop-blur-[4px] rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Multfilmlar
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Sevimli multfilmlarni tomosha qiling
            </p>
            
            {/* Navigation */}
            <div className="flex justify-center gap-3">
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
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Multfilm qidirish..."
                className="w-full px-6 py-4 pl-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl max-w-md mx-auto">
                <p className="font-semibold">Xatolik!</p>
                <p className="mt-2">{error}</p>
              </div>
            </div>
          )}

          {/* Cartoons Grid */}
          {!loading && !error && (
            <div className="animate-fade-in">
              {cartoons.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {search ? "Hech narsa topilmadi" : "Multfilmlar topilmadi"}
                  </p>
                  {search && (
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      "{search}" bo'yicha qidiruv natijasi
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      {search ? `"${search}" bo'yicha topildi: ${cartoons.length} ta` : `Jami: ${cartoons.length} ta multfilm`}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                    {cartoons.map((cartoon, index) => {
                      return (
                        <CartoonCard 
                          key={cartoon.id || cartoon._id || index} 
                          cartoon={{ ...cartoon, index }} 
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cartoons;

