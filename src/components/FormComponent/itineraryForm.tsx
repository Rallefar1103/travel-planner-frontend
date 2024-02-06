import React, { useState, forwardRef, Ref } from "react";
import { gql, useMutation } from "@apollo/client";
import "./itineraryForm.css";

import { Itinerary, UserPreferences } from "../../models/itinerary";
import parseItineraryResponse from "../../handlers/parseItineraryResponse";

interface ItineraryFormProps {
  onSubmissionStart: () => void;
  onSubmissionSuccess: (itineraryData: any) => void;
  onSubmissionError: (error: Error) => void;
}

const ItineraryForm = forwardRef<HTMLDivElement, ItineraryFormProps>(
  (
    { onSubmissionStart, onSubmissionSuccess, onSubmissionError },
    ref: Ref<HTMLDivElement>
  ) => {
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

      onSubmissionStart();

      try {
        const { data } = await createItinerary({
          variables: { itineraryInput: updatedFormState },
        });

        // parse graphql response
        const parsedData = parseItineraryResponse(data);
        onSubmissionSuccess(parsedData);

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
      } catch (e: any) {
        console.error("Error creating itinerary:", e);
        onSubmissionError(e);
      }
    };

    return (
      <section id="itineraryForm" ref={ref}>
        <div className="intro-section">
          <div className="intro-section-left"></div>
          <div className="intro-section-right"></div>
        </div>

        <div className="cuisine-section">
          <div className="cuisine-section-left"></div>
          <div className="cuisine-section-right"></div>
        </div>

        <div className="attraction-section">
          <div className="attaction-section-left"></div>
          <div className="attraction-section-right"></div>
        </div>

        <div className="itinerary-result-section"></div>
      </section>
    );
  }
);

export default ItineraryForm;

{
  /* <div className="form-group">
              <label className="form-label" htmlFor="attraction-type">
                {" "}
                Type{" "}
              </label>
              <select
                className="form-input"
                name="userPreferences.attractionOptions.type"
                value={formState.userPreferences.attractionOptions.type}
                multiple={false}
                onChange={handleChange}
                required={true}
              >
                <option value=""> Select Type </option>
                <option value="art">Art 🖼️ </option>
                <option value="outdoor">Outdoor 🏞️ </option>
                <option value="monuments">Monuments 🗽 </option>
                <option value="religion">Religion 🕌 </option>
                <option value="sports">Sports 🏟️ </option>
                <option value="city">City 🌆 </option>
              </select>
            </div> */
}

{
  /* <div className="form-group">
              <label className="form-label" htmlFor="labelForAttractionPrice">
                {" "}
                Price{" "}
              </label>
              <select
                className="form-input"
                name="userPreferences.attractionOptions.priceRange"
                value={formState.userPreferences.attractionOptions.priceRange}
                multiple={false}
                onChange={handleChange}
                required={true}
              >
                <option value=""> Select Price </option>
                <option value="budget">$ </option>
                <option value="midrange">$$</option>
                <option value="highend">$$$</option>
              </select>
            </div> */
}

{
  /* Include any logos or additional info here */
}

{
  /* <div className="form-group">
                <label className="form-label" htmlFor="destination">
                  🌎 Destination City
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="destination"
                  value={formState.destination}
                  onChange={handleChange}
                  placeholder="Where to?"
                  required={true}
                />
              </div> */
}

{
  /* <div className="form-group">
                <label className="form-label" htmlFor="duration">
                  ⏳ Hours at destination
                </label>
                <input
                  className="form-input"
                  type="number"
                  name="duration"
                  value={formState.duration}
                  onChange={handleChange}
                  required={true}
                />
              </div> */
}
{
  /* 
              <div className="form-group">
                <label className="form-label" htmlFor="budget">
                  💰 Budget for your trip ($)
                </label>
                <input
                  className="form-input"
                  type="number"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  required={true}
                />
              </div> */
}

{
  /* <div className="form-group">
                  <label className="form-label" htmlFor="cuisine">
                    {" "}
                    Cuisine{" "}
                  </label>
                  <select
                    className="form-input"
                    name="userPreferences.diningOptions.cuisine"
                    value={formState.userPreferences.diningOptions.cuisine}
                    multiple={false}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value=""> Select Cuisine </option>
                    <option value="italian">Italian 🍝 </option>
                    <option value="mexican">Mexican 🌮 </option>
                    <option value="japanese">Japanese 🍣 </option>
                    <option value="mediterranean">Mediterranean 🥙 </option>
                    <option value="american">American 🍔 </option>
                  </select>
                </div> */
}

{
  /* <div className="form-group">
                  <label className="form-label" htmlFor="restaurant-type">
                    {" "}
                    Type{" "}
                  </label>
                  <select
                    className="form-input"
                    name="userPreferences.diningOptions.type"
                    value={formState.userPreferences.diningOptions.type}
                    multiple={false}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value=""> Select Type </option>
                    <option value="restaurant">Restaurant 🍴</option>
                    <option value="bar">Bar 🍸</option>
                  </select>
                </div> */
}

{
  /* <div className="form-group">
                  <label className="form-label" htmlFor="restaurant-price">
                    {" "}
                    Price{" "}
                  </label>
                  <select
                    className="form-input"
                    name="userPreferences.diningOptions.priceRange"
                    value={formState.userPreferences.diningOptions.priceRange}
                    multiple={false}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value=""> Select Price Range </option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                  </select>
                </div> */
}

{
  /* <div className="submit-area">
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating your itinerary..." : "Create Itinerary"}
          </button>
          {error && <p className="error-message">Error: {error.message}</p>}
        </div> */
}
