import style from './style.module.scss';
import Column from "../Column";
import Row from "../Row";
import {sanitizeNumericInput} from "../../../lib/validate.ts";
import {Dispatch, SetStateAction} from "react";
import {PhoneRegex} from "../../../lib/regex.ts";
import {IRegister} from "../../../types/auth.ts";
import {TailSpin} from "react-loader-spinner";

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

interface AuthPhoneProps extends AuthInputProps {
	state: IRegister;
	setState: Dispatch<SetStateAction<IRegister>>;
}

const Phone = ({ placeholder, initialValue, setState, state }: AuthPhoneProps) => {
	/**
	 * Handles change events for an input element, ensuring only numeric values are allowed.
	 *
	 * @param e - The change event triggered by the input element.
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const numbersOnly = sanitizeNumericInput(e.target.value);

			if (numbersOnly.length <= 11) {
				setState({ ...state, phone: { number: numbersOnly } });
			}
		} catch (error) {
			console.error("Error processing input change:", error);
		}
	};

	return (
		<>
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
				<button className={style.phoneRequest} disabled={!PhoneRegex.test(state.phone.number || '')} onClick={() => {
					setState({ ...state, phone: { ...state.phone, isPending: true } });
				}}>
					{
						state.phone.isPending ? (
							<TailSpin
								color={'#fff'}
								strokeWidth={5}
								height={20}
								width={20}
							/>
						) : (
							<span>인증번호 전송</span>
						)
					}
				</button>
			</Row>
		</>
	);
}

interface AuthSubmitProps {
	onClick?: () => void;
	children: React.ReactNode;
}

const Submit = ({onClick, children}: AuthSubmitProps) => {
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
AuthForm.Phone = Phone;

export default AuthForm;
