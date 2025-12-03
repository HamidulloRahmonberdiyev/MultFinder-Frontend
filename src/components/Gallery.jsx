import { groupByStudio } from "../utils/groupByStudio";
import { STUDIO_COLORS } from "../data/movies";

const Gallery = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Hech narsa topilmadi</p>
      </div>
    );
  }

  const groupedByStudio = groupByStudio(images);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-16">
      {Object.entries(groupedByStudio).map(([studio, studioImages]) => (
        <div key={studio} className="mb-12">
          {/* Studio Header */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {studio}
            </h2>
            <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${STUDIO_COLORS[studio] || "from-gray-400 to-gray-500"}`}></div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {studioImages.map((img, idx) => (
              <div
                key={`${studio}-${idx}`}
                className="group relative rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-gradient-to-br', 'from-blue-200', 'to-purple-200');
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {img.title}
                    </p>
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
