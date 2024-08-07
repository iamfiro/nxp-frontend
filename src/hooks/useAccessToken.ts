import { useState, useEffect } from 'react';
import { saveAccessToken, getAccessToken, deleteAccessToken } from '../lib/idb';

interface UseAccessToken {
	token: string | null;
	storeToken: (newToken: string) => Promise<void>;
	removeToken: () => Promise<void>;
}

const useAccessToken = (): UseAccessToken => {
	const [token, setToken] = useState<string | null>(null);

	// 초기화 및 토큰 조회
	useEffect(() => {
		const fetchToken = async () => {
			const tokenFromDB = await getAccessToken();
			setToken(tokenFromDB);
		};

		fetchToken();
	}, []);

	// 토큰 저장
	const storeToken = async (newToken: string): Promise<void> => {
		await saveAccessToken(newToken);
		setToken(newToken);
	};

	// 토큰 삭제
	const removeToken = async (): Promise<void> => {
		await deleteAccessToken();
		setToken(null);
	};

	return {
		token,
		storeToken,
		removeToken,
	};
};

export default useAccessToken;
