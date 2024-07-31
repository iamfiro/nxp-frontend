import style from './style.module.scss';
import Column from "../Column";

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

export default AuthForm;
