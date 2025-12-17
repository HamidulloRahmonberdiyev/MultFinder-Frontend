import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../components/layout/ThemeToggle";
import { useTheme } from "../hooks/useTheme.jsx";
import { filmsAPI } from "../services/api";

const CartoonShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [cartoon, setCartoon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartoon = async () => {
      if (!id) {
        setError("ID topilmadi");
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await filmsAPI.getFilmById(id);

      if (result.success) {
        setCartoon(result.data);
        setError(null);
      } else {
        setError(result.error);
        setCartoon(null);
      }

      setLoading(false);
    };

    fetchCartoon();
  }, [id]);

  const title =
    cartoon?.title || cartoon?.name || cartoon?.nomi || "Nomsiz multfilm";
  const description =
    cartoon?.description || cartoon?.desc || cartoon?.tavsif || "";
  const video_url =
    cartoon?.video_url ||
    cartoon?.videoUrl ||
    cartoon?.video ||
    cartoon?.url ||
    "";

  const getRating = (cartoonTitle) => {
    let hash = 0;
    for (let i = 0; i < cartoonTitle.length; i++) {
      hash = cartoonTitle.charCodeAt(i) + ((hash << 5) - hash);
    }
    const rating = 3.5 + (Math.abs(hash) % 15) / 10;
    return Math.round(rating * 10) / 10;
  };

  const rating = cartoon ? getRating(title) : 0;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 md:pt-20 px-4 pb-16 bg-black/4 dark:bg-black/10 backdrop-blur-[4px] rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
        <div className="w-full max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Orqaga
            </button>
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
          {error && !loading && (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl max-w-md mx-auto">
                <p className="font-semibold">Xatolik!</p>
                <p className="mt-2">{error}</p>
                <button
                  onClick={() => navigate("/cartoons")}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Multfilmlar sahifasiga qaytish
                </button>
              </div>
            </div>
          )}

          {/* Cartoon Content */}
          {!loading && !error && cartoon && (
            <div className="animate-fade-in">
              {/* Title and Rating */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {title}
                </h1>

                {/* Rating with Stars */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      const isFull = starValue <= Math.floor(rating);
                      const isHalf = !isFull && starValue - 0.5 <= rating;

                      return (
                        <div key={i} className="relative">
                          <svg
                            className={`w-7 h-7 md:w-8 md:h-8 ${
                              isFull || isHalf
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill={isFull ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                            stroke={!isFull ? "currentColor" : "none"}
                            strokeWidth={!isFull ? 1.5 : 0}
                          >
                            <path d="M12 2L15.09 8.26L22 10L15.09 11.74L12 18L8.91 11.74L2 10L8.91 8.26L12 2Z" />
                          </svg>
                          {isHalf && (
                            <div
                              className="absolute inset-0 overflow-hidden"
                              style={{ width: "50%" }}
                            >
                              <svg
                                className="w-7 h-7 md:w-8 md:h-8 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L15.09 8.26L22 10L15.09 11.74L12 18L8.91 11.74L2 10L8.91 8.26L12 2Z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-yellow-500/10 dark:to-orange-500/10 rounded-xl backdrop-blur-sm">
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      / 5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Container */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 ring-4 ring-purple-200/50 dark:ring-purple-800/50">
                <div className="relative w-full aspect-video">
                  {video_url ? (
                    <iframe
                      src={video_url}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      webkitallowfullscreen="true"
                      mozallowfullscreen="true"
                      playsInline
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <div className="text-center p-6">
                        <svg
                          className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4"
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
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          Video mavjud emas
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Tavsif
                  </span>
                </h2>
                {description && description.trim() ? (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic leading-relaxed text-base md:text-lg">
                    MultFinder — multfilm topishning eng qulay yo‘li MultFinder
                    bu multfilm ixlosmandlari uchun ishlab chiqilgan zamonaviy
                    va ishonchli loyiha.
                  </p>
                )}
              </div>

              {/* Navigation Links */}
              <div className="mt-8 flex justify-center gap-3">
                <Link
                  to="/"
                  className="px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md flex items-center gap-2"
                >
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
                </Link>
                <Link
                  to="/cartoons"
                  className="px-6 py-3 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-xl shadow-pink-500/50 flex items-center gap-2"
                >
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
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartoonShow;
