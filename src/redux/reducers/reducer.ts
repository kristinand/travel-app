import { IState } from './reducerTypes';
// eslint-disable-next-line import/no-cycle
import { ActionsTypes } from '../actions/actionsTypes';

export const SET_COUNTRIES = 'SET_COUNTRIES';
export const SET_LANG = 'SET_LANG';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_FILTERED_COUNTRIES = 'SET_FILTERED_COUNTRIES';
export const SET_USER_DATA = 'SET_USER_DATA';

export const initialState: IState = {
  countries: [],
  lang: 'ru',
  searchValue: '',
  filteredCountries: [],
  userData: {
    name: '',
    email: '',
    photo: '',
  },
};

const reducer = (state = initialState, action: ActionsTypes): IState => {
  switch (action.type) {
    case SET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case SET_LANG: {
      return {
        ...state,
        lang: action.payload,
      };
    }
    case SET_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
    case SET_FILTERED_COUNTRIES: {
      return {
        ...state,
        filteredCountries: action.payload,
      };
    }
    case SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
