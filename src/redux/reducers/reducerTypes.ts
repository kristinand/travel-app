export interface IState {
  countries: ICountry[];
  lang: string;
  searchValue: string;
  filteredCountries: ICountry[];
  userData: IUser;
}

export interface IUser {
  name: string;
  email: string;
  photo: string;
}

export interface ICountry {
  country: string;
  capital: string;
  coordinates: number[];
  currency: string;
  ISOCode: string;
  timezone: string;
  imageURL: string;
  videoURL: string;
  desc: string;
  attractions: IAttractions[];
}

export interface IAttractions {
  name: string;
  imageURL: string;
  desc: string;
  _id: string;
}
