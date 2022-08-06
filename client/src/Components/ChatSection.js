import React, { useEffect, useRef, useState } from "react";
import Group from "./Group";
import Cookies from "js-cookie";
import { FaTelegramPlane } from "react-icons/fa";
import { IoChevronBackCircle } from "react-icons/io5";
import TextMessage from "./TextMessage";
import "./style.css";

const ChatSection = ({ selectedGroup, showHome, setShowHome }) => {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = Cookies.get("token");
  const email = Cookies.get("email");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getChat();
  }, [selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

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

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && newMessage !== "") {
      const url = `http://localhost:8080/chat`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          message: newMessage,
        }),
      });
      const data = await response.json();
      setChat(data);
      setNewMessage("");
    }
  };

  return (
    <div
      className={`Home__chat col-12 col-lg-8 d-lg-flex d-flex  flex-column justify-content-between align-items-center ${
        showHome && "d-none"
      }`}
    >
      <div className="w-100 d-flex">
        <div
          className="add-border d-flex align-items-center p-2 d-lg-none"
          onClick={() => setShowHome(!showHome)}
        >
          <IoChevronBackCircle className="ColorTheme__icon" />
        </div>
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
        <div ref={messagesEndRef} />
      </div>
      <div className="d-flex flex-row align-items-center chat-footer-90">
        <input
          className="input-field search message-input"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleKeyDown}
        />
        <div className="send-wrap">
          <FaTelegramPlane className="send-icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
