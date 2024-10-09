import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import './mpp_infos_pin.css';

export enum Direction {
  top_right,
  top_left,
  bottom_left,
  bottom_right,
}
interface MppInfosPinProps {
  texts: Array<object>;
  direction: Direction;
}

const MppInfosPin: React.FC<MppInfosPinProps> = ({
  texts,
  direction = Direction.bottom_left,
}) => {
  let directionStyleValues: React.CSSProperties;
  switch (direction) {
    case Direction.bottom_right:
      directionStyleValues = {
        top: '46px',
      };
      break;

    case Direction.top_left:
      directionStyleValues = {
        bottom: '46px',
        right: 0,
      };
      break;

    case Direction.top_right:
      directionStyleValues = {
        bottom: '46px',
      };
      break;

    default:
      directionStyleValues = {
        top: '46px',
        right: '0',
      };
  }

  console.log('🚀 ~ texts:', texts);
  const [hover, setHover] = React.useState(true);

  return (
    <div className="infos_pin_main">
      <MppIcons.infos
        className="infos_pin_main_icon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div
        className={` ${hover ? 'infos_content_visible' : 'infos_content_invisible'} infos_pin_container`}
        style={directionStyleValues}
      >
        <p className="infos_content text_small">
          <span className="infos_title text_small_b">titre : </span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          voluptates est aliquam perferendis quos possimus alias quisquam porro
          magni animi?
        </p>
        <p className="infos_content text_small">
          <span className="infos_title text_small_b">titre : </span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          voluptates est aliquam perferendis quos possimus alias quisquam porro
          magni animi?
        </p>
        <p className="infos_content text_small">
          <span className="infos_title text_small_b">titre : </span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          voluptates est aliquam perferendis quos possimus alias quisquam porro
          magni animi?
        </p>
        <p className="infos_content text_small">
          <span className="infos_title text_small_b">titre : </span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          voluptates est aliquam perferendis quos possimus alias quisquam porro
          magni animi?
        </p>
      </div>
    </div>
  );
};

export default MppInfosPin;
