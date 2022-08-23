import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";

import BrandLogo from "../Components/BrandLogo";
import { UsersContext, BackendIp } from "../App";
import "./style.css";

const NewGroup = () => {
  const { allUsers } = useContext(UsersContext);
  const [name, setName] = useState("");
  const [userFilterValue, setuserFilterValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showList, setShowList] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    checkIfLogin();
  }, []);

  const checkIfLogin = async () => {
    if (!token) navigate("/login");

    // API Call to verify JWT token
    const url = `${BackendIp}/verify_token`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok !== true) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Registering group
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name !== "" && selectedUsers.length >= 2) {
      setError("");
      const url = `${BackendIp}/new-group/`;
      // API Call to Register a New Group
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            users: JSON.stringify(selectedUsers),
          }),
        });
        const data = await response.text();
        if (response.ok === true) {
          setError(data);
          setName("");
          setSelectedUsers([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handling error messages
      if (name === "") {
        setError("Enter Name");
      } else if (selectedUsers.length < 2) {
        setError("Select atleast 2 Users");
      } else {
        setError("Enter all details");
      }
    }
  };

  // Updating the user selected status
  const statusHandler = (e, user) => {
    if (e.target.checked) {
      if (!selectedUsers.includes(user)) {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      const newList = selectedUsers.filter((obj) => obj.id !== user.id);
      setSelectedUsers(newList);
    }
  };

  return (
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        <BrandLogo />
        {/* Hero */}
        <div className="mt-3 d-flex justify-content-center Login__Hero">
          <div className="w-100 d-flex flex-column justify-content-center align-items-center Login__Box">
            <p className="Login__boxHeading">Create Group</p>
            <form onSubmit={submitHandler} className="w-100">
              <label className="label">Name:</label>
              <input
                type="text"
                placeholder="Developers-den"
                className=" mb-3 input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="label">Select Users:</label>
              <div className="p-relative">
                <input
                  type="text"
                  placeholder="Start typing..."
                  className=" mb-3 input-field"
                  value={userFilterValue}
                  onFocus={() => setShowList(true)}
                  onChange={(e) => setuserFilterValue(e.target.value)}
                />
                {showList && (
                  <div className="user-list-wrap d-flex flex-column p-relative">
                    <div
                      className="align-self-end  mt-1 mb-1 me-2 cursor-pointer"
                      onClick={() => setShowList(false)}
                    >
                      <AiOutlineCloseCircle className="close-icon" />
                      <span className="text-color">Close</span>
                    </div>
                    {allUsers
                      .filter((user) =>
                        user.email.split("@")[0].includes(userFilterValue)
                      )
                      .map((user) => (
                        <div
                          className={`d-flex align-items-center user-selector ${
                            selectedUsers.includes(user) && "fix-hover"
                          } `}
                          key={user.id}
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedUsers.includes(user) ? true : false
                            }
                            className="checkbox me-3"
                            id={user.id}
                            onChange={(e) => statusHandler(e, user)}
                          />
                          <label className="label user-hover" htmlFor={user.id}>
                            {user.email.split("@")[0]}
                          </label>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              {selectedUsers.length > 0 && (
                <div>
                  <label className="label">Selected Users:</label>
                  <div className="mb-4 pt-2 w-100 d-flex flex-wrap">
                    {selectedUsers.map((user) => (
                      <span key={user.id} className="listed-user mb-2 me-2">
                        {user.email.split("@")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-start">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
                <button type="submit" className="button mb-3">
                  Create
                </button>
              </div>
              {error && <p className="text-danger">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGroup;
