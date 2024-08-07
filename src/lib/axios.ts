import axios, {AxiosInstance} from "axios";

const SERVER_ADDRESS = import.meta.env.VITE_API_URL as string;

export const request: AxiosInstance = axios.create({
	baseURL: SERVER_ADDRESS,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	},
})
