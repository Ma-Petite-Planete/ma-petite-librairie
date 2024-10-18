import './MppPodiumStep.css';
import React from 'react';
import { MppIcons } from '../../../utils/MppIcons';

interface MppPodiumStepProps {
  title: string;
  subtitle?: string;
  subtitleBold?: string;
  pointsNumber: number;
  typeOfPlayer: string;
  color: string;
  ranking: number;
  display_all_infos: boolean;
}

const MppPodiumStep: React.FC<MppPodiumStepProps> = ({
  title,
  subtitle,
  subtitleBold,
  pointsNumber,
  typeOfPlayer,
  color,
  ranking,
  display_all_infos
}) => {
  return (
    <div className="podium_step__container">
      <div className="podium_step__content">
        <div className="podium_step__img">
          {ranking === 1 ? (
            <MppIcons.goldTrophee />
          ) : ranking === 2 ? (
            <MppIcons.silverTrophee />
          ) : (
            <MppIcons.bronzeTrophee />
          )}
        </div>
        <ul className="podium_step__list">
          <li className="podium_step__list--title title_h3">{title}</li>

          {subtitle && display_all_infos ? (
            <li className="podium_step__list--subtitle text_small">
              {subtitle}
            </li>
          ) : null}

          {subtitleBold && display_all_infos ? (
            <li className="podium_step__list--subtitle_bold text_small_b">
              {subtitleBold}
            </li>
          ) : null}

          <li
            style={{ color: `${color}` }}
            className="podium_step__list--type text_small_b"
          >
            {pointsNumber} pts
            <span className="text_small">/{typeOfPlayer}</span>
          </li>
        </ul>
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
