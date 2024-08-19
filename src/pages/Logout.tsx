import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsLoggined from '../hooks/useIsLoggined.ts';
import {request} from "../lib/axios.ts";
import useAccessToken from "../hooks/useAccessToken.ts";
import Cookie from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();
    const { removeUserLogin } = useIsLoggined();
	const { removeToken } = useAccessToken()

    useEffect(() => {
        const logout = async () => {
			await request.post('/auth/logout').then(async () => {
				await removeUserLogin();
				await removeToken();
				Cookie.remove('rfToken');

				navigate('/login');
			});
        };

        logout();
    });

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
