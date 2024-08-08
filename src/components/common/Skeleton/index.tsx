import React from 'react';
import styles from './style.module.scss';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius }) => {
    const style = {
        width: width || '100%',
        height: height || '20px',
        borderRadius: borderRadius || '4px',
    };

    return <div className={styles.skeleton} style={style}></div>;
};

export default Skeleton;
