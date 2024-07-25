interface RowProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Row = ({ children, className, style }: RowProps) => {
    return <div className={className} style={
        {
            display: 'flex',
            flexDirection: 'row',
            ...style
        }
    }>{children}</div>;
}

export default Row;