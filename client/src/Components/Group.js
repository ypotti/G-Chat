import React from "react";

const Group = ({ group }) => {
  const users = JSON.parse(JSON.parse(group.users));
  const getUsers = () => {
    let userNames = "";
    for (let i = 0; i < users.length; i++) {
      userNames =
        userNames +
        users[i].email.split("@")[0][0].toUpperCase() +
        users[i].email.split("@")[0].slice(1, -1) +
        ", ";
    }
    return userNames.slice(0, -2);
  };
  return (
    <div className="d-flex align-items-center User">
      <div className="User__avatar">{group.name[0].toUpperCase()}</div>
      <div>
        <div className="User__name">
          {group.name[0].toUpperCase() + group.name.slice(1, group.name.length)}
        </div>
        <div className="User__email">Members: {getUsers()}</div>
      </div>
    </div>
  );
};

export default Group;
