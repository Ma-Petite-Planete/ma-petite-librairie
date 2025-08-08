import React from 'react';
import './mpp_ranking_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';
import useBoldNumbers from '../../hooks/useBoldNumbers';

interface MppRankingCardProps {
  title: string;
  subtitle: string;
  ranking: number;
  points: string;
  subPointsText?: string;
  pointsColor: string;
  rankingColorBackground: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * MppRankingCard affiche une carte de classement, avec un titre, un sous-titre
 * (dont les nombres peuvent être mis en gras), un numéro de classement,
 * et un affichage de points.
 *
 * @param {MppRankingCardProps} props - Propriétés du composant.
 * @param {string} props.title - Le titre principal de la carte.
 * @param {string} props.subtitle - Le sous-titre, une chaîne de texte où
 *                                  les nombres seront mis en gras si ils sont entre {} exemple {12} seras en gras.
 * @param {number} props.ranking - Le rang (numéro) à afficher en badge.
 * @param {string} props.points - Le texte des points (ex. "26.2pts").
 * @param {string} [props.subPointsText] - Texte additionnel sous les points.
 * @param {string} props.pointsColor - Couleur du texte des points.
 * @param {string} props.rankingColorBackground - Couleur de fond du badge.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 *        - Callback lorsqu’on clique sur la carte.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHover]
 *        - Callback lorsqu’on survole la carte.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHoverLeave]
 *        - Callback lorsqu’on quitte le survol de la carte.
 *
 * @example
 * ```tsx
 * <MppRankingCard
 *   title="Les poulets"
 *   subtitle="Challenge validés %/12/% – Participants %/5/%"
 *   ranking={4}
 *   points="26.2pts"
 *   subPointsText="par élève"
 *   pointsColor="#FFD700"
 *   rankingColorBackground="#FFD700"
 *   onClick={(e) => console.log('click', e)}
 *   onHover={(e) => console.log('hover', e)}
 *   onHoverLeave={(e) => console.log('leave', e)}
 * />
 * ```
 */

const MppRankingCard: React.FC<MppRankingCardProps> = ({
  title,
  subtitle,
  ranking,
  points,
  subPointsText,
  pointsColor,
  rankingColorBackground,
  onClick,
  onHover,
  onHoverLeave,
}) => {
  const subtitleWithBoldNumbers = useBoldNumbers(subtitle);
  return (
    <div
      className="ranking_card_background "
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
    >
      <div className={`flex_row ${title ? '' : 'loading'}`}>
        {title ? (
          <>
            <p
              className="text_body_sb ranking_background"
              style={{ backgroundColor: `${rankingColorBackground}` }}
            >
              {ranking}
            </p>
            <div className="content_background">
              <p className="text_body_sb">{title}</p>
              <p className="text_small">{subtitleWithBoldNumbers}</p>
            </div>
          </>
        ) : (
          <>
            <div className="number_loading">
              <MppSkeletonLoader heightRow="25px" />
            </div>
            <div className="text_loading">
              <MppSkeletonLoader count={2} />
            </div>
          </>
        )}
      </div>
      <div className={`"points_background ${title ? '' : 'skeleton_loading'}`}>
        {title ? (
          <>
            <p className="text_body_sb" style={{ color: `${pointsColor}` }}>
              {points}
            </p>
            <p className="sub_point_text text_small">{subPointsText}</p>
          </>
        ) : (
          <MppSkeletonLoader count={2} />
        )}
      </div>
    </div>
  );
};

export default MppRankingCard;
