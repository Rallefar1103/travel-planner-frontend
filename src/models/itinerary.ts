export type Itinerary = {
    destination: string;
    budget: string;
    duration: string;
    UserPreferences: UserPreferences;

};

type UserPreferences = {
    diningOptions: DiningOptions;
    attractionOptions: AttractionOptions;
};

type DiningOptions = {
    type: string;
    cuisine: string;
    priceRange: string;
};

type AttractionOptions = {
    type: string[];
}

