import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CartoonCard from "../components/cartoons/CartoonCard";
import ThemeToggle from "../components/layout/ThemeToggle";
import { useTheme } from "../hooks/useTheme.jsx";
import Pagination from "../components/ui/Pagination";
import Navbar from "../components/ui/Navbar.jsx";
import { filmsAPI } from "../services/api";

const Cartoons = () => {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimer = useRef(null);

  const fetchCartoons = async (
    titleParam = "",
    page = 1,
    perPageValue = 12
  ) => {
    setLoading(true);
    const result = await filmsAPI.getFilms({
      title: titleParam,
      page,
      perPage: perPageValue,
    });

    if (result.success) {
      setCartoons(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotalItems(result.pagination.totalItems);
      setError(null);
    } else {
      setError(result.error);
      setCartoons([]);
      setTotalPages(1);
      setTotalItems(0);
    }

    setLoading(false);
  };

  const prevSearchRef = useRef("");

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("per_page");
    const searchParam = searchParams.get("search");

    if (pageParam) {
      const page = parseInt(pageParam);
      if (page > 0) setCurrentPage(page);
    }

    if (perPageParam) {
      const perPageValue = parseInt(perPageParam);
      if ([12, 24, 36, 48].includes(perPageValue)) {
        setPerPage(perPageValue);
      }
    }

    if (searchParam) {
      setSearch(searchParam);
    }
  }, []);

  useEffect(() => {
    if (prevSearchRef.current !== search) {
      prevSearchRef.current = search;
      if (search.trim()) {
        setCurrentPage(1);
      }
    }
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (perPage !== 12) params.set("per_page", perPage.toString());
    if (search.trim()) params.set("search", search.trim());

    setSearchParams(params, { replace: true });
  }, [currentPage, perPage, search, setSearchParams]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(
      () => {
        fetchCartoons(search, currentPage, perPage);
      },
      search.trim() ? 500 : 0
    );

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, currentPage, perPage]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <main className="flex-1 flex flex-col items-center mb-10 justify-start pt-8 md:pt-8 px-4 bg-black/4 dark:bg-black/10 backdrop-blur-[4px] rounded-t-[32px] border-t border-white/10 shadow-[0_-10px_24px_rgba(0,0,0,0.18)]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex justify-center mb-4  ">
              <img
                src="/images/disney.png"
                alt="Disney"
                className="h-24 md:h-32 lg:h-40 object-contain"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Sevimli multfilmlarni tomosha qiling
            </p>

            <Navbar />
          </div>

          <div className="w-full max-w-2xl mx-auto mb-12 md:mb-16 animate-fade-in-up">
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

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl max-w-md mx-auto">
                <p className="font-semibold">Xatolik!</p>
                <p className="mt-2">{error}</p>
              </div>
            </div>
          )}

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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cartoons.map((cartoon, index) => {
                      return (
                        <CartoonCard
                          key={cartoon.id || cartoon._id || index}
                          cartoon={{ ...cartoon, index }}
                        />
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      perPage={perPage}
                      onPerPageChange={(newPerPage) => {
                        setPerPage(newPerPage);
                        setCurrentPage(1);
                      }}
                      totalItems={totalItems}
                      loading={loading}
                    />
                  )}
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
