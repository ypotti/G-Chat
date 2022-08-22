import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import BrandLogo from "../Components/BrandLogo";
import Loading from "../Components/Loading";
import "./style.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLogin = () => {
      const is_admin = Cookies.get("isAdmin");
      if (is_admin === "false" || !is_admin) {
        navigate("/");
      }
    };
    checkIfLogin();
  }, []);

  // Registering user
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!error && email && password) {
      setIsLoading(true);
      const url = "http://20.214.162.222:8080/register/";
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
      setIsLoading(false);
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
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        <BrandLogo />
        {/* Hero */}
        <div className="mt-3 d-flex justify-content-center Login__Hero">
          <div className="w-100 d-flex flex-column justify-content-center align-items-center Login__Box">
            <p className="Login__boxHeading">Register</p>
            <form onSubmit={submitHandler} className="w-100">
              <label className="label">Email Id:</label>
              <input
                type="text"
                placeholder="sample@gmail.com"
                className=" mb-3 input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                className=" mb-3 input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">Confirm Password:</label>
              <input
                type="password"
                placeholder="Enter Password again"
                className=" mb-3 input-field"
                value={confirmPassword}
                onChange={confirmPasswordHandle}
              />
              <div className="mb-3">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  value={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                />
                <label htmlFor="checkbox" className="label pointer">
                  Administrator
                </label>
              </div>
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
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
};

export default Register;
