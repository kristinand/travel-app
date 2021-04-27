/* eslint-disable max-len */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000/',
});

export const Api = {
  getCountries(lang: string) {
    return instance.get(`/countries?lang=${lang}`);
  },

  getTemperature(coordinates: number[], lang: string): Promise<any> {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
    return axios.get(
      `${weatherURL}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&lang=${lang}`,
    );
  },

  login(body: string): Promise<any> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return instance.post('/login', body, config);
  },

  signup(body: string): Promise<any> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return instance.post('/join', body, config);
  },

  getСurrency(currency: string) {
    const currencyURL = `https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=${process.env.REACT_APP_CURR_KEY}`;
    return Promise.allSettled([
      axios.get<ICurrencyResp>(`${currencyURL}&q=USD_${currency}`),
      axios.get<ICurrencyResp>(`${currencyURL}&q=EUR_${currency}`),
      axios.get<ICurrencyResp>(`${currencyURL}&q=RUB_${currency}`),
    ]);
  },

  getRating(id: string) {
    return instance.post<IRatingResponse[]>('/rating', { id });
  },

  setRating(attrId: string, userName: string, rating: number): Promise<any> {
    return instance.put('/rating', { attrId, userName, rating });
  },
};

interface ICurrencyResp {
  rates: {
    [key: string]: number;
  };
}

export interface IRatingResponse {
  _id: string;
  attraction: string;
  email: string;
  userName: string;
  __v: number;
  rating: number;
}
