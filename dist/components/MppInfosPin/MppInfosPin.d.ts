import React from 'react';
import './mpp_infos_pin.css';
interface TextContent {
    title: string;
    content: string;
}
export declare enum Direction {
    top_right = 0,
    top_left = 1,
    bottom_left = 2,
    bottom_right = 3
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
declare const MppInfosPin: React.FC<MppInfosPinProps>;
export default MppInfosPin;
