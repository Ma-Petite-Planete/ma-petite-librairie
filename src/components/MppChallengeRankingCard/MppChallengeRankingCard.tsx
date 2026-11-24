import React from 'react';
import './mpp_challenge_ranking_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';
import { BoType } from '../BoType';
import { GpColors } from '../../utils/Mppcolors';

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
const MppChallengeCard: React.FC<MppChallengeCardProps> = ({
  title,
  subtitle,
  ranking,
  value,
  boType = BoType.scoBO,
  tileRankingColorBackground,
  tileRankingColorText,
}) => {
  const titleIsEmpty = title.replace(/[^a-zA-Z0-9]/g, '') === '';
  return (
    <div
      className={`challenge_card__container ${boType === BoType.gpBo ? 'padding_ecu' : ''} ${title ? '' : 'loading'}`}
    >
      <div className="challenge_card__ranking_title">
        {ranking && (
          <div
            className="challenge_card__ranking text_body_sb"
            style={{
              backgroundColor: `${tileRankingColorBackground ?? GpColors.teal}`,
              color: `${tileRankingColorText ?? GpColors.darkBlue}`,
            }}
          >
            {ranking}
          </div>
        )}
        <div className={`challenge_card__content`}>
          {!titleIsEmpty ? (
            <>
              <p
                className={`challenge_card__title  ${boType === BoType.gpBo ? 'text_body_sb' : 'text_small_b'}`}
              >
                {title}
              </p>
              {subtitle && (
                <p className="challenge_card__subtitle text_small">
                  {subtitle}
                </p>
              )}
            </>
          ) : (
            <>
              <MppSkeletonLoader heightRow="20px" />
              <div className="loading_subtitle">
                <MppSkeletonLoader />
              </div>
            </>
          )}
        </div>
      </div>
      {!titleIsEmpty ? (
        <span className="challenge_card__points text_small_b">{value}</span>
      ) : (
        <div className="loading_point">
          <MppSkeletonLoader heightRow="20px" />
        </div>
      )}
    </div>
  );
};

export default MppChallengeCard;
