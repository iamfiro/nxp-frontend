import ServiceLogo from '../../public/logo.svg';
import {AuthForm, Row} from "../components";
import {useState} from "react";
import {requestNoAuth} from "../lib/axios.ts";
import {useNavigate} from "react-router-dom";
import useIsLoggined from "../hooks/useIsLoggined.ts";
import useAccessToken from "../hooks/useAccessToken.ts";
import Cookie from "js-cookie";
import {toast} from "react-toastify";

const PageLogin = () => {
	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const navigate = useNavigate();
	const { storeUserLogin } = useIsLoggined();
	const { storeToken } = useAccessToken();

	function handleLogin() {
		requestNoAuth.post('/auth/login', {
			id: id,
			password: password
		}).then((res) => {
			// 로그인 상태 저장
			storeUserLogin(true);
			// 토큰 저장
			storeToken(res.data.token);
			Cookie.set('token', res.data.token, { secure: true, sameSite: 'strict', httpsOnly: true });
			// 메인 페이지로 이동
			navigate('/');
		}).catch((err) => {
			toast.error(`서버 요청증 오류가 발생했습니다 : ${err.response.status}`);
		});
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
			<Row style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
				<a href={'/register'} style={{ fontSize: '14px', color: 'var(--color-gray-500)'}}>
					회원가입
				</a>
				<a href={'/passwordreset'} style={{ fontSize: '14px', color: 'var(--color-gray-500)'}}>
					비밀번호를 잊으셨나요?
				</a>
			</Row>
		</AuthForm>
	)
}

export default PageLogin;
