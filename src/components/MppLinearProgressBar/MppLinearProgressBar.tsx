import React from 'react';
import './mpp_linear_progress_bar.css';
interface BaseProps {
  value: number;
  useValueAsProgressBarWidth?: boolean;
}

type PropsWithDefault = {
  displayValueAsDefault: true;
  conditionForGreen?: null;
  conditionForRed?: null;
  maxValue?: null;
};

type PropsWithConditions = {
  displayValueAsDefault?: false;
  conditionForGreen: boolean;
  conditionForRed: boolean;
  maxValue: number;
};

export type LinearProgressBarProps = BaseProps &
  (PropsWithDefault | PropsWithConditions);

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
  default = 'default',
}

/**
 * Le composant LinearProgressBar rend une barre de progression linéaire personnalisable avec un style de couleur.
 *
 * @component
 * @param {LinearProgressBarProps} props - Les propriétés du composant LinearProgressBar.
 * @param {number} props.maxValue - La valeur maximale de la barre de progression.
 * @param {number} props.value - La valeur actuelle de la barre de progression.
 *
 * @returns {JSX.Element} Le composant LinearProgressBar rendu.
 *
 * @example
 * <LinearProgressBar
 *   maxValue={100}
 *   value={50}
 * />
 */

export const MppLinearProgressBar: React.FC<LinearProgressBarProps> = ({
  maxValue,
  value,
  conditionForGreen,
  conditionForRed,
  useValueAsProgressBarWidth = false,
  displayValueAsDefault,
}) => {
  const progressBarPercentage = (() => {
    if (displayValueAsDefault || value === 0) return 51;
    if (useValueAsProgressBarWidth) return value;
    return maxValue ? Math.round((value / maxValue) * 100) : 0;
  })();

  const colorToDisplay = (): ProgressBarStyle => {
    if (value === 0 || displayValueAsDefault) {
      return ProgressBarStyle.default;
    } else if (conditionForGreen) {
      return ProgressBarStyle.green;
    } else if (conditionForRed) {
      return ProgressBarStyle.red;
    } else {
      return ProgressBarStyle.orange;
    }
  };

  return (
    <>
      <div className={`linear_progress_bar_container ${colorToDisplay()}`}>
        <div className="linear_progress_bar--background_value">
          <div className="progress_bar background_value--indicator">
            <div
              className="linear_progress_bar--main_value"
              style={{
                width: `${progressBarPercentage}%`,
              }}
            >
              <div className="progress_bar main_value--indicator"></div>
              <p className="main_value--value">{Math.round(value)}</p>
            </div>
          </div>
        </div>
        {!displayValueAsDefault && (
          <p
            className={`background_value--max_value ${progressBarPercentage >= 100 ? 'hide' : 'end_line_number'}`}
          >
            {maxValue}
          </p>
        )}
      </div>
    </>
  );
};
