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