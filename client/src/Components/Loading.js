import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="Loading d-flex justify-content-center align-items-center">
      <ThreeDots />
    </div>
  );
};

export default Loading;
