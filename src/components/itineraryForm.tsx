import React from "react";
import "./styles/itineraryForm.css";

function handleSubmit() {}

const ItineraryForm = () => {
  return (
    <section id="itineraryForm">
      <h1 className="formTitle"> Travel Planner 🌴 🛫 </h1>
      <p className="formDescription">
        {" "}
        Input your travel preferences below and the Travel Planner tool will
        provide you an itinerary based on your input. The more specific you are,
        the better the results! 👏
      </p>

      <form className="form" onSubmit={handleSubmit}></form>
    </section>
  );
};

export default ItineraryForm;
