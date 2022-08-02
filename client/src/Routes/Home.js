import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const is_admin = Cookies.get("isAdmin");
  useEffect(() => {
    const checkIfLogin = () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
      }
    };
    checkIfLogin();
  });

  return (
    <div>
      Home
      {is_admin === "true" && <Link to="/register">Register</Link>}
    </div>
  );
};

export default Home;
