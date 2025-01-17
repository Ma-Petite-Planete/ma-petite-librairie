import React from 'react';
import './mpp_loader_dots.css';

/**
 * Le composant MppLoaderDots rend une animation de chargement avec des points élastiques.
 *
 * @component
 *
 * @returns {JSX.Element} Le composant MppLoaderDots rendu.
 *
 * @example
 * <MppLoaderDots />
 */

const MppLoaderDots: React.FC = () => {
  return (
    <div className="snippet" data-title="dot-elastic">
      <div className="stage">
        <div className="dot-elastic"></div>
      </div>
    </div>
  );
};

export default MppLoaderDots;
