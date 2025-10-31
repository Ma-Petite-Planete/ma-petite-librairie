import './MppPodiumStep.css';
import React from 'react';
import { MppIcons } from '../../../utils/MppIcons';
import MppSkeletonLoader from '../../MppSkeletonLoader/MppSkeletonLoader';
import { BoType } from '../../BoType';
import { DetailRow } from '../../../types_and_demo_data/detailRowRanking';

interface MppPodiumStepProps {
  id?: string;
  title: string | null;
  subtitle?: string;
  subtitleBold?: string;
  bottomCount?: string;
  pointsNumber: string;
  typeOfPlayer: string;
  color: string;
  ranking: number;
  boType: BoType;
  displayAllInfos: boolean;
  details?: DetailRow[];
  isOpen?: boolean;
  onStepClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MppPodiumStep: React.FC<MppPodiumStepProps> = ({
  id,
  title,
  subtitle,
  subtitleBold,
  pointsNumber,
  bottomCount,
  typeOfPlayer,
  color,
  ranking,
  displayAllInfos,
  onStepClick,
  onHover,
  onHoverLeave,
  boType,
  details = [],
  isOpen = false,
}) => {
  const hasDetails = details != null && details.length > 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!hasDetails) return;
    onStepClick?.(e);
  };

  return (
    <div
      className={`podium_step__container ${hasDetails ? 'cursor_pointer' : ''} ${hasDetails && isOpen ? 'podium_open' : ''}`}
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      data-id={id ?? ''}
      data-ranking={ranking}
    >
      <div className={`podium_step__content`}>
        <div className="podium_step__img">
          {ranking === 1 ? (
            <MppIcons.goldTrophee />
          ) : ranking === 2 ? (
            <MppIcons.silverTrophee />
          ) : (
            <MppIcons.bronzeTrophee />
          )}
        </div>

        {title ? (
          <>
            {boType === BoType.scoBO ? (
              <ul className="podium_step__list">
                <li className="podium_step__list--title subtitle_b">{title}</li>

                {subtitle && displayAllInfos && (
                  <li className="podium_step__list--subtitle text_small">
                    {subtitle}
                  </li>
                )}
                {subtitleBold && displayAllInfos && (
                  <li className="podium_step__list--subtitle_bold text_small_b">
                    {subtitleBold}
                  </li>
                )}

                <li
                  style={{ color }}
                  className="podium_step__list--type text_small_b"
                >
                  {pointsNumber}
                  <span className="text_small">{typeOfPlayer}</span>
                </li>
              </ul>
            ) : (
              <ul className="podium_step__list">
                <li className="podium_step__list--title subtitle_b">{title}</li>
                <li className="podium_step__list--subtitle text_small">
                  <span className="text_small_b">{pointsNumber}</span>
                  {subtitle}
                </li>
                <li className="podium_step__list--type text_small">
                  {bottomCount}
                </li>
              </ul>
            )}
          </>
        ) : (
          <MppSkeletonLoader count={2} spaceBetweenRow="5px" />
        )}
      </div>

      <div className="podium_step_number__container">
        <span
          className="podium_step_number__number text_body_sb"
          style={{ backgroundColor: color }}
        >
          {ranking}
        </span>
      </div>
    </div>
  );
};

export default MppPodiumStep;
