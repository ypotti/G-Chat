import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { BiLogOut, BiUserPlus } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import ColorTheme from "../Components/ColorTheme";
import User from "../Components/User";
import AddGroup from "../Components/AddGroup";
import { UsersContext, GroupsContext } from "../App";
import Group from "../Components/Group";

const Home = () => {
  const { allUsers, setAllUsers } = useContext(UsersContext);
  const { allGroups, setAllGroups } = useContext(GroupsContext);
  const [userFilterValue, setuserFilterValue] = useState("");
  const [groupFilterValue, setGroupFilterValue] = useState("");
  const [tabSelected, setTabSelected] = useState("groups");

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

    const getAllUsers = async () => {
      const url = "http://localhost:8080/get_all_users";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllUsers(data);
    };
    getAllUsers();

    const getAllGroups = async () => {
      const url = "http://localhost:8080/get_all_groups";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllGroups(data);
    };
    getAllGroups();
  }, []);

  return (
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        {/* Brand and logout button */}
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
        {/* Hero */}
        <div className="Home__Hero d-flex">
          <div className="Home__user">
            <div className="w-100">
              <button
                className={`user__button  ${
                  tabSelected === "users" ? "selected-tab" : "un-selected-tab"
                }`}
                onClick={() => setTabSelected("users")}
              >
                Users
              </button>
              <button
                className={`user__button border-left ${
                  tabSelected === "users" ? "un-selected-tab" : "selected-tab"
                }`}
                onClick={() => setTabSelected("groups")}
              >
                Groups
              </button>
            </div>
            <div className="burger-wrap">
              <GiHamburgerMenu className="burger-icon" />
            </div>
            {tabSelected === "users" ? (
              <div>
                <div>
                  <input
                    type="text"
                    className="search input-field"
                    placeholder="Search a user"
                    value={userFilterValue}
                    onChange={(e) => setuserFilterValue(e.target.value)}
                  />
                </div>
                <div className="overflow-y">
                  {allUsers
                    .filter((user) =>
                      user.email.split("@")[0].includes(userFilterValue)
                    )
                    .map((user) => (
                      <User key={user.id} user={user} />
                    ))}
                </div>
              </div>
            ) : (
              <div className="group_wrap">
                <div>
                  <input
                    type="text"
                    className="search input-field"
                    placeholder="Search a Group"
                    value={groupFilterValue}
                    onChange={(e) => setGroupFilterValue(e.target.value)}
                  />
                </div>
                <div className="overflow-y">
                  {allGroups
                    .filter((group) => group.name.includes(groupFilterValue))
                    .map((group) => (
                      <Group group={group} key={group.id} />
                    ))}
                  <AddGroup />
                </div>
              </div>
            )}
          </div>
          <div className="Home__chat bg-secondary">{/* Chat Section */}</div>
        </div>
        {/* Theme Switch Button*/}
        <ColorTheme />
      </div>
    </div>
  );
};

export default Home;
