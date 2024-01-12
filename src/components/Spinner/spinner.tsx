import React from "react";
import "./spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner"></div>
      <p className="spinnerText"> Creating your itinerary ...</p>
    </div>
  );
};

export default Spinner;
