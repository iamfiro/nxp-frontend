import axios, { AxiosInstance } from "axios";
import Cookie from "js-cookie";
import {deleteAccessToken, deleteIsLoggedIn, getAccessToken, getIsLoggedIn, saveAccessToken} from "./idb.ts";

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
	const { status } = response;
	const isLoggedIn = await getIsLoggedIn()

	if (status === 401 && isLoggedIn) {
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
	} else if(status === 401 && !isLoggedIn) {
		await deleteAccessToken();
		await deleteIsLoggedIn();

		Cookie.remove('rfToken');
	}

	return Promise.reject(error);
});
