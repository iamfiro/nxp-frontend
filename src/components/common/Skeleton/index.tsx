import React, {CSSProperties} from 'react';
import styles from './style.module.scss';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
	skeletonStyle?: CSSProperties
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, skeletonStyle }) => {
    const style = {
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '4px',
		...skeletonStyle
    };

    return <div className={styles.skeleton} style={style}></div>;
};

export default Skeleton;
