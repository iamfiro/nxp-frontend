import style from '../styles/pages/problem.module.scss';
import {useState} from "react";
import ServiceLogo from '../assets/logo.svg';
import {Column, MonacoEditor, Row} from "../components";
import { SiDocsdotrs } from "react-icons/si";
import { FaCirclePlay } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";

const PageProblem = () => {
	const [code, setCode] = useState<string>(
		'function add(a, b) {'
	);
	const [language, setLanguage] = useState<string>('java');

	return (
		<main className={style.container}>
			<header className={style.header}>
				<Row style={{ gap: '10px' }}>
					<img src={ServiceLogo} alt={'Logo'} className={style.logo}/>
					<h1 className={style.title}>두 수 정하기</h1>
					<span className={style.correctPercentage}>정답률 32%</span>
				</Row>
				<button className={style.submit}><MdCloudUpload size={20}/> 코드 제출하기</button>
			</header>
			<section className={style.main}>
				<div className={style.info}>
					<Row className={style.infoHeader}>
						<div className={style.infoTab} data-selected={true}>
							<SiDocsdotrs />
							문제
						</div>
						<div className={style.infoTab} data-selected={false}>
							<FaCirclePlay />
							채점 내역
						</div>
					</Row>
					<div className={style.infoContent}>
						<h1>문제 제목</h1>
						<p>문제 내용</p>
					</div>
				</div>
				<Column style={{ width: '50%' }}>
					<div className={style.codeHeader}>
						<span>
							solution.{language}
						</span>
						<select className={style.selectLanguage} value={language} onChange={(e) => setLanguage(e.target.value)}>
							<option value={'c'}>C</option>
							<option value={'cpp'}>C++</option>
							<option value={'java'}>Java</option>
							<option value={'go'}><img src={'/icon/lang/GoLang.svg'} />GoLang</option>
						</select>
					</div>
					<MonacoEditor code={code} setCode={setCode} language={language}/>
				</Column>
			</section>
		</main>
	)
}

export default PageProblem;
