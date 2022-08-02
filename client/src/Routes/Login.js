import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      const url = `http://localhost:8080/login/`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok === true) {
        const data = await response.json();
        // data has Token
        Cookies.set("token", data.jwtToken, { expires: 2 });
        console.log(data.isAdmin);

        setEmail("");
        setError("");
        setPassword("");

        // Navigating to Home Page
        navigate("/");
      } else {
        const data = await response.text();
        setError(data);
      }
    } else {
      if (!email) {
        setError("Enter Email Id");
      } else if (!password) {
        setError("Enter Password");
      } else {
        setError("Enter all details");
      }
    }
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="btn btn-primary" />
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
