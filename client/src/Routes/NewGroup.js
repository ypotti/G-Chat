import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ColorTheme from "../Components/ColorTheme";
import { BsFillChatQuoteFill } from "react-icons/bs";
import "./style.css";

const Register = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const checkIfLogin = () => {
      if (!token) {
        navigate("/login");
      }
    };
    checkIfLogin();
  }, []);

  // Registering user
  const submitHandler = async (e) => {
    e.preventDefault();
    // if (!error && email && password) {
    //   const url = "http://localhost:8080/register/";
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: { "Content-type": "application/json; charset=UTF-8" },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //       isAdmin: isAdmin,
    //     }),
    //   });
    //   const data = await response.text();
    //   if (response.ok === true) {
    //     console.log(data);

    //     setEmail("");
    //     setError(data);
    //     setPassword("");
    //     setConfirmPassword("");
    //   }
    // } else {
    //   if (!email) {
    //     setError("Enter Email Id");
    //   } else if (!password) {
    //     setError("Enter Password");
    //   } else if (password !== confirmPassword) {
    //     setError("Passwords are not same");
    //   } else {
    //     setError("Enter all details");
    //   }
    // }
  };

  return (
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        {/* Brand */}
        <div className="d-flex align-items-center">
          <BsFillChatQuoteFill className="Login__brand-icon" />
          <em className="Login__brand-name">G-Chat</em>
        </div>
        {/* Hero */}
        <div className="mt-3 d-flex justify-content-center Login__Hero">
          <div className="w-100 d-flex flex-column justify-content-center align-items-center Login__Box">
            <p className="Login__boxHeading">Create Group</p>
            <form onSubmit={submitHandler} className="w-100">
              <label className="label">Name:</label>
              <input
                type="text"
                placeholder="David"
                className=" mb-3 input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="d-flex justify-content-between align-items-start">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
                <button type="submit" className="button mb-3">
                  Submit
                </button>
              </div>
              {/* {error && <p className="text-danger">{error}</p>} */}
            </form>
          </div>
        </div>
        {/* Theme Switch Button*/}
        <ColorTheme />
      </div>
    </div>
  );
};

export default Register;
