import React,{useContext} from "react";
import {
  BsFillBrightnessHighFill,
  BsFillBrightnessAltLowFill,
} from "react-icons/bs";

import { ThemeContext } from "../App";
import "./style.css";

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
