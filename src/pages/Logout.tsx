import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsLoggined from '../hooks/useIsLoggined.ts';

const Logout = () => {
    const navigate = useNavigate();
    const { removeUserLogin } = useIsLoggined();

    useEffect(() => {
        const logout = async () => {
            await removeUserLogin();
            navigate('/login');
        };

        logout();
    }, [navigate, removeUserLogin]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;