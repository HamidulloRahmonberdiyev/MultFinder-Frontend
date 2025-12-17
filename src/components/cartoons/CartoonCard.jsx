import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartoonCard = ({ cartoon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();

  if (!cartoon) {
    return null;
  }

  const title =
    cartoon.title || cartoon.name || cartoon.nomi || "Nomsiz multfilm";
  const description =
    cartoon.description || cartoon.desc || cartoon.tavsif || "";
  const video_url =
    cartoon.video_url || cartoon.videoUrl || cartoon.video || cartoon.url || "";

  const cartoonId = cartoon.id || cartoon._id || null;
  const cartoonIndex = cartoon.index !== undefined ? cartoon.index : null;

  const handleVideoClick = () => {
    if (cartoonId || cartoonIndex !== null) {
      navigate(`/cartoons/${cartoonId || cartoonIndex}`);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2">
      {/* Video Container */}
      <div
        className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 cursor-pointer group/video"
        onClick={handleVideoClick}
      >
        {video_url ? (
          <>
            <iframe
              src={video_url}
              className="w-full h-full border-0 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
            {/* Clickable Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover/video:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover/video:scale-100">
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-6">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
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
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Video mavjud emas
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>

        <div className="mb-4">
          {description && description.trim() ? (
            <>
              {showDescription || description.length <= 150 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {description.substring(0, 100)}...
                </p>
              )}
              {description.length > 100 && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                >
                  {showDescription ? "Kamroq ko'rsatish" : "Ko'proq ko'rsatish"}
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm italic leading-relaxed">
              MultFinder — multfilm topishning eng qulay yo‘li MultFinder bu
              multfilm ixlosmandlari uchun ishlab chiqilgan zamonaviy va
              ishonchli loyiha. 
            </p>
          )}
        </div>

        {/* Action Button */}
        {cartoonId || cartoonIndex !== null ? (
          <Link
            to={`/cartoons/${cartoonId || cartoonIndex}`}
            className="block w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
          >
            Tomosha qilish
          </Link>
        ) : (
          <button
            onClick={toggleExpand}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {isExpanded ? "Yopish" : "Tomosha qilish"}
          </button>
        )}
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Sarlavha
                </span>
                <p className="text-gray-800 dark:text-gray-200 mt-1">{title}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Tavsif
                </span>
                <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {description && description.trim()
                    ? description
                    : "Bu multfilm haqida batafsil ma'lumot hozircha mavjud emas. Tez orada qo'shiladi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default CartoonCard;
