import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Cookies from "js-cookie";

import { BackendIp } from "../App";

const User = ({ user, getAllUsers }) => {
  const name = user.email.split("@")[0];
  const token = Cookies.get("token");
  const isAdmin = Cookies.get("isAdmin");

  const deleteUser = async () => {
    const url = `${BackendIp}/delete-user`;
    // API Call to delete user
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });
      if (response.ok) {
        console.log("User Deleted");
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center User">
      <div className="User__avatar">{name[0].toUpperCase()}</div>
      <div>
        <div className="d-flex align-items-center">
          <div className="User__name">
            {name[0].toUpperCase() + name.slice(1, name.length)}
          </div>
          {user.is_admin === "true" && (
            <div className="User__admin">
              <MdOutlineAdminPanelSettings />
            </div>
          )}
        </div>
        <div className="User__email">{user.email}</div>
      </div>
      {isAdmin === "true" && (
        <div
          className="ms-auto me-2 p-2 d-flex align-items-center align-self-stretch pointer"
          onClick={deleteUser}
        >
          <RiDeleteBin6Line />
        </div>
      )}
    </div>
  );
};

export default User;
