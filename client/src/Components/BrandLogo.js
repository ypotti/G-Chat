import React from "react";
import { BsFillChatQuoteFill } from "react-icons/bs";

const BrandLogo = () => {
  return (
    <div className="d-flex align-items-center">
      <BsFillChatQuoteFill className="Login__brand-icon" />
      <em className="Login__brand-name">G-Chat</em>
    </div>
  );
};

export default BrandLogo;
