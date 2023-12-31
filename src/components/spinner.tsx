import React from "react";
import "./styles/spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner">
        <p className="spinnerText"> Creating your itinerary ...</p>
      </div>
    </div>
  );
};

export default Spinner;
