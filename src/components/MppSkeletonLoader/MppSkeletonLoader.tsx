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

const MppSkeletonLoader: React.FC<MppSkeletonLoaderProps> = ({
  backgroundColor = 'var(--medium_grey)',
  highlightColor = 'var(--light_grey)',
  count = 1,
  circular = false,
  spaceBetweenRow = '10px',
  heightRow = '16px',
}) => {
  const rows = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="skeleton_wrapper">
      {rows.map((_, idx) => (
        <div
          key={idx}
          className={`skeleton ${circular ? 'skeleton_circular' : ''}`}
          style={{
            background: `linear-gradient(90deg, ${backgroundColor} 25%, ${highlightColor} 50%, ${backgroundColor} 80%)`,
            backgroundSize: '400% 100%',
            marginBottom: spaceBetweenRow,
            height: heightRow,
          }}
        />
      ))}
    </div>
  );
};

export default MppSkeletonLoader;
