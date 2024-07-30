import ServiceLogo from '../../public/logo.svg';
import {AuthForm, Row} from "../components";
import {useState} from "react";

// TODO: 로고 클릭 구현

const PageRegister = () => {
	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
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
			<AuthForm.Title>NXP 가입하기</AuthForm.Title>
			<AuthForm.Input
				placeholder={'아이디'}
				onChange={(e) => setId(e.target.value)}
			/>
			<AuthForm.Phone
				placeholder={'전화번호'}
				onChange={(e) => setPhone(e.target.value)}
				setState={setPhone}
				state={phone}
			/>
			<AuthForm.Input
				placeholder={'비밀번호'}
				password
				onChange={(e) => setPassword(e.target.value)}
			/>
			<AuthForm.Input
				placeholder={'비밀번호 확인'}
				password
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			<AuthForm.Submit onClick={() => handleLogin()}>
				가입하기
			</AuthForm.Submit>
			<Row style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
				<a href={'/login'} style={{ fontSize: '14px', color: 'var(--color-gray-500)'}}>
					로그인
				</a>
				<a href={'/passwordreset'} style={{ fontSize: '14px', color: 'var(--color-gray-500)'}}>
					비밀번호를 잊으셨나요?
				</a>
			</Row>
		</AuthForm>
	)
}

export default PageRegister;
