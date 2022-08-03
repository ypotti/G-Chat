import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const User = ({ user }) => {
  const name = user.email.split("@")[0];
  return (
    <div className="d-flex align-items-center User">
      <div className="User__avatar">{name[0].toUpperCase()}</div>
      <div>
        <div className="User__name">
          {name[0].toUpperCase() + name.slice(1, name.length)}
        </div>
        <div className="User__email">{user.email}</div>
      </div>
      {user.is_admin === "true" && (
        <div className="User__admin">
          <MdOutlineAdminPanelSettings />
        </div>
      )}
    </div>
  );
};

export default User;
