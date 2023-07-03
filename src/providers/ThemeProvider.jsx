import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("pf-theme") == "night"
  );
  useEffect(() => {
    if (isDark) {
      document.getElementsByTagName("html")[0].removeAttribute("data-theme");
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "night");
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("data-theme");
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "light");
    }
  }, [isDark]);

  const handleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.getElementsByTagName("html")[0].removeAttribute("data-theme");
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "night");
      localStorage.setItem("pf-theme", "night");
    } else {
      document.getElementsByTagName("html")[0].removeAttribute("data-theme");
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "light");
      localStorage.setItem("pf-theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, handleTheme }}>
      <div className={isDark ? "text-white" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
