import React from 'react';
import './mpp_challenge_card.css';
interface MppChallengeCardProps {
  index: number;
  title: string;
  category: string;
  level: string;
  points: number;
}
/**
 * Props pour le composant StatCard.
 * @interface MppChallengeCardProps
 * @property {number} index - Numéro d'index du défi.
 * @property {string} title - Titre du défi.
 * @property {string} category - Catégorie du défi.
 * @property {string} level - Plateau de jeu du défi.
 * @property {number} points - Nombre de points.
 */

/**
 * Composant d'affichage des statisques dans une card avec une icone à gauche pour illustrer
 *
 * @example
 * ```jsx
 * <MppStatCard
 * title={t('traduciton')}
 * IconComponent={MppIcons.training}
 * stat={12}
 * />
 * ```
 */

const MppChallengeCard: React.FC<MppChallengeCardProps> = ({
  index,
  title,
  category,
  level,
  points,
}) => {
  return (
    <div className="challenge_card__container">
      <div className="challenge_card__content">
        <p className="challenge_card__title text_small_b">#{index}.{title}</p>
        <p className="challenge_card__subtitle text_small">
          {category} - {level}
        </p>
      </div>
      <div className="challenge_card__points text_small_b">
        <span>x{points}</span>
      </div>
    </div>
  );
};

export default MppChallengeCard;
