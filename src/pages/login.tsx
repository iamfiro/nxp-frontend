import ServiceLogo from '../../public/logo.svg';
import {AuthForm, LoadingSpinner, Row} from "../components";
import {useState} from "react";
import {request, requestNoAuth} from "../lib/axios.ts";
import {useNavigate} from "react-router-dom";
import useIsLoggined from "../hooks/useIsLoggined.ts";
import useAccessToken from "../hooks/useAccessToken.ts";
import Cookie from "js-cookie";
import {toast} from "react-toastify";

const PageLogin = () => {
	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isPending, setIsPending] = useState<boolean>(false);

	const navigate = useNavigate();
	const { storeUserLogin } = useIsLoggined();
	const { storeToken } = useAccessToken();

	function handleLogin() {
		setIsPending(true);
		if(isPending) return;

		if(id === '' || password === '') toast.error('아이디와 비밀번호를 입력해주세요.');

		requestNoAuth.post('/auth/login', {
			id: id,
			pw: password
		}).then((res) => {
			try {
				storeUserLogin(true);
				// 토큰 저장 Access
				storeToken(res.data.token);

				// Refresh 토큰 저장
				request.post('/auth/refresh').then((res) => {
					Cookie.set('rfToken', res.data.token, { secure: true, sameSite: 'strict', httpsOnly: true });
				});
				// 메인 페이지로 이동
				navigate('/');
			} catch (e) {
				toast.error('로그인 중 오류가 발생했습니다.');
			}
		}).catch((err) => {
			toast.error(`서버 요청증 오류가 발생했습니다 : ${err.response.status}`);
		}).finally(() => {
			setIsPending(false);
		});
	}

	return (
		<AuthForm
			headerComponent={
				<img src={ServiceLogo} width={30} alt={"Service logo"}/>
			}
			footerComponent={
				<Row style={{gap: '25px'}}>
					<a href={'/terms'}>
						이용약관
					</a>
					<a href={'/privacy'}>
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
				{
					isPending ? (
						<LoadingSpinner visible={isPending} />
					) : (
						'로그인'
					)
				}
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
