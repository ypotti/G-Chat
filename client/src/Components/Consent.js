import React from "react";
import { BsQuestionOctagonFill } from "react-icons/bs";
import "./style.css";

const Consent = ({ logout, setShowConsent }) => {
  const proceedHandler = () => {
    setShowConsent(false);
    logout();
  };

  return (
    <div className="Loading d-flex justify-content-center align-items-center">
      <div className="col-10 col-md-7 col-lg-4 h-50 Consent__wrap">
        <div className="d-flex flex-column justify-content-center w-100 h-100 align-items-center">
          <BsQuestionOctagonFill className="Consent__Icon" />
          <p className="text-color mb-4">Are you sure?</p>
          <div>
            <button
              className="secondary-button me-3"
              onClick={() => setShowConsent(false)}
            >
              Cancel
            </button>
            <button className="button" onClick={proceedHandler}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consent;
