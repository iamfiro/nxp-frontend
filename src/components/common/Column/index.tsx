interface ColumnProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Column = ({ children, className, style }: ColumnProps) => {
    return <div className={className} style={
        {
            display: 'flex',
            flexDirection: 'column',
            ...style
        }
    }>{children}</div>;
}

export default Column;