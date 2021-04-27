import { ICountry, IUser } from '../reducers/reducerTypes';
import { ISetCountries, ISetFilteredCountries, ISetLang, ISetSearchValue, ISetUserData } from './actionsTypes';
import { SET_COUNTRIES, SET_FILTERED_COUNTRIES, SET_LANG, SET_SEARCH_VALUE, SET_USER_DATA } from '../reducers/reducer';

export const setCountries = (payload: ICountry[]): ISetCountries => ({ type: SET_COUNTRIES, payload });
export const setLang = (payload: string): ISetLang => ({ type: SET_LANG, payload });
export const setSearchValue = (payload: string): ISetSearchValue => ({ type: SET_SEARCH_VALUE, payload });
export const setFilteredCountries = (payload: ICountry[]): ISetFilteredCountries => ({
  type: SET_FILTERED_COUNTRIES,
  payload,
});
export const setUserData = (payload: IUser): ISetUserData => ({ type: SET_USER_DATA, payload });
