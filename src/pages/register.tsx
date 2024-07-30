import ServiceLogo from '../../public/logo.svg';
import {AuthForm, Row} from "../components";
import {useState} from "react";
import {IRegister} from "../types/auth.ts";

// TODO: 로고 클릭 구현

const PageRegister = () => {
	const [data, setData] = useState<IRegister>({
		id: '',
		password: '',
		passwordConfirm: '',
		phone: {
			number: ''
		}
	});

	function handleRegister() {
		// TODO: 로그인 구현
		// data.id = 사용자가 입력한 아이디 또는 전화번호
		// data.password = 사용자가 입력한 비밀번호
		// data.phone.number = 사용자가 입력한 전화번호
		// data.passwordConfirm = 사용자가 입력한 비밀번호 확인

		// password와 passwordConfirm이 일치하는지 확인

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
				onChange={(e) => setData({ ...data, id: e.target.value })}
			/>
			<AuthForm.Phone
				placeholder={'전화번호'}
				onChange={(e) => setData({ ...data, phone: { number: e.target.value } })}
				setState={setData}
				state={data}
			/>
			<AuthForm.Input
				placeholder={'비밀번호'}
				password
				onChange={(e) => setData({ ...data, password: e.target.value })}
			/>
			<AuthForm.Input
				placeholder={'비밀번호 확인'}
				password
				onChange={(e) => setData({ ...data, passwordConfirm: e.target.value })}
			/>
			<AuthForm.Submit onClick={() => handleRegister()}>
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
