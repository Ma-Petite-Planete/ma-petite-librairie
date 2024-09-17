import goldTrophee from "../../ressources/icon/coupe_or.svg";
import silverTrophee from "../../ressources/icon/coupe_argent.svg";
import bronzeTrophee from "../../ressources/icon/coupe_bronze.svg";
import "./MppPodiumStep.css";
import "../../";
import React from "react";

interface MppPodiumStepProps {
  title: String;
  subtitle?: String;
  subtitleBold?: String;
  pointsNumber: number;
  typeOfPlayer: String;
  podiumStepNumber: number;
  color: String;
}

const MppPodiumStep: React.FC<MppPodiumStepProps> = ({
  title,
  subtitle,
  subtitleBold,
  pointsNumber,
  typeOfPlayer,
  podiumStepNumber,
  color
}) => {
  return (
    <div className="podium_step__container">
      <img
        src={goldTrophee}
        alt="icone de coupe"
        className="podium_step__img"
      />
      <ul className="podium_step__list">
        <li className="podium_step__list--title title_h3">{title}</li>

        {subtitle ? (
          <li className="podium_step__list--subtitle text_small">{subtitle}</li>
        ) : null}

        {subtitleBold ? (
          <li className="podium_step__list--subtitle_bold text_small_b">
            {subtitleBold}
          </li>
        ) : null}

        <li className="podium_step__list--typeOfPlayer text_small_b">
          {pointsNumber} par {typeOfPlayer}
        </li>
      </ul>
      <div className="podium_step_number__container">
        <span className="podium_step_number__number text_body_sb" style={{  backgroundColor: `${color}`}}>
          {podiumStepNumber}
        </span>
      </div>
    </div>
  );
};

export default MppPodiumStep;
