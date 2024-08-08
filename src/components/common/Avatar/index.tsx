interface AvatarProps {
	src: string;
	alt: string;
	size: number;
	className?: string;
}

const Avatar = ({ src, alt, size, className }: AvatarProps) => {
	return (
		<img src={src} alt={alt} width={`${size}px`} className={className} height={`${size}px`} style={{ borderRadius: '100px'}} />
	);
};

export default Avatar;
