import style from './style.module.scss';
import {ButtonSize, ButtonType} from "../../../types/component.ts";

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void;
    size: ButtonSize;
    type: ButtonType
	classname?: string;
}

const Button = ({ children, onClick, size, type, classname}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${style.button} ${classname}`}
            data-btn-size={size}
            data-btn-type={type}
        >{children}</button>
    )
}

export default Button;
