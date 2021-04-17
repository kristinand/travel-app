import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000/',
});

export const Api = {

	getCountries(lang: string): Promise<any> {
		if (lang === 'en') {
			return instance.get(`/countries?lang=${lang}`)
		} else if (lang === 'de') {
			return instance.get(`/countries?lang=${lang}`)
		} else {
			return instance.get("/countries")
		}
	},

	getTemperature(coordinates: number[], lang: string): Promise<any> {
		return axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${process.env.REACT_APP_WATHER_KEY}&units=metric&lang=${lang}`
		)
	},

	login(body: string): Promise<any> {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		return instance.post("/login", body, config);
	},

	signup(body: string): Promise<any> {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		return instance.post("/join", body, config);
	},

	getСurrency(currency: string) {
		return Promise.allSettled([
			axios.get<ICurrencyResp>(`https://api.exchangeratesapi.io/latest?symbols=${currency}&base=USD`),
			axios.get<ICurrencyResp>(`https://api.exchangeratesapi.io/latest?symbols=${currency}&base=EUR`),
			axios.get<ICurrencyResp>(`https://api.exchangeratesapi.io/latest?symbols=${currency}&base=RUB`),
		])
	},

	getRating(id: string) {
		return instance.post<IRatingResponse[]>('/rating', { id })
	},

	setRating(attrId: string, userName: string, rating: number): Promise<any> {
		return instance.put('/rating', { attrId, userName, rating })
	}
};

interface ICurrencyResp {
	rates: {
		[key: string]: number
	}
}

export interface IRatingResponse {
	_id: string,
	attraction: string,
	email: string,
	userName: string,
	__v: number,
	rating: number
}
