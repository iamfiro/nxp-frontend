import style from './style.module.scss';
import Column from "../Column";
import Row from "../Row";
import { sanitizeNumericInput } from "../../../lib/validate.ts";
import { Dispatch, SetStateAction } from "react";
import { PhoneRegex } from "../../../lib/regex.ts";
import { IRegister } from "../../../types/auth.ts";
import { TailSpin } from "react-loader-spinner";

/**
 * 제목 컴포넌트.
 *
 * @param children - 제목으로 표시할 내용.
 */
const Title = ({ children }: { children: React.ReactNode }) => (
	<h1 className={style.title}>{children}</h1>
);

interface AuthInputProps {
	placeholder?: string;
	initialValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	password?: boolean;
}

/**
 * 인증 입력 컴포넌트.
 *
 * @param placeholder - 입력 필드의 플레이스홀더 텍스트.
 * @param initialValue - 입력 필드의 초기값.
 * @param onChange - 변경 이벤트를 처리할 함수.
 * @param password - 입력 필드가 비밀번호 필드인지 여부를 결정하는 플래그.
 */
const Input = ({ placeholder, initialValue, onChange, password }: AuthInputProps) => (
	<input
		required
		placeholder={placeholder}
		type={password ? 'password' : 'text'}
		className={style.input}
		defaultValue={initialValue}
		onChange={onChange}
	/>
);

interface AuthPhoneProps extends AuthInputProps {
	state: IRegister;
	setState: Dispatch<SetStateAction<IRegister>>;
}

/**
 * 전화번호 입력 컴포넌트.
 *
 * @param placeholder - 입력 필드의 플레이스홀더 텍스트.
 * @param initialValue - 입력 필드의 초기값.
 * @param setState - 상태를 업데이트하는 함수.
 * @param state - 현재 상태.
 */
const Phone = ({ placeholder, initialValue, setState, state }: AuthPhoneProps) => {
	/**
	 * 입력 요소의 변경 이벤트를 처리하여 숫자 값만 허용합니다.
	 *
	 * @param e - 입력 요소에 의해 트리거된 변경 이벤트.
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const numbersOnly = sanitizeNumericInput(e.target.value);

			if (numbersOnly.length <= 11) {
				setState(prevState => ({ ...prevState, phone: { ...prevState.phone, number: numbersOnly } }));
			}
		} catch (error) {
			console.error("입력 변경 처리 중 오류 발생:", error);
		}
	};

	return (
		<Row style={{ gap: '10px' }}>
			<input
				required
				placeholder={placeholder}
				type={'text'}
				className={style.input}
				defaultValue={initialValue}
				value={state.phone.number}
				onChange={(e) => {
					e.target.value = sanitizeNumericInput(e.target.value);
					handleChange(e);
				}}
			/>
			<button
				className={style.phoneRequest}
				disabled={!PhoneRegex.test(state.phone.number || '')}
				onClick={() => setState(prevState => ({ ...prevState, phone: { ...prevState.phone, isPending: true } }))}
			>
				{state.phone.isPending ? (
					<TailSpin color={'#fff'} strokeWidth={5} height={20} width={20} />
				) : (
					<span>인증번호 전송</span>
				)}
			</button>
		</Row>
	);
};

interface AuthSubmitProps {
	onClick?: () => void;
	children: React.ReactNode;
}

/**
 * 제출 버튼 컴포넌트.
 *
 * @param onClick - 클릭 이벤트를 처리할 함수.
 * @param children - 버튼 내부에 표시할 내용.
 */
const Submit = ({ onClick, children }: AuthSubmitProps) => (
	<button type={'submit'} className={style.submit} onClick={onClick}>
		{children}
	</button>
);

interface AuthFormProps {
	headerComponent?: React.ReactNode;
	footerComponent?: React.ReactNode;
	children: React.ReactNode;
}

/**
 * 인증 폼 컴포넌트.
 *
 * @param headerComponent - 헤더에 표시할 컴포넌트.
 * @param footerComponent - 푸터에 표시할 컴포넌트.
 * @param children - 폼의 콘텐츠.
 */
const AuthForm = ({ headerComponent, footerComponent, children }: AuthFormProps) => (
	<main className={style.wrap}>
		<header className={style.header}>{headerComponent}</header>
		<section className={style.container}>
			<Column style={{ maxWidth: '350px', width: '100%', padding: '0 20px' }}>
				{children}
			</Column>
		</section>
		<footer className={style.footer}>{footerComponent}</footer>
	</main>
);

AuthForm.Submit = Submit;
AuthForm.Input = Input;
AuthForm.Title = Title;
AuthForm.Phone = Phone;

export default AuthForm;
