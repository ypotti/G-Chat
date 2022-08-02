import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLogin = () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
      }
    };
    checkIfLogin();
  });

  return <div>Home</div>;
};

export default Home;
