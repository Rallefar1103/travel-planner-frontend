import React, { useState } from "react";

import "./App.css";
import ItineraryForm from "./components/FormComponent/itineraryForm";
import { Itinerary } from "./models/itinerary";
import Spinner from "./components/Spinner/spinner";
import ItineraryDataComponent from "./components/ItineraryData/itineraryData";
import Hero from "./components/Hero/Hero";

function App() {
  const [view, setView] = useState<"form" | "spinner" | "itinerary">("form");
  const [itineraryData, setItineraryData] = useState<any>();
  const [error, setError] = useState<string>("");

  const handleSubmissionStart = () => {
    console.log("Setting Spinner!");
    setView("spinner");
  };

  const handleSubmissionSuccess = (data: Itinerary) => {
    console.log("Setting the DATA");
    setItineraryData(data);
    setView("itinerary");
  };

  const handleSubmissionError = (error: Error) => {
    setError(error.message);
    setView("form");
  };

  const handleCloseItinerary = () => {
    setView("form");
  };

  return (
    <div className="App">
      <Hero />

      <ItineraryForm
        onSubmissionStart={handleSubmissionStart}
        onSubmissionSuccess={handleSubmissionSuccess}
        onSubmissionError={handleSubmissionError}
      />
    </div>
  );
}

export default App;
