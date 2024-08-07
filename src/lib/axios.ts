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

request.interceptors.response.use(async function (response) {
	return response;
}, async function (error) {
	const { config, response: { status }} = error;

	if(status === 401 && error.data.message === 'InvaildTokenException') {
		// 토큰이 유효하지 않을 때 로그안 페이지로 이동
		window.location.hash = '/login';
	}

	if(status === 401 && error.data.message === 'TokenExpired') {
		// 토큰 갱신 요청
		const tokenRefreshResponse = await request.post('/auth/refresh');

		if(tokenRefreshResponse.status === 200) {
			const { accessToken, refreshToken } = tokenRefreshResponse.data;
			// 새로 발급받은 토큰들을 쿠키에 저장
			Cookie.set('acToken', accessToken);
			Cookie.set('rfToken', refreshToken);
			// 토큰 갱신 후 기존 요청 재시도
			return request(config);
		}
	}
})