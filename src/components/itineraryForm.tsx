import React, { useState } from "react";
import "./styles/itineraryForm.css";
import {
  AttractionOptions,
  DiningOptions,
  Itinerary,
  UserPreferences,
} from "../models/itinerary";

function handleSubmit() {}

const ItineraryForm = () => {
  const diningOptions: DiningOptions = {
    cuisine: "",
    priceRange: "",
    type: "",
  };

  const attractionOptions: AttractionOptions = {
    type: [""],
    priceRange: "",
  };

  const userPref: UserPreferences = {
    diningOptions: diningOptions,
    attractionOptions: attractionOptions,
  };

  const [formState, setFormState] = useState<Itinerary>({
    destination: "",
    budget: "0",
    duration: "0",
    UserPreferences: userPref,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="itineraryForm">
      <h1 className="formTitle"> Travel Planner 🌴 🛫 </h1>
      <p className="formDescription">
        {" "}
        Input your travel preferences below and the Travel Planner tool will
        provide you an itinerary based on your input. The more specific you are,
        the better the results! 👏
      </p>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        <div className="destinationField">
          <label className="labelForDestination" htmlFor="destination">
            🌎 Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formState.destination}
            onChange={handleChange}
            placeholder="Where to?"
          />
        </div>

        <div className="durationField">
          <label className="labelForDuration" htmlFor="duration">
            ⏳ Duration (days)
          </label>
          <input
            type="number"
            name="duration"
            value={formState.destination}
            onChange={handleChange}
          />
        </div>

        <div className="budgetField">
          <label className="labelForBudget" htmlFor="budget">
            💰 Budget ($)
          </label>
          <input
            type="number"
            name="budget"
            value={formState.destination}
            onChange={handleChange}
          />
        </div>

        <h3 className="userPreferencesText"> More preferences </h3>
        <section className="userPreferences">
          <p className="diningOptionsText">
            Please provide some information regarding your{" "}
            <span className="boldDiningOptions">dining preferences 🍽️</span>
          </p>
          <div className="diningOptions">
            <div className="cuisineField">
              <label htmlFor="labelForCuisine"> Cuisine </label>
              <select name="cuisine">
                <option value=""> Select Cuisine </option>
                <option value="italian">Italian 🍝 </option>
                <option value="mexican">Mexican 🌮 </option>
                <option value="japanese">Japanese 🍣 </option>
                <option value="mediterranean">Mediterranean 🥙 </option>
                <option value="american">American 🍔 </option>
              </select>
            </div>

            <div className="typeField">
              <label htmlFor="labelForType"> Type </label>
              <select name="type">
                <option value=""> Select Type </option>
                <option value="restaurant">Restaurant 🍴</option>
                <option value="bar">Bar 🍸</option>
              </select>
            </div>

            <div className="priceRangeField">
              <label htmlFor="labelForPrinceRange"> Price </label>
              <select name="priceRange">
                <option value=""> Select Price Range </option>
                <option value="budget">$</option>
                <option value="midrange">$$</option>
                <option value="expensive">$$$</option>
                <option value="fineDining">$$$$</option>
              </select>
            </div>
          </div>

          <p className="attractionsOptionsText">
            Provide some information regarding your{" "}
            <span className="boldAttractionsOptions">
              attractions preferences 🏰
            </span>
          </p>
          <div className="attractionsOptions">
            <div className="attractionTypeField">
              <label htmlFor="labelForAttractionType"> Type </label>
              <select name="Attraction Type">
                <option value=""> Select Type </option>
                <option value="art">Art 🖼️ </option>
                <option value="outdoor">Outdoor 🏞️ </option>
                <option value="monuments">Monuments 🗽 </option>
                <option value="religion">Religion 🕌 </option>
                <option value="sports">Sports 🏟️ </option>
                <option value="city">City 🌆 </option>
              </select>
            </div>

            <div className="attractionPrice">
              <label htmlFor="labelForAttractionPrice"> Price </label>
              <select name="attractionPrice">
                <option value=""> Select Price </option>
                <option value="budget">$</option>
                <option value="midrange">$$</option>
                <option value="highend">$$$</option>
              </select>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

export default ItineraryForm;
