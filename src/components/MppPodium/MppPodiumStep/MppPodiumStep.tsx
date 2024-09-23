import goldTrophee from '../../../ressources/icons/coupe_or.svg';
import silverTrophee from '../../../ressources/icons/coupe_argent.svg';
import bronzeTrophee from '../../../ressources/icons/coupe_bronze.svg';
import './MppPodiumStep.css';
import React from 'react';

interface MppPodiumStepProps {
  title: string;
  subtitle?: string;
  subtitleBold?: string;
  pointsNumber: number;
  typeOfPlayer: string;
  color: string;
  ranking: number;
}

const MppPodiumStep: React.FC<MppPodiumStepProps> = ({
  title,
  subtitle,
  subtitleBold,
  pointsNumber,
  typeOfPlayer,
  color,
  ranking,
}) => {
  return (
    <div className="podium_step__container">
      <div className="podium_step__content">
        <img
          src={
            ranking == 1
              ? goldTrophee
              : ranking == 2
                ? silverTrophee
                : bronzeTrophee
          }
          alt="icone de coupe"
          className="podium_step__img"
        />
        <ul className="podium_step__list">
          <li className="podium_step__list--title title_h3">{title}</li>

          {subtitle ? (
            <li className="podium_step__list--subtitle text_small">
              {subtitle}
            </li>
          ) : null}

          {subtitleBold ? (
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
