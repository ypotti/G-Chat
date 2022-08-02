import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLogin = () => {
      const is_admin = Cookies.get("isAdmin");
      if (is_admin === "false") {
        navigate("/");
      }
    };
    checkIfLogin();
  }, []);

  // Registering user
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!error && email && password) {
      const url = "http://localhost:8080/register/";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          email: email,
          password: password,
          isAdmin: isAdmin,
        }),
      });
      const data = await response.text();
      if (response.ok === true) {
        console.log(data);

        setEmail("");
        setError(data);
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      if (!email) {
        setError("Enter Email Id");
      } else if (!password) {
        setError("Enter Password");
      } else if (password !== confirmPassword) {
        setError("Passwords are not same");
      } else {
        setError("Enter all details");
      }
    }
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setError("Passwords are not same");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Register</h2>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Enter Password again"
          className="form-control"
          value={confirmPassword}
          onChange={confirmPasswordHandle}
        />
        <div>
          <input
            type="checkbox"
            id="checkbox"
            value={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label htmlFor="checkbox">Administrator</label>
        </div>
        <input type="submit" className="btn btn-primary" />
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
