import React, { useEffect } from "react";

const Group = ({
  group,
  setSelectedGroup,
  selectedGroup,
  setShowHome,
  showHome,
}) => {
  const users = JSON.parse(JSON.parse(group.users));

  const getUsers = () => {
    let userNames = "";
    for (let i = 0; i < users.length; i++) {
      userNames =
        userNames +
        users[i].email.split("@")[0][0].toUpperCase() +
        users[i].email
          .split("@")[0]
          .slice(1, users[i].email.split("@")[0].length) +
        ", ";
    }
    return userNames.slice(0, -2);
  };

  const clickHandler = () => {
    setSelectedGroup(group);
    setShowHome(!showHome);
  };

  return (
    <div
      className={`d-flex align-items-center User flex-grow-1 ${
        group.name === selectedGroup?.name && ""
      }`}
      onClick={clickHandler}
    >
      <div className="User__avatar">{group.name[0].toUpperCase()}</div>
      <div className="w-75">
        <div className="User__name">
          {group.name[0].toUpperCase() + group.name.slice(1, group.name.length)}
        </div>
        <div
          className={`User__email ${
            showHome ? "d-block" : "d-none d-sm-block"
          }`}
        >
          Members: {getUsers()}
        </div>
      </div>
    </div>
  );
};

export default Group;
