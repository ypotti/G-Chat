import React from "react";
import {
  BsFillBrightnessHighFill,
  BsFillBrightnessAltLowFill,
} from "react-icons/bs";
import "./style.css";
import { useContext } from "react";

import { ThemeContext } from "../App";

const ColorTheme = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  return (
    <div className="ColorTheme" title="Switch Theme" onClick={changeTheme}>
      {theme === "light" ? (
        <BsFillBrightnessAltLowFill className="ColorTheme__icon" />
      ) : (
        <BsFillBrightnessHighFill className="ColorTheme__icon" />
      )}
    </div>
  );
};

export default ColorTheme;
