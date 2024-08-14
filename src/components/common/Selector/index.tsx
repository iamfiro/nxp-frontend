import style from './style.module.scss';
import {OptionType} from "../../../types/component.ts";

interface SelectorProps {
    options: OptionType[];
    initialValue?: string;
    onChange: (value: string) => void;
    styles?: React.CSSProperties;
	className?: string;
}

const Selector = ({ options, initialValue, onChange, styles, className }: SelectorProps) => {
    return (
        <select
            value={initialValue}
            onChange={e => onChange(e.target.value)}
            className={`${style.select} ${className}`}
            style={styles}
			defaultValue={initialValue}
        >
            {
                options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}

export default Selector;
