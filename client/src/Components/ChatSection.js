import React from "react";
import Group from "./Group";
import { FaTelegramPlane } from "react-icons/fa";
import "./style.css";

const ChatSection = ({ selectedGroup }) => {
  return (
    <div className="Home__chat d-flex flex-column justify-content-between align-items-center">
      <div className="w-100">
        <Group group={selectedGroup} />
      </div>
      <div>{/* body */}</div>
      <div className="d-flex flex-row align-items-center chat-footer">
        <input
          className="input-field search message-input"
          placeholder="Type your message"
        />
        <div className="send-wrap">
          <FaTelegramPlane className="send-icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
