import style from './style.module.scss';

interface IModalBackdrop {
	isVisible: boolean;
	handleClose: () => void;
	children: React.ReactNode;
}

const Backdrop = ({isVisible, children, handleClose}: IModalBackdrop) => {
	return isVisible ? (
		<div className={style.backdrop} onClick={() => handleClose()}>
			{children}
		</div>
	) : null;
}

interface IModal {
	children: React.ReactNode;
	className?: string;
}

const Modal = ({children, className}: IModal) => {
	return (
		<div className={`${style.modal} ${className}`} onClick={(e) => e.stopPropagation()}>
			{children}
		</div>
	)
}

Modal.Backdrop = Backdrop;

export default Modal;
