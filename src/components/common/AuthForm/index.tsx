import style from './style.module.scss';
import Column from "../Column";

const Title = ({ children }: { children: React.ReactNode }) => {
	return (
		<h1 className={style.title}>
			{children}
		</h1>
	)
}

interface AuthInputProps {
	placeholder?: string;
	initialValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	password?: boolean;
}

const Input = ({ placeholder, initialValue, onChange, password }: AuthInputProps) => {
	return (
		<>
			<input
				required
				placeholder={placeholder}
				type={password ? 'password' : 'text'}
				className={style.input}
				defaultValue={initialValue}
				onChange={(e) => onChange && onChange(e)}
			/>
		</>
	)
}

interface AuthSubmitProps {
	onClick?: () => void;
	children: React.ReactNode;
}

const Submit = ({ onClick, children }: AuthSubmitProps) => {
	return (
		<>
			<button
				type={'submit'}
				className={style.submit}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	)

}

interface AuthFormProps {
	headerComponent?: React.ReactNode;
	footerComponent?: React.ReactNode;
	children: React.ReactNode;
}

const AuthForm = ({headerComponent, footerComponent, children }: AuthFormProps) => {
	return (
		<main className={style.wrap}>
			<header className={style.header}>
				{headerComponent}
			</header>
			<section className={style.container}>
				<Column style={{ maxWidth: '350px', width: '100%', padding: '0 20px' }}>
					{children}
				</Column>
			</section>
			<footer className={style.footer}>
				{footerComponent}
			</footer>
		</main>
	)
}

AuthForm.Submit = Submit;
AuthForm.Input = Input;
AuthForm.Title = Title;

export default AuthForm;
