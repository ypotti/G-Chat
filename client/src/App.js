import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Home from "./Routes/Home";
import NewGroup from "./Routes/NewGroup";
import ColorTheme from "./Components/ColorTheme";

export const ThemeContext = createContext("");
export const UsersContext = createContext();
export const GroupsContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <UsersContext.Provider value={{ allUsers, setAllUsers }}>
        <GroupsContext.Provider value={{ allGroups, setAllGroups }}>
          <div data-theme={theme}>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/new-group" element={<NewGroup />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
            {/* Switch Theme Button */}
            <ColorTheme />
          </div>
        </GroupsContext.Provider>
      </UsersContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
