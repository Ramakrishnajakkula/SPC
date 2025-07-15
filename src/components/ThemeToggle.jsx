import { useTheme } from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}>
      <FontAwesomeIcon
        icon={isDarkMode ? faSun : faMoon}
        className="theme-icon"
      />
    </button>
  );
};

export default ThemeToggle;
