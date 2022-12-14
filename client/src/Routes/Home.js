import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut, BiUserPlus } from "react-icons/bi";
import { TiGroup } from "react-icons/ti";
import Cookies from "js-cookie";

import User from "../Components/User";
import AddGroup from "../Components/AddGroup";
import { UsersContext, GroupsContext, BackendIp } from "../App";
import Group from "../Components/Group";
import ChatSection from "../Components/ChatSection";
import Loading from "../Components/Loading";
import Consent from "../Components/Consent";
import BrandLogo from "../Components/BrandLogo";

const Home = () => {
  const { allUsers, setAllUsers } = useContext(UsersContext);
  const { allGroups, setAllGroups } = useContext(GroupsContext);
  const [userFilterValue, setuserFilterValue] = useState("");
  const [groupFilterValue, setGroupFilterValue] = useState("");
  const [selectedGroup, setSelectedGroup] = useState({});
  const [tabSelected, setTabSelected] = useState("groups");
  const [showHome, setShowHome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const navigate = useNavigate();
  const is_admin = Cookies.get("isAdmin");
  const token = Cookies.get("token");
  const currentUserEmail = Cookies.get("email");

  useEffect(() => {
    checkIfLogin();
    getAllUsers();
    getAllGroups();
  }, []);

  const checkIfLogin = async () => {
    if (!token) navigate("/login");

    // API Call to verify JWT token
    const url = `${BackendIp}/verify_token`;
    setIsLoading(true);
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

  const getAllGroups = async () => {
    const url = `${BackendIp}/get_all_groups`;
    setIsLoading(true);
    // API Call to get All groups
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setAllGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    const url = `${BackendIp}/get_all_users`;
    setIsLoading(true);
    // API Call to get all users data
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="Login__bg d-flex flex-row justify-content-center">
      <div className="Login__Content-Box d-flex flex-column">
        {/* Brand and logout button */}
        <div className="d-flex justify-content-between align-items-center">
          <BrandLogo />
          <div className="d-flex">
            {is_admin === "true" && (
              <button
                onClick={() => navigate("/register")}
                className="me-5 Home__button"
              >
                <BiUserPlus className="button-icon" />
                <span className="d-none d-md-inline ms-2">Add a User</span>
              </button>
            )}
            <button
              onClick={() => setShowConsent(true)}
              className="Home__button"
            >
              <BiLogOut className="button-icon" />
              <span className="d-none d-md-inline ms-2">Logout</span>
            </button>
          </div>
        </div>
        {/* Hero */}
        <div className="Home__Hero d-flex">
          <div
            className={`Home__user col-12 col-lg-4 ${
              !showHome && "d-none"
            } d-lg-block`}
          >
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
                      <User
                        key={user.id}
                        user={user}
                        getAllUsers={getAllUsers}
                      />
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
                <div className="overflow-y scrollbar">
                  {allGroups
                    .filter((group) => group.users.includes(currentUserEmail))
                    .filter((group) => group.name.includes(groupFilterValue))
                    .map((group) => (
                      <Group
                        group={group}
                        key={group.id}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        setShowHome={setShowHome}
                        showHome={showHome}
                      />
                    ))}
                  <AddGroup />
                </div>
              </div>
            )}
          </div>
          {selectedGroup?.users ? (
            <ChatSection
              selectedGroup={selectedGroup}
              showHome={showHome}
              setShowHome={setShowHome}
            />
          ) : (
            <div className="Home__chat w-100 d-none d-lg-flex flex-column align-items-center justify-content-center">
              <TiGroup className="Select_Group-Icon" />
              <div className="Select_Group-text">Select a group to CHAT</div>
            </div>
          )}
        </div>
        {isLoading && <Loading />}
        {showConsent && (
          <Consent logout={logout} setShowConsent={setShowConsent} />
        )}
      </div>
    </div>
  );
};

export default Home;
