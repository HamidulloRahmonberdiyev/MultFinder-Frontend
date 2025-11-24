import { useState } from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import { STUDIOS } from "../../data/movies";
import StoryModal from "./StoryModal";

const SearchButtons = ({ value }) => {
  const [selectedStudio, setSelectedStudio] = useState(null);
  const { scrollContainerRef, dragHandlers } = useDragScroll();
  const { showLeftArrow, showRightArrow, scroll } = useScrollNavigation(scrollContainerRef);

  const openModal = (studio) => {
    setSelectedStudio(studio);
  };

  const closeModal = () => {
    setSelectedStudio(null);
  };

  if (value) return null;

  return (
    <>
      <div className="w-full mt-6 md:mt-8 relative">
        {/* Left Arrow - faqat ko'p elementlar bo'lganda va scroll qilish mumkin bo'lganda */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center"
            aria-label="Oldingi"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Instagram story slider container - responsive: telefon 5ta, planshet 5ta, desktop 6ta */}
        <div
          ref={scrollContainerRef}
          {...dragHandlers}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing scroll-smooth story-container"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            gap: "0.75rem",
          }}
        >
          {STUDIOS.map((studio, index) => (
            <button
              key={index}
              onClick={() => openModal(studio)}
              className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5 group transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 snap-center story-item"
            >
              {/* Instagram story ring - responsive o'lchamlar */}
              <div
                className={`relative p-[2.5px] sm:p-[3px] md:p-[3.5px] lg:p-[4px] rounded-full bg-gradient-to-tr ${studio.gradient} shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
              >
                <div className="bg-white dark:bg-gray-900 p-[2.5px] sm:p-[3px] md:p-[3.5px] lg:p-[4px] rounded-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-900">
                    <img
                      src={studio.image}
                      alt={studio.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Studio name - responsive text */}
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium max-w-[60px] sm:max-w-[70px] md:max-w-[90px] lg:max-w-[110px] truncate text-center leading-tight">
                {studio.name}
              </span>
            </button>
          ))}
        </div>

        {/* Responsive styles: telefon 5ta, planshet 5ta, desktop 6ta */}
        <style>{`
          .story-item {
            box-sizing: border-box;
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
          }
          
          /* Telefon uchun (default) - 5ta ko'rinishi */
          .story-item {
            width: calc((100% - 2rem - 0.75rem * 4) / 5);
            min-width: calc((100% - 2rem - 0.75rem * 4) / 5);
            max-width: calc((100% - 2rem - 0.75rem * 4) / 5);
          }
          
          /* Planshet uchun (md: 768px+) - 5ta ko'rinishi */
          @media (min-width: 768px) and (max-width: 1023px) {
            .story-container {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
              gap: 1.5rem !important;
            }
            .story-item {
              width: calc((100% - 3rem - 1.5rem * 4) / 5) !important;
              min-width: calc((100% - 3rem - 1.5rem * 4) / 5) !important;
              max-width: calc((100% - 3rem - 1.5rem * 4) / 5) !important;
            }
          }
          
          /* Desktop uchun (lg: 1024px+) - 6ta ko'rinishi */
          @media (min-width: 1024px) {
            .story-container {
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              gap: 2rem !important;
            }
            .story-item {
              width: calc((100% - 4rem - 2rem * 5) / 6) !important;
              min-width: calc((100% - 4rem - 2rem * 5) / 6) !important;
              max-width: calc((100% - 4rem - 2rem * 5) / 6) !important;
            }
          }
        `}</style>

        {/* Right Arrow - faqat ko'p elementlar bo'lganda va scroll qilish mumkin bo'lganda */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center"
            aria-label="Keyingi"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
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
          </button>
        )}
      </div>

      {selectedStudio && (
        <StoryModal studio={selectedStudio} onClose={closeModal} />
      )}
    </>
  );
};

export default SearchButtons;