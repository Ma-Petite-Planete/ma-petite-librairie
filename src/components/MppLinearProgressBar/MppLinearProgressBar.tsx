import React from 'react';
import './mpp_linear_progress_bar.css';
interface LinearProgressBarProps {
  maxValue: number;
  value: number;
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  maxValue,
  value,
}) => {
  // default
  // red
  // orange
  // green

  return (
    <div className="linear_progress_bar_container red">
      <div className="linear_progress_bar--background_value">
        <div className="progress_bar background_value--indicator">
          {/* <div className="linear_progress_bar--main_value">
            <div className="progress_bar main_value--indicator"></div>
            <p className="main_value--value">{value}</p>
          </div> */}
        </div>
        <p className="background_value--max_value">{maxValue}</p>
      </div>
    </div>
  );
};

export default LinearProgressBar;
