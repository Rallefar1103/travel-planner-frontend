

function parseItineraryResponse(itineraryResponse: any){
    const itineraryData = itineraryResponse.createItinerary;


    const parsedItinerary = {
        id: itineraryData.id,
        title: itineraryData.title,
        destination: itineraryData.destination,
        duration: itineraryData.duration,
        budget: itineraryData.budget,
        userPreferences: {
            diningOptions: {
                type: itineraryData.userPreferences.diningOptions.type,
                cuisine: itineraryData.userPreferences.diningOptions.cuisine,
                priceRange: itineraryData.userPreferences.diningOptions.priceRange,
            },
            attractionOptions: {
                type: itineraryData.userPreferences.attractionOptions.type,
                priceRange: itineraryData.userPreferences.attractionOptions.priceRange,
            }
        },
        recommendedItineraryDescription: itineraryData.recommendedItineraryDescription,
    };

    return parsedItinerary;
}

export default parseItineraryResponse;