interface AvatarProps {
	src: string;
	alt: string;
	size: number;
	className?: string;
	onClick?: () => void;
}

const Avatar = ({ src, alt, size, className, onClick }: AvatarProps) => {
	return (
		<img src={src} onClick={onClick} alt={alt} width={`${size}px`} className={className} height={`${size}px`} style={{ borderRadius: '100px'}} />
	);
};

export default Avatar;
