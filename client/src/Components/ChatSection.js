import React, { useEffect, useState } from "react";
import Group from "./Group";
import Cookies from "js-cookie";
import { FaTelegramPlane } from "react-icons/fa";
import TextMessage from "./TextMessage";
import "./style.css";

const ChatSection = ({ selectedGroup }) => {
  const [chat, setChat] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    getChat();
  }, [selectedGroup]);

  const getChat = async () => {
    const url = `http://localhost:8080/chat?group_id=${selectedGroup.id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setChat(data);
  };

  return (
    <div className="Home__chat d-flex flex-column justify-content-between align-items-center">
      <div className="w-100">
        <Group group={selectedGroup} />
      </div>
      <div className="chat-footer-90 flex-grow-1 chat-hero scrollbar pt-3">
        {chat.map((message, index) => (
          <TextMessage
            message={message}
            index={index}
            chat={chat}
            key={index}
          />
        ))}
      </div>
      <div className="d-flex flex-row align-items-center chat-footer-90">
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