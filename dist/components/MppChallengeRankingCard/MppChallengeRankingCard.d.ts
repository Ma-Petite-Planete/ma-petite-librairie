import React from 'react';
import './mpp_challenge_ranking_card.css';
import { BoType } from '../BoType';
interface MppChallengeCardProps {
    title: string;
    subtitle?: string;
    ranking?: number;
    value: string;
    boType?: BoType;
    tileRankingColorBackground?: string;
    tileRankingColorText?: string;
}
/**
 * Carte d'un défi dans un classement : rang, titre, sous-titre et valeur (ex. points).
 *
 * Tant que le titre ne contient aucun caractère alphanumérique, la carte affiche des skeleton loaders à la place du contenu.
 *
 * @component
 * @param {MppChallengeCardProps} props - Les propriétés du composant MppChallengeCard.
 * @param {string} props.title - Titre du défi.
 * @param {string} [props.subtitle] - Sous-titre affiché sous le titre.
 * @param {number} [props.ranking] - Rang affiché dans la pastille à gauche ; pas de pastille s'il est absent.
 * @param {string} props.value - Valeur affichée à droite (ex. « 120 pts »).
 * @param {BoType} [props.boType=BoType.scoBO] - Type de BO : `BoType.gpBo` applique l'espacement et la typographie du BO ECU.
 * @param {string} [props.tileRankingColorBackground=GpColors.teal] - Couleur de fond de la pastille du rang.
 * @param {string} [props.tileRankingColorText=GpColors.darkBlue] - Couleur du texte de la pastille du rang.
 *
 * @returns {JSX.Element} Le composant MppChallengeCard rendu.
 *
 * @example
 * <MppChallengeCard
 *   title="Manger végétarien"
 *   subtitle="Alimentation"
 *   ranking={1}
 *   value="120 pts"
 *   boType={BoType.gpBo}
 *   tileRankingColorBackground={GpColors.darkBlue}
 *   tileRankingColorText={GpColors.white}
 * />
 */
declare const MppChallengeCard: React.FC<MppChallengeCardProps>;
export default MppChallengeCard;
