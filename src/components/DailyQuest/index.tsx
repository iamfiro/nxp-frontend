import style from './style.module.scss';
import {Column, Row} from "../index.ts";
import DailyIcon from '../../assets/icons/daily.png';
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbar} from "react-circular-progressbar";
import {levelToTextColor} from "../../lib/color.ts";
import {FaCheckCircle} from "react-icons/fa";

const progressStyles = {
	root: {
		width: '18px',
	},
	path: {
		stroke: 'var(--color-primary)',
	},
	trail: {
		stroke: 'var(--color-gray-030)',
	}
}

const DailyQuest = ({ children, progress = 0 }: { children: React.ReactNode, progress: number }) => {
	return (
		<Column className={style.container}>
			<Row style={{ justifyContent: 'space-between' }}>
				<Row style={{gap: '5px'}}>
					<img src={DailyIcon} alt="퀘스트 아이콘" className={style.icon}/>
					<span className={style.title}>일일 퀘스트</span>
				</Row>
				<Row style={{gap: '10px'}}>
					<Row style={{gap: '3px'}} className={style.progressData}>
						<span>{progress}</span>
						<span>/</span>
						<span>3</span>
					</Row>
					<CircularProgressbar value={progress} maxValue={3} strokeWidth={15} styles={progressStyles}/>
				</Row>
			</Row>
			<Column className={style.problemContainer} style={{ gap: '8px' }}>
				{
					progress === 0 && (
						<span className={style.empty}>로그인이 필요합니다</span>
					)
				}
				{children}
			</Column>
		</Column>
	)
}

interface QuestProblemProps {
	level: number;
	title: string;
	ratio: number;
	solved?: boolean;
}

const QuestProblem = ({ level, title, ratio, solved }: QuestProblemProps) => {
	return (
		<Row style={{ opacity: solved ? 0.5: 1, justifyContent: 'space-between' }} className={style.problem}>
			<Column style={{ gap: '10px' }}>
				<Row style={{ gap: '10px' }}>
					<span className={style.level} style={{ color: levelToTextColor(level)}}>Lv. {level}</span>
					<span>{title}</span>
				</Row>
				<Row style={{ gap: '10px' }}>
					<span className={style.ratio}>정답률 {ratio}%</span>
				</Row>
			</Column>
			{ solved && <FaCheckCircle color="var(--color-primary)" size={20} /> }
		</Row>
	)
}

DailyQuest.Problem = QuestProblem;

export default DailyQuest;
