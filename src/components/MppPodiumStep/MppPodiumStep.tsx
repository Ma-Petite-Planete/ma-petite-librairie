import goldTrophee from "../../ressources/icon/coupe_or.svg";
import silverTrophee from "../../ressources/icon/coupe_argent.svg";
import bronzeTrophee from "../../ressources/icon/coupe_bronze.svg";
import "./MppPodiumStep.css";
import "../../";
import React, { useState, useEffect } from 'react';

interface MppPodiumStepProps {
  title: String;
  subtitle?: String;
  subtitleBold?: String;
  pointsNumber: number;
  typeOfPlayer: String;
  color: String;
  ranking: number;
}

const MppPodiumStep: React.FC<MppPodiumStepProps> = ({
  title,
  subtitle,
  subtitleBold,
  pointsNumber,
  typeOfPlayer,
  color,
  ranking
}) => {

  const [tropheeDislayed, setTrophee] = useState(goldTrophee);

  useEffect(() => {

  }, []);

  // const chooseTropheeDisplayed = (ranking) => {

  // };

  return (
    <div className="podium_step__container">

      <img
        src={ ranking == 1 ? goldTrophee : ranking == 2 ? silverTrophee : bronzeTrophee}
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

        <li className="podium_step__list--type text_small_b">
          {pointsNumber} pts /{typeOfPlayer}
        </li>
      </ul>

      <div className="podium_step_number__container" style={{ height: `${ranking == 1 ? "4.6em" : ranking == 2 ? "3.4em" : "2.1em"}`}}>
        <span className="podium_step_number__number text_body_sb" style={{  backgroundColor: `${color}`}}>
          {ranking}
        </span>
      </div>

    </div>
  );
};

export default MppPodiumStep;
