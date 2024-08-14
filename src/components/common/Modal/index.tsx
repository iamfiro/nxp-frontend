import style from './style.module.scss';

interface IModalBackdrop {
	isVisible: boolean;
	children: React.ReactNode;
}

const Backdrop = ({isVisible, children}: IModalBackdrop) => {
	return isVisible ? (
		<div className={style.backdrop}>
			{children}
		</div>
	) : null;
}

interface IModal {
	children: React.ReactNode;
}

const Modal = ({children}: IModal) => {
	return (
		<div className={style.modal}>
			{children}
		</div>
	)
}

Modal.Backdrop = Backdrop;

export default Modal;
