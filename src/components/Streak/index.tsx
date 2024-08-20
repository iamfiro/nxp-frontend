import style from './style.module.scss';
import { PiPlantFill } from "react-icons/pi";
import {Row} from "../index.ts";
import {useEffect, useState} from "react";
import {request} from "../../lib/axios.ts";
import {getIsLoggedIn} from "../../lib/idb.ts";

const Streak = () => {
    const [streak, setStreak] = useState<number | '로그인이 필요합니다'>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const isLoggined = await getIsLoggedIn();
            if (isLoggined) {
                try {
                    const response = await request('/main/authed');
                    setStreak(response.data.streak);  // Set the streak value here
                } catch (error) {
                    console.error('Error fetching streak data:', error);
                }
            } else {
                setStreak('로그인이 필요합니다');
            }
            setIsLoaded(true);
        };

        fetchData();
    }, []);

    return (
        <div className={style.container}>
            <Row style={{ gap: '8px' }}>
                <PiPlantFill size={20} />
                <span className={style.title}>스트릭</span>
            </Row>
            <span className={style.value}>
                {
                    isLoaded ? (
                        <span>
                            {streak === '로그인이 필요합니다' ? streak : `현재 ${streak}일`}
                        </span>
                    ) : '불러오는 중'
                }
            </span>
        </div>
    )
};

export default Streak;
