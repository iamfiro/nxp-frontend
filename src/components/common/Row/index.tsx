interface RowProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
	onClick?: () => void;
}

const Row = ({ children, className, style, onClick }: RowProps) => {
    return <div className={className} onClick={onClick} style={
        {
            display: 'flex',
            flexDirection: 'row',
			alignItems: 'center',
            ...style
        }
    }>{children}</div>;
}

export default Row;
