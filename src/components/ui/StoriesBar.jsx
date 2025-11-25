import { useEffect, useMemo, useState } from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import useStories from "../../hooks/useStories";
import StoryModal from "./StoryModal";

const StoriesBar = ({ value }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const { scrollContainerRef, dragHandlers } = useDragScroll();
  const { showLeftArrow, showRightArrow, scroll } = useScrollNavigation(scrollContainerRef);
  const { stories, loading, error, hasStories, incrementViews, likeStory, isStoryLiked } = useStories();
  const placeholders = useMemo(() => Array.from({ length: 6 }), []);

  const handleOpen = (story) => {
    setSelectedStory(story);
    incrementViews(story.id);
  };
  const handleClose = () => setSelectedStory(null);

  useEffect(() => {
    if (!selectedStory) return;
    const latest = stories.find((story) => story.id === selectedStory.id);
    if (
      latest &&
      (latest.viewsCount !== selectedStory.viewsCount || latest.likesCount !== selectedStory.likesCount)
    ) {
      setSelectedStory(latest);
    }
  }, [stories, selectedStory]);

  if (value) return null;

  return (
    <>
      <div className="w-full mt-6 md:mt-8 relative">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

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
          {loading && !hasStories
            ? placeholders.map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse story-item"
                />
              ))
            : stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => handleOpen(story)}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5 group transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 snap-center story-item"
                >
                  <div
                    className={`relative p-[2.5px] sm:p-[3px] md:p-[3.5px] lg:p-[4px] rounded-full bg-gradient-to-tr ${story.gradient} shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <div className="bg-white dark:bg-gray-900 p-[2.5px] sm:p-[3px] md:p-[3.5px] lg:p-[4px] rounded-full">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-900">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 font-medium max-w-[60px] sm:max-w-[70px] md:max-w-[90px] lg:max-w-[110px] truncate text-center leading-tight">
                    {story.title}
                  </span>
                </button>
              ))}
        </div>

        <style>{`
          .story-item {
            box-sizing: border-box;
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
          }
          .story-item {
            width: calc((100% - 2rem - 0.75rem * 4) / 5);
            min-width: calc((100% - 2rem - 0.75rem * 4) / 5);
            max-width: calc((100% - 2rem - 0.75rem * 4) / 5);
          }
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {error && <p className="text-center text-sm text-red-500 mt-4">{error}</p>}
        {!loading && !hasStories && !error && (
          <p className="text-center text-sm text-gray-500 mt-4">Hozircha story yo'q</p>
        )}
      </div>

      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={handleClose}
          onLike={likeStory}
          isLiked={isStoryLiked}
        />
      )}
    </>
  );
};

export default StoriesBar;