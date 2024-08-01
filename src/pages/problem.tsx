import style from '../styles/pages/problem.module.scss';
import React, {useState} from "react";
import ServiceLogo from '../assets/logo.svg';
import {Column, MonacoEditor, Row, setMetaTag} from "../components";
import { SiDocsdotrs } from "react-icons/si";
import { FaCirclePlay } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import LangGo from '../../public/icon/lang/go.svg';

interface TabProps {
	children: React.ReactNode;
	tabState: string;
	setTabState: (name: string) => void;
	name: string;
}

const Tab = ({ children, tabState, setTabState, name }: TabProps) => {
	return (
		<div className={style.tab} data-selected={tabState === name} onClick={() => setTabState(name)}>
			{children}
		</div>
	)
}

interface TabContentProps {
	children: React.ReactNode;
	tabState: string;
	name: string;
}

const TabContent = ({ children, tabState, name }: TabContentProps) => {
	return (
		<section style={{ display: tabState === name ? 'flex' : 'none', borderRadius: name !== 'problem' ? 'var(--radius-ss)' : '0 var(--radius-ss) var(--radius-ss) var(--radius-ss)' }} className={style.tabContent}>
			{children}
		</section>
	)
}

const PageProblem = () => {
	const [code, setCode] = useState<string>(
		'function add(a, b) {'
	);
	const [language, setLanguage] = useState<string>('java');
	const [tab, setTab] = useState<string>('problem');

	setMetaTag({
		title: "두 수 정하기 - NXP",
		description: "두 수를 입력받아 더하는 문제",
	})

	return (
		<main className={style.container}>
			<header className={style.header}>
				<Row style={{ gap: '10px' }}>
					<img src={ServiceLogo} alt={'Logo'} className={style.logo}/>
					<h1 className={style.title}>두 수 정하기</h1>
					<span className={style.correctPercentage}>정답률 32%</span>
				</Row>
				<Row style={{ gap: '20px' }}>
					<select className={style.selectLanguage} value={language}
							onChange={(e) => setLanguage(e.target.value)}>
						<option value={'c'}>C</option>
						<option value={'cpp'}>C++</option>
						<option value={'java'}>Java</option>
						<option value={'go'}>GoLang</option>
					</select>
					<button className={style.submit}><MdCloudUpload size={20}/> 코드 제출하기</button>
				</Row>
			</header>
			<section className={style.main}>
				<div className={style.info}>
					<Row className={style.infoHeader}>
						<Tab tabState={tab} setTabState={setTab} name={'problem'}>
							<SiDocsdotrs />
							문제
						</Tab>
						<Tab tabState={tab} setTabState={setTab} name={'submission'}>
							<FaCirclePlay />
							채점 내역
						</Tab>
					</Row>
					<TabContent tabState={tab} name={'problem'}>
						<h1>문제 제목</h1>
						<p>문제 내용</p>
					</TabContent>
					<TabContent tabState={tab} name={'submission'}>
						<h1>채점 내역</h1>
						<p>문제 내용</p>
					</TabContent>
				</div>
				<Column style={{ width: '50%' }}>
					<div className={style.codeHeader}>
						<Row style={{ gap: '10px' }} className={style.codeTab}>
							<img src={LangGo} height={12} alt={language}/>
							<span>solution.{language}</span>
						</Row>
					</div>
					<MonacoEditor code={code} setCode={setCode} language={language}/>
				</Column>
			</section>
		</main>
	)
}

export default PageProblem;
