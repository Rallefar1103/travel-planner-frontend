import React from "react";
import { Itinerary } from "../../models/itinerary";
import "./itineraryData.css";

interface ItineraryDataProps {
  itineraryData: Itinerary;
  onClose: () => void;
}

const ItineraryDataComponent: React.FC<ItineraryDataProps> = ({
  itineraryData,
  onClose,
}) => {
  const formattedDescription = itineraryData.recommendedItineraryDescription
    .split("\n")
    .map((item, index) => <p key={index}>{item}</p>);
  return (
    <div className="itineraryDataContainer">
      <button className="closeButton" onClick={onClose}>
        &times;
      </button>
      <div>
        <h2>{itineraryData.title} </h2>

        <div className="itineraryDescription">{formattedDescription}</div>
      </div>
    </div>
  );
};

export default ItineraryDataComponent;
