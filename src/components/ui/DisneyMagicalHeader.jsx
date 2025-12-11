import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const DisneyMagicalHeader = () => {
  const [stars, setStars] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  const [showMultFinder, setShowMultFinder] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Random yulduzlar yaratish
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: 2 + Math.random() * 4,
    }));
    setStars(newStars);

    // Qor parchalari yaratish
    const newSnowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 4 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 100,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMultFinder((prev) => {
        setIsFirstRender(false); // Birinchi almashinishdan keyin animatsiyani yoqish
        return !prev;
      });
    }, 4000); // 4 soniyada bir almashadi

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10 md:mb-12 text-center relative perspective-1000">
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

      {/* Qor yog'ishi effekti */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ marginTop: "-60px" }}
      >
        {snowflakes.map((flake) => (
          <div
            key={`snow-${flake.id}`}
            className="absolute animate-snowfall"
            style={{
              left: `${flake.left}%`,
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
              className="text-white dark:text-blue-100 opacity-80"
            >
              <path
                d="M12 2v20M2 12h20M5.5 5.5l13 13M18.5 5.5l-13 13M12 7l-3 5h6zM12 17l3-5H9z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Sparkle effect around title */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Main title with Disney magic */}
      <div className="relative transform-style-3d animate-float">
        <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

        <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-center">
          <div className="relative h-20 md:h-24 lg:h-28 flex items-center justify-center perspective-3d">
            {showMultFinder ? (
              <div className={`absolute inset-0 flex items-center justify-center transform-style-3d ${!isFirstRender ? 'animate-text-swap-3d' : ''}`}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap transform-style-3d">
                  <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-shimmer bg-[length:200%_100%]">
                    Mult
                  </span>
                  <span className="inline-block text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
                    Finder
                  </span>
                  <span className="inline-block text-yellow-400 w-10 h-10 animate-magic">
                    <MagnifyingGlassIcon />
                  </span>
                </span>
              </div>
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center transform-style-3d ${!isFirstRender ? 'animate-text-swap-3d' : ''}`}>
                <span className="inline-flex items-center gap-3 whitespace-nowrap transform-style-3d">
                  <svg
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-blue-500 dark:text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#29b6f6"
                      d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                    ></path>
                    <path
                      fill="#b0bec5"
                      d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                    ></path>
                    <path
                      fill="#cfd8dc"
                      d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                    ></path>
                  </svg>

                  <span className="inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-shimmer bg-[length:200%_100%] text-4xl md:text-5xl lg:text-6xl font-black">
                    @multfinder
                  </span>
                </span>
              </div>
            )}
          </div>
        </h1>
      </div>

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
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
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
        @keyframes float {
          0%,
          100% {
            transform: rotateY(0deg) rotateX(0deg) translateZ(0px);
          }
          25% {
            transform: rotateY(15deg) rotateX(10deg) translateZ(10px);
          }
          50% {
            transform: rotateY(-15deg) rotateX(-10deg) translateZ(-10px);
          }
          75% {
            transform: rotateY(10deg) rotateX(5deg) translateZ(5px);
          }
        }

        @keyframes magic {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-6px) rotate(-10deg) scale(1.1);
          }
          50% {
            transform: translateY(-12px) rotate(10deg) scale(1.2);
          }
          75% {
            transform: translateY(-6px) rotate(-5deg) scale(1.1);
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-100px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes text-swap {
          0% {
            opacity: 0;
            transform: rotateY(90deg) rotateX(-20deg) scale(0.5)
              translateZ(-80px);
            filter: blur(15px) brightness(0.5);
          }
          15% {
            opacity: 0.3;
            transform: rotateY(60deg) rotateX(-10deg) scale(0.65)
              translateZ(-50px);
            filter: blur(10px) brightness(0.7);
          }
          30% {
            opacity: 0.6;
            transform: rotateY(30deg) rotateX(-5deg) scale(0.8)
              translateZ(-30px);
            filter: blur(6px) brightness(0.85);
          }
          50% {
            opacity: 0.9;
            transform: rotateY(0deg) rotateX(0deg) scale(1.05) translateZ(15px);
            filter: blur(2px) brightness(1.1);
          }
          70% {
            opacity: 1;
            transform: rotateY(0deg) rotateX(0deg) scale(1.08) translateZ(20px);
            filter: blur(0px) brightness(1.15);
          }
          85% {
            opacity: 1;
            transform: rotateY(0deg) rotateX(0deg) scale(1.03) translateZ(10px);
            filter: blur(0px) brightness(1.05);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) rotateX(0deg) scale(1) translateZ(0px);
            filter: blur(0px) brightness(1);
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-magic {
          display: inline-block;
          animation: magic 2s ease-in-out infinite;
        }
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
        .animate-text-swap {
          animation: text-swap 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
};

export default DisneyMagicalHeader;
