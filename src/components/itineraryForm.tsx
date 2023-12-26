import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./styles/itineraryForm.css";

import { UserPreferences } from "../models/itinerary";

const ItineraryForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    destination: "",
    duration: "",
    budget: "",
    userPreferences: {
      diningOptions: {
        type: "",
        cuisine: "",
        priceRange: "",
      },
      attractionOptions: {
        type: "",
        priceRange: "",
      },
    },
  });

  const CREATE_ITINERARY = gql`
    mutation CreateItinerary($itineraryInput: ItineraryInput!) {
      createItinerary(itineraryInput: $itineraryInput) {
        id
        title
        destination
        duration
        budget
        userPreferences {
          diningOptions {
            type
            cuisine
            priceRange
          }
          attractionOptions {
            type
            priceRange
          }
        }
        recommendedItineraryDescription
      }
    }
  `;

  const [createItinerary, { loading, error }] = useMutation(CREATE_ITINERARY);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");

    setFormState((prevState) => {
      if (nameParts.length === 3 && nameParts[0] === "userPreferences") {
        if (nameParts[1] in prevState.userPreferences) {
          const preferenceKey = nameParts[1] as keyof UserPreferences;
          const optionKey = nameParts[2];

          return {
            ...prevState,
            userPreferences: {
              ...prevState.userPreferences,
              [preferenceKey]: {
                ...prevState.userPreferences[preferenceKey],
                [optionKey]: value,
              },
            },
          };
        }
      }

      // Handle other fields outside userPreferences
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    console.log("Hitting submit!");
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const title = `${formState.destination} ${currentYear}`;

    const updatedFormState = {
      ...formState,
      title: title,
    };

    try {
      console.log("Submitting with form state", updatedFormState);
      const { data } = await createItinerary({
        variables: { itineraryInput: updatedFormState },
      });
      console.log("Itinerary created:", data);

      setFormState({
        title: "",
        destination: "",
        duration: "",
        budget: "",
        userPreferences: {
          diningOptions: {
            type: "",
            cuisine: "",
            priceRange: "",
          },
          attractionOptions: {
            type: "",
            priceRange: "",
          },
        },
      });
    } catch (e) {
      console.error("Error creating itinerary:", e);
    }
  };

  return (
    <section id="itineraryForm">
      <h1 className="formTitle"> Daily Travel Planner 🌴 🛫 </h1>
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
            🌎 Destination (city)
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
            ⏳ Duration (hours)
          </label>
          <input
            type="number"
            name="duration"
            value={formState.duration}
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
            value={formState.budget}
            onChange={handleChange}
          />
        </div>

        <h3 className="userPreferencesText"> More preferences </h3>
        <section className="userPreferences">
          <p className="diningOptionsText">
            Provide some information regarding your{" "}
            <span className="boldDiningOptions">dinner preferences 🍽️</span>
          </p>
          <div className="diningOptions">
            <div className="cuisineField">
              <label htmlFor="labelForCuisine"> Cuisine </label>
              <select
                name="userPreferences.diningOptions.cuisine"
                value={formState.userPreferences.diningOptions.cuisine}
                multiple={false}
                onChange={handleChange}
              >
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
              <select
                name="userPreferences.diningOptions.type"
                value={formState.userPreferences.diningOptions.type}
                multiple={false}
                onChange={handleChange}
              >
                <option value=""> Select Type </option>
                <option value="restaurant">Restaurant 🍴</option>
                <option value="bar">Bar 🍸</option>
              </select>
            </div>

            <div className="priceRangeField">
              <label htmlFor="labelForPrinceRange"> Price </label>
              <select
                name="userPreferences.diningOptions.priceRange"
                value={formState.userPreferences.diningOptions.priceRange}
                multiple={false}
                onChange={handleChange}
              >
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
              <select
                name="userPreferences.attractionOptions.type"
                value={formState.userPreferences.attractionOptions.type}
                multiple={false}
                onChange={handleChange}
              >
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
              <select
                name="userPreferences.attractionOptions.priceRange"
                value={formState.userPreferences.attractionOptions.priceRange}
                multiple={false}
                onChange={handleChange}
              >
                <option value=""> Select Price </option>
                <option value="budget">$</option>
                <option value="midrange">$$</option>
                <option value="highend">$$$</option>
              </select>
            </div>
          </div>
          <div className="submitArea">
            <button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating your itinerary..." : "Create Itinerary"}
            </button>
            {error && <p className="error-message">Error: {error.message}</p>}
          </div>
        </section>
      </form>
    </section>
  );
};

export default ItineraryForm;
