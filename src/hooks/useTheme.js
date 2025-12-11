import { useState, useLayoutEffect } from "react";

// Always enforce dark mode
const getInitialTheme = () => true;

export const useTheme = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setIsDark(true);
  }, [isDark]);

  const toggleTheme = () => {};

  return { isDark, toggleTheme };
};

