import React, { useState } from "react";

import "./App.css";
import ItineraryForm from "./components/itineraryForm";
import { Itinerary } from "./models/itinerary";
import Spinner from "./components/spinner";
import ItineraryDataComponent from "./components/itineraryData";

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
      <header className="App-header">
        {view === "form" && (
          <ItineraryForm
            onSubmissionStart={handleSubmissionStart}
            onSubmissionSuccess={handleSubmissionSuccess}
            onSubmissionError={handleSubmissionError}
          />
        )}
        {view === "spinner" && <Spinner />}
        {view === "itinerary" && (
          <ItineraryDataComponent
            itineraryData={itineraryData}
            onClose={handleCloseItinerary}
          />
        )}
      </header>
    </div>
  );
}

export default App;
