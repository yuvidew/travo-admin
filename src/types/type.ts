export type Country = {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    name: {
        common: string;
        official: string;
        nativeName?: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    latlng: [number, number];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
};

export type CountryListType = {
    name: string;
    flag: {
        png: string;
        svg: string;
        alt?: string;
    };
    coordinates: [number, number];
    value: string;
    openStreetMap: string;
};

type TripActivity = {
    time: string;
    description: string;
};

export type TripItineraryDay = {
    day: number;
    location: string;
    activities: TripActivity[];
};

export type TripLocation = {
    city: string;
    coordinates: [number, number];
    openStreetMap: string;
};

export type TripResult = {
    name: string;
    description: string;
    estimatedPrice: string;
    duration: number;
    budget: string;
    travelStyle: string;
    country: string;
    interests: string;
    groupType: string;
    bestTimeToVisit: string[];
    weatherInfo: string[];
    location: TripLocation;
    itinerary: TripItineraryDay[];
};

export type Trip = {
    id: number;
    country: string;
    group_type: string;
    travel_style: string;
    interest: string;
    budget_estimate: string;
    images: string; // comma-separated URLs
    result: TripResult; // JSON string of TripResult
    created_at: string; // ISO date string
    userId: string;
    is_published: number
};


export type User = {
    name: string
    email: string
    picture: string
}

export type TripList = {
    id: number
    price: number,
    user_name: string,
    status: "pending" | "processing" | "success" | "failed"
    user_email: string,
    booked_trips: number
}

export type TripWithBooking = {

    booking_id: number;
    user_id: number;
    price: string;
    start_date: string; // ISO Date
    end_date: string;   // ISO Date
    status: string;
    booking_date: string; // ISO Date
    destination: string;
    user_name: string;
    user_email: string;
    trips: Trip[];

};
