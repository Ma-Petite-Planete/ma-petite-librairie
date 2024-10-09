import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import './mpp_infos_pin.css';

interface TextContent {
  title: string;
  content: string;
}

export enum Direction {
  top_right,
  top_left,
  bottom_left,
  bottom_right,
}
interface MppInfosPinProps {
  texts: Array<TextContent>;
  direction?: Direction;
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
        right: 0,
      };
  }

  const [hover, setHover] = React.useState(false);
  const isMobile = () => window.innerWidth < 896;

  return (
    <div className="infos_pin_main">
      <MppIcons.infos
        className="infos_pin_main_icon"
        onMouseEnter={() => (isMobile() ? null : setHover(true))}
        onMouseLeave={() => (isMobile() ? null : setHover(false))}
        onClick={() => (isMobile() ? setHover(true) : null)}
      />
      <div
        onClick={() => (isMobile() ? setHover(false) : null)}
        className={` ${hover ? 'infos_content_visible' : 'infos_content_invisible'} infos_pin_container`}
        style={directionStyleValues}
      >
        {texts.map((text, index) => (
          <p key={index} className="infos_content text_small">
            <span className="infos_title text_small_b">{text.title} : </span>
            {text.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MppInfosPin;
