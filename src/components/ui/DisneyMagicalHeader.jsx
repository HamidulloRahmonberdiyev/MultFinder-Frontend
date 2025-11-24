import React, { useEffect, useState } from "react";

const DisneyMagicalHeader = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Random yulduzlar yaratish
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: 2 + Math.random() * 4
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="mb-10 md:mb-12 text-center relative">
      {/* Magical stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          >
            <svg
              width={star.size}
              height={star.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-yellow-400 dark:text-yellow-300"
            >
              <path
                d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                fill="currentColor"
                className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Sparkle effect around title */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" 
             style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping" 
             style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" 
             style={{ animationDelay: "1.5s" }}></div>
      </div>

      {/* Main title with Disney magic */}
      <div className="relative">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
        
        <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight animate-fade-in">
          {/* "Mult" part with gradient */}
          <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-shimmer bg-[length:200%_100%]">
            Mult
          </span>
          {/* "Finder" part with sparkle */}
          <span className="inline-block text-gray-900 dark:text-white font-black ml-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">
            Finder
            {/* Magic wand sparkle */}
            <span className="inline-block ml-2 text-yellow-400 animate-bounce">✨</span>
          </span>
        </h1>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0.5) rotate(0deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DisneyMagicalHeader;