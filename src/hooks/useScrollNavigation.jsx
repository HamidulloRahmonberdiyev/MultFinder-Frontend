import { useState, useEffect, useRef } from "react";

export const useScrollNavigation = (containerRef) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const canScroll = scrollWidth > clientWidth;
    setShowLeftArrow(canScroll && scrollLeft > 10);
    setShowRightArrow(canScroll && scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        clearTimeout(timer);
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
    return () => clearTimeout(timer);
  }, [containerRef]);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.7;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return { showLeftArrow, showRightArrow, scroll };
};

