import {AuthForm, Row} from "../components";
import ServiceLogo from "../../public/logo.svg";
import {useState} from "react";
import {toast} from "react-toastify";

const PagePasswordRecoveryRequest = () => {
	const [email, setEmail] = useState<string>('');

	const handleRequest = () => {
		toast.success('안내 메일을 발송했습니다');

		// TODO: 비밀번호 변경 요청 요청
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
			<AuthForm.Title>비밀번호 찾기</AuthForm.Title>
			<AuthForm.Input
				placeholder={'이메일'}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<AuthForm.Submit onClick={() => handleRequest()}>
				비밀번호 찾기
			</AuthForm.Submit>
			<span style={{color: 'var(--color-gray-400)', fontSize: 14, marginTop: '10px'}}>입력하신 이메일로 안내 메일을 보내드립니다</span>
		</AuthForm>
	)
}

export default PagePasswordRecoveryRequest;
