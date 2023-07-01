import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("pf-theme") == "dark"
  );
  useEffect(() => {
    if (isDark) {
      document.getElementsByTagName("html")[0].removeAttribute("data-theme");
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "dark");
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
        .setAttribute("data-theme", "dark");
      localStorage.setItem("pf-theme", "dark");
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
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
