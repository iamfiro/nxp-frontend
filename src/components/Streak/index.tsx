import style from './style.module.scss';
import { PiPlantFill } from "react-icons/pi";
import {Row} from "../index.ts";

const Streak = () => {
	return (
		<div className={style.container}>
			<Row style={{ gap: '8px' }}>
				<PiPlantFill size={20} />
				<span className={style.title}>스트릭</span>
			</Row>
			<span className={style.value}>현재 <strong>43</strong>일</span>
		</div>
	)
};

export default Streak;
