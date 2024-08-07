import axios, {AxiosInstance} from "axios";
import Cookie from "js-cookie";

const SERVER_ADDRESS = import.meta.env.VITE_API_URL as string;

export const request: AxiosInstance = axios.create({
	baseURL: SERVER_ADDRESS,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

request.interceptors.request.use(async function (config) {
	const acessToken = Cookie.get('acToken');

	if(acessToken) {
		config.headers.Authorization = `Bearer ${acessToken}`;
	}

	return config;
}, function (error) {
	return Promise.reject(error);
})
