interface ColumnProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
	onClick?: () => void;
}

const Column = ({ children, className, style, onClick }: ColumnProps) => {
    return <div className={className} onClick={onClick} style={
        {
            display: 'flex',
            flexDirection: 'column',
            ...style
        }
    }>{children}</div>;
}

export default Column;
