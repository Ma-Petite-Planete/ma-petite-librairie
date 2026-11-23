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
  theme?: 'light' | 'dark';
}

/**
 * Icône « i » qui affiche une bulle d'informations : au survol sur ordinateur, au clic sur mobile (largeur < 896 px).
 *
 * @component
 * @param {MppInfosPinProps} props - Les propriétés du composant MppInfosPin.
 * @param {Array<{ title: string, content: string }>} props.texts - Lignes de la bulle, chacune affichée sous la forme « titre : contenu ».
 * @param {Direction} [props.direction=Direction.bottom_left] - Position de la bulle par rapport à l'icône : au-dessus (`top_*`) ou en dessous (`bottom_*`), alignée à droite (`*_left`) ou à gauche (`*_right`) de l'icône.
 * @param {'light' | 'dark'} [props.theme='light'] - Thème de la bulle : `dark` lui donne un fond bleu foncé.
 *
 * @returns {JSX.Element} Le composant MppInfosPin rendu.
 *
 * @example
 * <MppInfosPin
 *   texts={[{ title: 'Players actifs', content: 'ont validé au moins un défi' }]}
 *   direction={Direction.top_left}
 *   theme="dark"
 * />
 */
const MppInfosPin: React.FC<MppInfosPinProps> = ({
  texts,
  direction = Direction.bottom_left,
  theme = 'light',
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
        onClick={() => (isMobile() ? setHover(!hover) : null)}
      />
      <div
        onClick={() => (isMobile() ? setHover(false) : null)}
        className={`${hover ? 'infos_content_visible' : 'infos_content_invisible'} infos_pin_container infos_pin_container--${theme}`}
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
