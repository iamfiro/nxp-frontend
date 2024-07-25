import style from './style.module.scss';
import {OptionType} from "../../../types/component.ts";

interface SelectorProps {
    options: OptionType[];
    initialValue?: string;
    onChange: (value: string) => void;
    styles?: React.CSSProperties;
}

const Selector = ({ options, initialValue, onChange, styles }: SelectorProps) => {
    return (
        <select
            value={initialValue}
            onChange={e => onChange(e.target.value)}
            className={style.select}
            style={styles}
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