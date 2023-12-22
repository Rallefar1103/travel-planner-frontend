export type Itinerary = {
    destination: string;
    budget: string;
    duration: string;
    UserPreferences: UserPreferences;

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
    type: string[];
    priceRange: string;
}

