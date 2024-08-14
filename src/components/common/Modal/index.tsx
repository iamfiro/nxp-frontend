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

const Modal = () => {
	return <h1>모달 컴포넌트</h1>
}

Modal.Backdrop = Backdrop;

export default Modal;
