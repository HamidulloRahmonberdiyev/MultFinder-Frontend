import { useEffect, useRef, useState } from "react";

const StoryModal = ({ story, onClose, onLike, isLiked }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const liked = isLiked?.(story.id) ?? false;
  const [showHeart, setShowHeart] = useState(false);
  const heartTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (heartTimeoutRef.current) {
        clearTimeout(heartTimeoutRef.current);
      }
    };
  }, []);

  const triggerHeartAnimation = () => {
    setShowHeart(true);
    if (heartTimeoutRef.current) {
      clearTimeout(heartTimeoutRef.current);
    }
    heartTimeoutRef.current = setTimeout(() => setShowHeart(false), 650);
  };

  const handleLike = () => {
    triggerHeartAnimation();
    if (!story?.id || !onLike) return;
    if (liked) return;
    onLike(story.id);
  };

  const handleButtonLike = (e) => {
    e.stopPropagation();
    handleLike();
  };

  return (
    <div
      className="fixed z-50 bg-black animate-fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        height: '100dvh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch'
      }}
    >
      <div
        className="relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-white hover:text-gray-300 transition-colors z-30 bg-black/60 rounded-full p-2 backdrop-blur-md shadow-lg"
          aria-label="Yopish"
          style={{ position: 'absolute', zIndex: 30 }}
        >
          <svg
            className="w-6 h-6 md:w-7 md:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div 
          className="relative overflow-hidden flex flex-col"
          style={{
            width: '100%',
            height: '100%',
            flex: '1 1 0%',
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 flex items-center gap-1.5 md:gap-2 rounded-full bg-black/70 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{story.viewsCount ?? 0}</span>
          </div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 flex items-center gap-1.5 md:gap-2 rounded-full bg-black/70 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-pink-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21c-4.35-3.26-7.5-6.1-7.5-9.75A4.75 4.75 0 0 1 9.25 6.5c1.21 0 2.38.5 3.25 1.36A4.57 4.57 0 0 1 15.75 6.5 4.75 4.75 0 0 1 19.5 11.25C19.5 14.9 16.35 17.74 12 21z" />
            </svg>
            <span>{story.likesCount ?? 0}</span>
          </div>
          <div
            className={`p-1.5 md:p-2 bg-gradient-to-tr ${story.gradient} flex flex-col overflow-hidden`}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            style={{
              width: '100%',
              height: '100%',
              flex: '1 1 0%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '6px' : '8px'
            }}
          >
            <div 
              className="bg-red-600 dark:bg-gray-900 relative overflow-hidden"
              style={{ 
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
                minHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: isMobile ? '6px' : '8px'
              }}
            >
              <img
                src={story.image}
                alt={story.title}
                className="object-contain rounded-lg"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
              {showHeart && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <svg
                    className="w-20 h-20 md:w-28 md:h-28 text-red-500 story-heart-pop drop-shadow-[0_0_25px_rgba(239,68,68,0.75)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21c-4.35-3.26-7.5-6.1-7.5-9.75A4.75 4.75 0 0 1 9.25 6.5c1.21 0 2.38.5 3.25 1.36A4.57 4.57 0 0 1 15.75 6.5 4.75 4.75 0 0 1 19.5 11.25C19.5 14.9 16.35 17.74 12 21z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent"
            style={{ 
              padding: isMobile ? '1rem' : '1.5rem',
              paddingBottom: `max(${isMobile ? '1rem' : '1.5rem'}, env(safe-area-inset-bottom, ${isMobile ? '1rem' : '1.5rem'}))`,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 20
            }}
          >
            <h3 className="text-white text-base md:text-2xl lg:text-3xl font-bold text-center mb-3 md:mb-4 line-clamp-2 px-2">
              {story.title}
            </h3>

            <div className="flex justify-center">
              <a
                href={`https://t.me/multfinder_bot?start=${encodeURIComponent(story.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-2.5 bg-gradient-to-r from-[#0088cc] to-[#229ED9] hover:from-[#0077b5] hover:to-[#0088cc] text-white font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.166 1.616-1.053 5.53-1.491 7.331-.172.728-.51 1.008-.837 1.033-.72.05-1.266-.475-1.963-.931-1.096-.7-1.715-1.135-2.778-1.82-1.305-.84-.46-1.302.285-2.056.197-.197 3.59-3.29 3.66-3.574.008-.033.016-.15-.06-.212-.075-.062-.185-.041-.265-.025-.112.02-1.892 1.2-5.343 3.52-.507.352-.966.512-1.38.504-.46-.01-1.344-.25-2.001-.456-.807-.255-1.448-.395-1.39-.835.03-.22.44-.446 1.21-.61 4.64-2.01 7.73-3.34 9.26-3.99 4.4-1.84 5.3-2.16 5.9-2.17.13 0 .42.03.61.18.15.12.19.3.21.42-.01.13.07.38.17.52.1.14.22.2.38.24.16.04.38.05.52.02.14-.03.4-.15.55-.27.15-.12.3-.27.4-.4.1-.13.2-.3.25-.4.05-.1.1-.25.1-.35 0-.1-.02-.2-.05-.3-.03-.1-.08-.2-.13-.3z"/>
                </svg>
                <span>Ko'rish</span>
              </a>
            </div>
          </div>
        </div>
        <button
          onClick={handleButtonLike}
          className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 z-30 right-4 ${
            liked ? "bg-pink-600 text-white scale-105" : "bg-black/70 backdrop-blur-md text-white hover:bg-black/80"
          }`}
          style={{ 
            bottom: isMobile ? '5.5rem' : '1.5rem',
            position: 'absolute',
            zIndex: 30
          }}
          aria-pressed={liked}
          aria-label="Like story"
        >
          <svg
            className={`w-6 h-6 md:w-7 md:h-7 ${liked ? "fill-current" : ""}`}
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21c-4.35-3.26-7.5-6.1-7.5-9.75A4.75 4.75 0 0 1 9.25 6.5c1.21 0 2.38.5 3.25 1.36A4.57 4.57 0 0 1 15.75 6.5 4.75 4.75 0 0 1 19.5 11.25C19.5 14.9 16.35 17.74 12 21z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
