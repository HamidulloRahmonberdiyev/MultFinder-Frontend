import { useEffect } from "react";

const StoryModal = ({ story, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full mx-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Yopish"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
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
          <div className={`p-1 rounded-2xl bg-gradient-to-tr ${story.gradient}`}>
            <div className="bg-white dark:bg-gray-900 p-1 rounded-2xl">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-contain max-h-[90vh] rounded-xl"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-2xl">
            <h3 className="text-white text-2xl md:text-3xl font-bold text-center mb-4">
              {story.title}
            </h3>
            
            <div className="flex justify-center">
              <a
                href={`https://t.me/multfinder_bot?start=${encodeURIComponent(story.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0088cc] to-[#229ED9] hover:from-[#0077b5] hover:to-[#0088cc] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.166 1.616-1.053 5.53-1.491 7.331-.172.728-.51 1.008-.837 1.033-.72.05-1.266-.475-1.963-.931-1.096-.7-1.715-1.135-2.778-1.82-1.305-.84-.46-1.302.285-2.056.197-.197 3.59-3.29 3.66-3.574.008-.033.016-.15-.06-.212-.075-.062-.185-.041-.265-.025-.112.02-1.892 1.2-5.343 3.52-.507.352-.966.512-1.38.504-.46-.01-1.344-.25-2.001-.456-.807-.255-1.448-.395-1.39-.835.03-.22.44-.446 1.21-.61 4.64-2.01 7.73-3.34 9.26-3.99 4.4-1.84 5.3-2.16 5.9-2.17.13 0 .42.03.61.18.15.12.19.3.21.42-.01.13.07.38.17.52.1.14.22.2.38.24.16.04.38.05.52.02.14-.03.4-.15.55-.27.15-.12.3-.27.4-.4.1-.13.2-.3.25-.4.05-.1.1-.25.1-.35 0-.1-.02-.2-.05-.3-.03-.1-.08-.2-.13-.3z"/>
                </svg>
                <span className="text-base md:text-lg">Ko'rish</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;

