import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const useTheme = () => {
  const { handleTheme, isDark } = useContext(ThemeContext);

  return { handleTheme, isDark };
};

export default useTheme;
