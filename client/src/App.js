import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Home from "./Routes/Home";
import NewGroup from "./Routes/NewGroup";

export const ThemeContext = createContext("");
export const UsersContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const [allUsers, setAllUsers] = useState([]);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <UsersContext.Provider value={{ allUsers, setAllUsers }}>
        <div data-theme={theme}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-group" element={<NewGroup />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </UsersContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
