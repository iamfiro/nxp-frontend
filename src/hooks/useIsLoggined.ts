import { useState, useEffect } from 'react';
import {deleteIsLoggedIn, getIsLoggedIn, saveIsLoggedIn} from "../lib/idb.ts";

interface UseIsLoggined {
	isUserLogin: boolean;
	storeUserLogin: (newState: boolean) => Promise<void>;
	removeUserLogin: () => Promise<void>;
}

const useIsLoggined = (): UseIsLoggined => {
	const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

	// 초기화 및 토큰 조회
	useEffect(() => {
		const fetchIsLoggined = async () => {
			const IsLoginFromDB = await getIsLoggedIn();
			setIsUserLogin(IsLoginFromDB);
		};

		fetchIsLoggined();
	}, []);

	// 토큰 저장
	const storeUserLogin = async (newState: boolean): Promise<void> => {
		await saveIsLoggedIn(newState);
		setIsUserLogin(newState);
	};

	// 토큰 삭제
	const removeUserLogin = async (): Promise<void> => {
		await deleteIsLoggedIn();
		setIsUserLogin(false);
	};

	return {
		isUserLogin,
		storeUserLogin,
		removeUserLogin,
	};
};

export default useIsLoggined;
