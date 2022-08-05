import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const TextMessage = ({ message, index, chat }) => {
  const [isSecondMessage, setIsSecondMessage] = useState(false);
  const [isMyMessage, setIsMyMessage] = useState(false);
  const currentUserEmail = Cookies.get("email");

  const getUserName = (mail) => {
    const userName =
      mail.split("@")[0][0].toUpperCase() +
      mail.split("@")[0].slice(1, mail.split("@")[0].length);
    return userName;
  };

  useEffect(() => {
    getIfSecondMessage();
    getIsMyMessage();
  });

  const getIsMyMessage = () => {
    if (currentUserEmail === message.user_email) {
      setIsMyMessage(true);
    }
  };

  const getIfSecondMessage = () => {
    if (index > 0) {
      if (chat[index - 1].user_email === message.user_email) {
        setIsSecondMessage(true);
      }
    } else {
      setIsSecondMessage(false);
    }
  };

  return (
    <div
      className={` d-flex ${isMyMessage ? "flex-row-reverse" : "flex-row"} ${
        isSecondMessage ? "mt-2" : "mt-3"
      }`}
    >
      <div
        className={`message__avatar me-3 mt-1 ${
          isSecondMessage ? "z-ind-neg" : "d-block"
        } ${isMyMessage && "my__avatar"}`}
      >
        {getUserName(message.user_email)[0]}
      </div>
      <div className={`message__wrap ${isMyMessage && "my-message"}`}>
        <div
          className={`User__email ${isSecondMessage ? "d-none" : "d-block"} ${
            isMyMessage && "text-light"
          }`}
        >
          {getUserName(message.user_email)}:
        </div>
        <div>{message.message}</div>
      </div>
    </div>
  );
};

export default TextMessage;
