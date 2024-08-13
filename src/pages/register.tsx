import ServiceLogo from '../../public/logo.svg';
import {AuthForm, Row} from "../components";
import {useEffect, useState} from "react";
import {IRegister} from "../types/auth.ts";
import Turnstile from "react-turnstile";
import {toast} from "react-toastify";
import {requestNoAuth} from "../lib/axios.ts";
import {useNavigate} from "react-router-dom";

// TODO: 로고 클릭 구현

const PageRegister = () => {
	const [data, setData] = useState<IRegister>({
		id: '',
		password: '',
		passwordConfirm: '',
		turnstile: {
			state: 'idle',
			token: undefined
		}
	});
	const navigate = useNavigate();

	useEffect(() => {
		switch (data.turnstile.state) {
			case 'error':
				toast.error('캡차 인증 중 오류가 발생했습니다.');
				break;
			case 'expired':
				toast.error('캡차 인증 시간이 초과되었습니다.\n 브라우저를 새로고침 후 다시 시도해주세요');
				break;
		}
	}, [data.turnstile.state]);

	function handleRegister() {
		// data.id = 사용자가 입력한 아이디 또는 전화번호
		// data.password = 사용자가 입력한 비밀번호
		// data.passwordConfirm = 사용자가 입력한 비밀번호 확인
		if(data.password !== data.passwordConfirm) {
			toast.error('비밀번호가 일치하지 않습니다.');
			return;
		}

		requestNoAuth.post('/auth/register', {
			id: data.id,
			password: data.password,
			// Cloudflare Turnstile 캡챠 추가로, token도 서버에 보내야 함
			token: data.turnstile.token
		}).then(() => {
			alert(`${data.id}님, 회원가입이 완료되었습니다.\n로그인 페이지로 이동됩니다`);
			// 로그인 성공 시, 메인 페이지로 이동
			navigate('/login');
		}).catch((err) => {
			toast.error(err.response.data);
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
			<AuthForm.Title>NXP 가입하기</AuthForm.Title>
			<AuthForm.Input
				placeholder={'아이디'}
				onChange={(e) => setData({...data, id: e.target.value})}
			/>
			<AuthForm.Input
				placeholder={'비밀번호'}
				password
				onChange={(e) => setData({...data, password: e.target.value})}
			/>
			<AuthForm.Input
				placeholder={'비밀번호 확인'}
				password
				onChange={(e) => setData({...data, passwordConfirm: e.target.value})}
			/>
			<Turnstile
				sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
				size={'invisible'}
				onLoad={(_widgetId, bound) => {
					bound.execute();
				}}
				onError={(error) => {
					setData({...data, turnstile: { state: 'error' }}); // State 변경
					toast.error(`Captcha error: ${error}`) // Toast 전송
				}}
				onExpire={() => {
					setData({...data, turnstile: { state: 'expired' }}); // State 변경
					toast.error('Captcha error: expired') // Toast 전송
				}}
				onVerify={(token) => {
					setData({...data, turnstile: { state: 'solved', token }}); // State 변경
				}}
			/>
			<AuthForm.Submit onClick={() => handleRegister()}>
				가입하기
			</AuthForm.Submit>
			<Row style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
				<a href={'/login'} style={{fontSize: '14px', color: 'var(--color-gray-500)'}}>
					로그인
				</a>
				<a href={'/passwordreset'} style={{fontSize: '14px', color: 'var(--color-gray-500)'}}>
					비밀번호를 잊으셨나요?
				</a>
			</Row>
		</AuthForm>
	)
}

export default PageRegister;
