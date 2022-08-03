import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { BiLogOut, BiUserPlus } from "react-icons/bi";
import ColorTheme from "../Components/ColorTheme";

const Home = () => {
  const navigate = useNavigate();
  const is_admin = Cookies.get("isAdmin");
  const token = Cookies.get("token");

  useEffect(() => {
    const checkIfLogin = () => {
      if (!token) {
        navigate("/login");
      }
    };
    checkIfLogin();
  });

  const getAllUsers = async () => {
    const url = "http://localhost:8080/get_all_users";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        {/* Brand */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsFillChatQuoteFill className="Login__brand-icon" />
            <em className="Login__brand-name">G-Chat</em>
          </div>
          <div className="d-flex">
            {is_admin === "true" && (
              <button
                onClick={() => navigate("/register")}
                className="me-5 Home__button"
              >
                <BiUserPlus className="button-icon" />
                Add a User
              </button>
            )}
            <button onClick={() => navigate("/login")} className="Home__button">
              <BiLogOut className="button-icon" />
              Logout
            </button>
          </div>
        </div>
        {/* Theme Switch Button*/}
        <ColorTheme />
      </div>
    </div>
  );
};

export default Home;
