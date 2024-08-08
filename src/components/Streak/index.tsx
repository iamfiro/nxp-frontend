import style from './style.module.scss';
import { PiPlantFill } from "react-icons/pi";
import {Row} from "../index.ts";
import {useEffect, useState} from "react";
import {request} from "../../lib/axios.ts";

const Streak = () => {
	const [streak, setStreak] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		request('/streak').then((response) => {
			setStreak(response.data.streak);
			setIsLoaded(true);
		});
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
							현재 <strong>{streak}</strong>일
						</span>
					) : '불러오는 중'
				}
			</span>
		</div>
	)
};

export default Streak;
