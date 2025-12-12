import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const DisneyMagicalHeader = () => {
  const [stars, setStars] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [showMultFinder, setShowMultFinder] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: 2 + Math.random() * 4,
    }));
    setStars(newStars);

    const newSnowflakes = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 4 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 200,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMultFinder((prev) => {
        setIsFirstRender(false);
        return !prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10 md:mb-12 text-center relative perspective-1000">
      {/* Stars */}
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
              className="text-yellow-400"
            >
              <path
                d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Snow */}
      <div
        className="fixed pointer-events-none z-10"
        style={{
          top: "-60px",
          left: "0",
          right: "0",
          width: "100vw",
          height: "calc(100vh + 60px)",
        }}
      >
        {snowflakes.map((flake) => (
          <div
            key={`snow-${flake.id}`}
            className="absolute animate-snowfall"
            style={{
              left: `${flake.left}%`,
              top: "-100px",
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              "--drift": `${flake.drift}px`,
            }}
          >
            <svg
              width={flake.size}
              height={flake.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-white opacity-80"
            >
              <path
                d="M12 2v20M2 12h20M5.5 5.5l13 13M18.5 5.5l-13 13M12 7l-3 5h6zM12 17l3-5H9z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="relative transform-style-3d animate-float">
        <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center">
          <div className="relative h-20 md:h-24 lg:h-28 flex items-center justify-center perspective-3d">
            {showMultFinder ? (
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  !isFirstRender ? "animate-text-swap" : ""
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    Mult
                  </span>
                  <span className="text-white">Finder</span>
                  <span className="text-yellow-400 w-10 h-10 animate-magic">
                    <MagnifyingGlassIcon />
                  </span>
                </span>
              </div>
            ) : (
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  !isFirstRender ? "animate-text-swap" : ""
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <svg
                    className="w-12 h-12 text-blue-500 animate-pulse"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#29b6f6"
                      d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 
                      l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 
                      C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                    ></path>
                  </svg>

                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-transparent bg-clip-text text-5xl font-black">
                    @multfinder
                  </span>
                </span>
              </div>
            )}
          </div>
        </h1>
      </div>

      {/* Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes magic {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-10px) rotate(10deg) scale(1.2);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift))
              rotate(360deg);
            opacity: 0;
          }
        }

        .animate-snowfall {
          animation: snowfall linear infinite;
        }

        @keyframes text-swap {
          0% {
            opacity: 0;
            transform: rotateY(90deg) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }

        .animate-text-swap {
          animation: text-swap 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DisneyMagicalHeader;
