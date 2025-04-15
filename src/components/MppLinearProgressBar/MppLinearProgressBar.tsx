import React from 'react';
import './mpp_linear_progress_bar.css';
interface LinearProgressBarProps {
  maxValue: number;
  value: number;
  colorStyle: ProgressBarStyle;
}

export enum ColumnType {
  league_created_vs_previsions,
  leagyues_with_more_then_4_players,
  players_registered,
  activity_rate,
}

export enum ProgressBarStyle {
  red = 'red',
  green = 'green',
  orange = 'orange',
  invisible = 'invisible',
  darkBlue = 'dark_blue',
  default = 'default',
}

/**
 * Le composant LinearProgressBar rend une barre de progression linéaire personnalisable avec un style de couleur.
 *
 * @component
 * @param {LinearProgressBarProps} props - Les propriétés du composant LinearProgressBar.
 * @param {number} props.maxValue - La valeur maximale de la barre de progression.
 * @param {number} props.value - La valeur actuelle de la barre de progression.
 * @param {ProgressBarStyle} props.colorStyle - Le style de couleur de la barre de progression.
 *
 * @returns {JSX.Element} Le composant LinearProgressBar rendu.
 *
 * @example
 * <LinearProgressBar
 *   maxValue={100}
 *   value={50}
 *   colorStyle={ProgressBarStyle.green}
 * />
 */

export const MppLinearProgressBar: React.FC<LinearProgressBarProps> = ({
  maxValue,
  value,
  colorStyle,
}) => {
  const finishPercentage = Math.round((value / maxValue) * 100);

  return (
    <div className={`linear_progress_bar_container ${colorStyle}`}>
      <div className="linear_progress_bar--background_value">
        <div className="progress_bar background_value--indicator">
          <div
            className="linear_progress_bar--main_value"
            style={{ width: `${finishPercentage}%` }}
          >
            <div className="progress_bar main_value--indicator"></div>
            <p className="main_value--value">{Math.round(value)}</p>
          </div>
        </div>
      </div>
      <p
        className={`background_value--max_value ${finishPercentage > 80 ? 'end_line_number' : ''}`}
      >
        {maxValue}
      </p>
    </div>
  );
};
