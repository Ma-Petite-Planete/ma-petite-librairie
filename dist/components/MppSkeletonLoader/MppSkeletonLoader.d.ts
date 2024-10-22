import React from 'react';
import './mpp_skeleton_loader.css';
interface MppSkeletonLoaderProps {
    backgroundColor?: string;
    highlightColor?: string;
    count?: number;
    circular?: boolean;
    spaceBetweenRow?: string;
    heightRow?: string;
}
declare const MppSkeletonLoader: React.FC<MppSkeletonLoaderProps>;
export default MppSkeletonLoader;
