import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Loading from "../Components/Loading";
import BrandLogo from "../Components/BrandLogo";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("abc");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const removeCookies = () => {
      Cookies.remove("token");
      Cookies.remove("isAdmin");
      Cookies.remove("email");
    };
    removeCookies();
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      const url = `http://20.214.162.222:8080/login/`;
      setIsLoading(true);
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
        setIsLoading(false);
        Cookies.set("token", data.jwtToken, { expires: 2 });
        Cookies.set("isAdmin", data.isAdmin, { expires: 2 });
        Cookies.set("email", data.user_email);
        console.log(data.user_email);

        setEmail("");
        setError("");
        setPassword("");

        // Navigating to Home Page
        navigate("/");
      } else {
        const data = await response.text();
        setError(data);
        setIsLoading(false);
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
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        <BrandLogo />
        {/* Hero */}
        <div className="mt-5 d-flex flex-column flex-md-row justify-content-between Login__Hero">
          <div className="Login__quote">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
            <div className="Login__Author">__ Author</div>
          </div>
          <div className="d-flex flex-column align-items-center Login__Box">
            <p className="Login__boxHeading">Login</p>
            <form onSubmit={submitHandler} className="w-100">
              <label className="label">Email Id:</label>
              <input
                type="text"
                placeholder="admin@gmail.com"
                className=" mb-3 input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password:</label>
              <input
                type="password"
                placeholder="abc"
                className=" mb-3 input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" className="button mb-3" />
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Login;
