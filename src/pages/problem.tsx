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

		</main>
	)
}

export default PageProblem;
