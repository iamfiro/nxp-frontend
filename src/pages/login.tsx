import ServiceLogo from '../../public/logo.svg';
import {AuthForm, Row} from "../components";
import {useState} from "react";

// TODO: 로고 클릭 구현

const PageLogin = () => {
	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	function handleLogin() {
		// TODO: 로그인 구현
		// id = 사용자가 입력한 아이디 또는 전화번호
		// password = 사용자가 입력한 비밀번호
		// 로그인 성공 시, 메인 페이지로 이동
		// 서버 통신은 Axios 라이브러리를 사용
	}

	return (
		<AuthForm
			headerComponent={
				<img src={ServiceLogo} width={30} alt={"Service logo"}/>
			}
			footerComponent={
				<Row style={{gap: '25px'}}>
					<a href={'/'}> {/* TODO: 라우트 변경 */}
						이용약관
					</a>
					<a href={'/'}> {/* TODO: 라우트 변경 */}
						개인정보처리방침
					</a>
				</Row>
			}
		>
			<AuthForm.Title>NXP 로그인</AuthForm.Title>
			<AuthForm.Input
				placeholder={'아이디 또는 전화번호'}
				onChange={(e) => setId(e.target.value)}
			/>
			<AuthForm.Input
				placeholder={'비밀번호'}
				password
				onChange={(e) => setPassword(e.target.value)}
			/>
			<AuthForm.Submit onClick={() => handleLogin()}>
				로그인
			</AuthForm.Submit>
		</AuthForm>
	)
}

export default PageLogin;
