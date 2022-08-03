import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Home from "./Routes/Home";

export const ThemeContext = createContext("");

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
