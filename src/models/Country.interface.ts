export interface ICountry {
    name: {
        common: string;
        official: string;
        nativeName: {
            eng: {
                official: string;
                common: string;
            };
        };
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    capital: Array<string>;
    altSpellings: Array<string>;
    region: string;
    subregion: string;
    languages: object;
    population: number;
    continent: Array<string>;
    flags: {
        png: string;
        svg: string;
    };
    coatOfArms: {
        png: string;
        svg: string;
    };
}
