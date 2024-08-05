import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/NoMatch.module.scss';
const PageNoMatch = () => {
	return (
		<>
			<TemplateHeader/>
			<main className={style.container}>
				<h1>404 Not Found</h1>
				<p>요청하신 페이지를 찾을 수 없습니다.</p>
			</main>
		</>
	);
}

export default PageNoMatch;
