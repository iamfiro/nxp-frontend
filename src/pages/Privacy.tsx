import TemplateHeader from "../template/header.tsx";
import style from '../styles/pages/userDocs.module.scss';

const PrivacyPolicy = () => {
	return (
		<>
			<TemplateHeader />
			<main className={style.container}>
				<h1 className={style.title}>개인정보 처리방침</h1>
				<p className={style.content}>
					이 약관은 NXP(이하 "회사"라 함)가 제공하는 서비스 이용과 관련하여 회사와 회원 및 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
				</p>
			</main>
		</>
	)
};

export default PrivacyPolicy;
