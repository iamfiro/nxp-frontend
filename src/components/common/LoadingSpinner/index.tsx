import {Oval} from "react-loader-spinner";

interface LoadingSpinnerProps {
	visible: boolean;
	width?: number;
	height?: number;
	strokeWidth?: number;
	strokeColor?: string;
}

const LoadingSpinner = ({ visible, width = 20, height = 20, strokeWidth = 4, strokeColor = '#fff' }: LoadingSpinnerProps) => {
	return (
		<Oval color={strokeColor} width={width} height={height} visible={visible} secondaryColor={'transparent'} strokeWidth={strokeWidth}/>
	)
}

export default LoadingSpinner;
