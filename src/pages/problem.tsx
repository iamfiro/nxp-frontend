import style from '../styles/pages/problem.module.scss';
import React, {useState} from "react";
import {Column, Row, setMetaTag} from "../components";
import { FaCode } from "react-icons/fa6";
import TemplateHeader from "../template/header.tsx";
import { MdOutlineTimelapse } from "react-icons/md";
import { FaMemory } from "react-icons/fa6";

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
				<Column className={style.right}>
					<button className={style.submit}>
						<FaCode size={18}/> 코드 제출하기
					</button>
					<Row style={{gap: '10px', marginTop: '15px'}}>
						<section className={style.problemLimit}>
							<Row className={style.limitTitle}>
								<MdOutlineTimelapse/>
								<span>시간 제한</span>
							</Row>
							<span className={style.limitValue}>1초</span>
						</section>
						<section className={style.problemLimit}>
							<Row className={style.limitTitle}>
								<FaMemory/>
								<span>메모리 제한</span>
							</Row>
							<span className={style.limitValue}>128 MB</span>
						</section>
					</Row>
				</Column>
			</Row>
		</main>
	)
}

export default PageProblem;
