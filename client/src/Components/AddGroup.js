import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddGroup = () => {
  const navigate = useNavigate();
  return (
    <div className="add_group" onClick={() => navigate("/new-group")}>
      <AiOutlineUsergroupAdd className="ColorTheme__icon" />
    </div>
  );
};

export default AddGroup;
