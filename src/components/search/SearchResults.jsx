const DEFAULT_IMAGE =
  "https://sun9-43.userapi.com/impf/6PN9XCSv_SGa_NDd_kCmdgARiyvIuTaUAWikuA/TlrEX35od1s.jpg?size=417x604&quality=96&sign=cecf70b09833a213d55e350f4d176586&type=album";

const SearchResults = ({ results, onSelect, isLoading }) => {
  const handleFilmClick = (film) => {
    if (film.code) {
      const telegramUrl = `https://t.me/multfinder_bot?start=${encodeURIComponent(film.code)}`;
      window.open(telegramUrl, '_blank');
    }
    onSelect(film.title);
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 z-50 animate-fade-in-up">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Qidirilmoqda...
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 z-50 animate-fade-in-up">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Hech narsa topilmadi
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Boshqa so'z bilan qidiring
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto z-50 animate-fade-in-up">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">
          Qidiruv natijalari
        </h3>
        <div className="space-y-2">
          {results.map((film) => {
            const details = film.details || {};
            const country =
              details["⭐Mamlakat"] ||
              details["Mamlakat"] ||
              details["Davlat"] ||
              "";
            const genre = details["⭐ Janr"] || details["Janr"] || "";
            const rating = details["⭐ Reyting"] || details["Reyting"] || "";
            const year = details["⭐ Yili"] || details["Yili"] || "";
            const quality = details["Sifat"] || "";
            const duration = details["Davomiyligi"] || "";

            return (
              <div
                key={film.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
                onClick={() => handleFilmClick(film)}
              >
                <div className="flex-shrink-0 w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                  <img
                    src={DEFAULT_IMAGE}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {film.title}
                  </h4>
                  {film.code && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-400">
                        Kod:
                      </span>
                      <span className="text-sm font-mono font-bold text-blue-400">
                        {film.code}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {country && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {country}
                        </span>
                        {(year || genre || rating) && (
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                        )}
                      </>
                    )}
                    {year && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {year}
                        </span>
                        {(genre || rating) && (
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                        )}
                      </>
                    )}
                    {genre && (
                      <>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {genre.replace(/#/g, "")}
                        </span>
                        {rating && (
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                        )}
                      </>
                    )}
                    {rating && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ⭐ {rating}
                      </span>
                    )}
                    {quality && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">
                          •
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {quality}
                        </span>
                      </>
                    )}
                    {duration && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">
                          •
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {duration}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
