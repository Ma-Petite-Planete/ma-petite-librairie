import './MppPodiumStep.css';
import React from 'react';
import { MppIcons } from '../../../utils/MppIcons';
import MppSkeletonLoader from '../../MppSkeletonLoader/MppSkeletonLoader';
import { BoType } from '../../BoType';

interface MppPodiumStepProps {
  id?: string;
  title: string;
  subtitle?: string;
  subtitleBold?: string;
  bottomCount?: string;
  pointsNumber: string;
  typeOfPlayer: string;
  color: string;
  ranking: number;
  boType: BoType;
  displayAllInfos: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  onClick,
  onHover,
  onHoverLeave,
  boType,
}) => {
  return (
    <div
      className="podium_step__container"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      data-id={id ?? ''}
    >
      <div
        className={`podium_step__content ${title ? '' : 'loading_background'}`}
      >
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
                  style={{ color: `${color}` }}
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

      <div
        className="podium_step_number__container"
        style={{
          height: `${ranking == 1 ? '4.6em' : ranking == 2 ? '3.4em' : '2.1em'}`,
        }}
      >
        <span
          className="podium_step_number__number text_body_sb"
          style={{ backgroundColor: `${color}` }}
        >
          {ranking}
        </span>
      </div>
    </div>
  );
};

export default MppPodiumStep;
