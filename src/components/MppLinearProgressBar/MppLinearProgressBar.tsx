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
  activity_rate
}

export enum ProgressBarStyle {
  red = "red",
  green = "green",
  orange = "orange",
  invisible = "invisible",
  default = "default"
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  maxValue,
  value,
  colorStyle
}) => {
  const getProgressBarPercentage = (maxValue: number, value: number) =>
    Math.round((value / maxValue) * 100);
  const progressBarColor = value === 0 ? 'default' : value === maxValue ? 'green' : colorStyle;

  return (
    <div className={`linear_progress_bar_container ${progressBarColor}`}>
      <div className="linear_progress_bar--background_value">
        <div className="progress_bar background_value--indicator">
          <div
            className="linear_progress_bar--main_value"
            style={{ width: `${getProgressBarPercentage(maxValue, value)}%` }}
          >
            <div className="progress_bar main_value--indicator"></div>
            <p className="main_value--value">{value}</p>
          </div>
        </div>
        <p className="background_value--max_value">{maxValue}</p>
      </div>
    </div>
  );
};

export default LinearProgressBar;
