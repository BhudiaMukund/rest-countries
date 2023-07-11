import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ theme, setTheme }) => {
  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <header>
      <Link className="link" to="/">
        <h1>Where in the world?</h1>
      </Link>
      <button onClick={() => handleThemeChange()}>
        {theme === "dark" ? (
          <>
            <LightModeIcon /> Light Mode
          </>
        ) : (
          <>
            <DarkModeIcon /> Dark Mode
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
