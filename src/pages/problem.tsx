import style from '../styles/pages/problem.module.scss';
import React, {useState} from "react";
import ServiceLogo from '../assets/logo.svg';
import {Column, MonacoEditor, Row, setMetaTag} from "../components";
import { FaCode } from "react-icons/fa6";
import TemplateHeader from "../template/header.tsx";

const PageProblem = () => {
	const [code, setCode] = useState<string>(
		'function add(a, b) {'
	);
	const [language, setLanguage] = useState<string>('java');

	setMetaTag({
		title: "두 수 정하기 - NXP",
		description: "두 수를 입력받아 더하는 문제",
	});

	return (
		<main className={style.container}>
			<TemplateHeader />
			<Row className={style.main}>
				<section className={style.left}>
					<h1 className={style.title}>가장 많이 받은 선물</h1>
				</section>
				<section className={style.right}>
					<button className={style.submit}>
						<FaCode/> 코드 제출하기
					</button>
				</section>
			</Row>
		</main>
	)
}

export default PageProblem;
