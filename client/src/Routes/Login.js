import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/login?email=${email}&password=${password}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: {
        email: email,
        password: password,
      },
    });
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
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
        <p>
          Not a user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
