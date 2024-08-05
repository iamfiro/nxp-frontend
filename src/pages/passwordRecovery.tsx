import {AuthForm, Row} from "../components";
import ServiceLogo from "../../public/logo.svg";
import {useState} from "react";
import {toast} from "react-toastify";

const PagePasswordRecovery = () => {
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	// TODO: 토큰 유효성 검사

	const handleRequest = () => {
		if(password !== confirmPassword) return toast.error('비밀번호가 일치하지 않습니다');
		if(password.length < 8) return toast.error('비밀번호는 8자 이상이어야 합니다');
		toast.success('비밀번호가 변경되었습니다');

		// TODO: 비밀번호 변경 요청
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
			<AuthForm.Title>비밀번호 변경</AuthForm.Title>
			<AuthForm.Input
				placeholder={'비밀번호'}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<AuthForm.Input
				placeholder={'비밀번호 변경'}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<AuthForm.Submit onClick={() => handleRequest()}>
				비밀번호 변경
			</AuthForm.Submit>
			<span style={{color: 'var(--color-gray-400)', fontSize: 14, marginTop: '10px'}}>비밀번호 8자 이상</span>
		</AuthForm>
	)
}

export default PagePasswordRecovery;
