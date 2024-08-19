import axios, { AxiosInstance } from "axios";
import Cookie from "js-cookie";
import { getAccessToken, saveAccessToken } from "./idb.ts";

const SERVER_ADDRESS = import.meta.env.VITE_API_URL as string;

export const request: AxiosInstance = axios.create({
	baseURL: SERVER_ADDRESS,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

export const requestNoAuth: AxiosInstance = axios.create({
	baseURL: SERVER_ADDRESS,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

request.interceptors.request.use(async function (config) {
	const token = await getAccessToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
}, function (error) {
	return Promise.reject(error);
});

request.interceptors.response.use(async function (response) {
	return response;
}, async function (error) {
	if (!error.response) {
		// 응답 객체가 없는 경우 네트워크 또는 기타 오류
		return Promise.reject(error);
	}

	const { config, response } = error;
	const { status, data } = response;

	if (status === 401 && data?.message === 'InvalidTokenException') {
		// 토큰이 유효하지 않을 때 로그인 페이지로 이동
		window.location.hash = '/login';
		return Promise.reject(error);
	}

	if (status === 401 && data?.message === 'TokenExpired') {
		// 토큰 갱신 요청
		try {
			const tokenRefreshResponse = await requestNoAuth.post('/auth/refresh');
			if (tokenRefreshResponse.status === 200) {
				const { accessToken, refreshToken } = tokenRefreshResponse.data;
				// 새로 발급받은 토큰들을 쿠키에 저장
				await saveAccessToken(accessToken);
				Cookie.set('rfToken', refreshToken, {
					secure: true,
					httpOnly: true,
				});
				// 갱신된 토큰을 사용하여 기존 요청 재시도
				config.headers.Authorization = `Bearer ${accessToken}`;
				return request(config);
			}
		} catch (refreshError) {
			return Promise.reject(refreshError);
		}
	}

	return Promise.reject(error);
});
