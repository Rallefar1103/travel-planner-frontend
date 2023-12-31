export type Itinerary = {
    id: string;
    title: string;
    destination: string;
    budget: string;
    duration: string;
    userPreferences: UserPreferences;
    recommendedItineraryDescription: string;
};

export type UserPreferences = {
    diningOptions: DiningOptions;
    attractionOptions: AttractionOptions;
};

export type DiningOptions = {
    type: string;
    cuisine: string;
    priceRange: string;
};

export type AttractionOptions = {
    type: string;
    priceRange: string;
}

