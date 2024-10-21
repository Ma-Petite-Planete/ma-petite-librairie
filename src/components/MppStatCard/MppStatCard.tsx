import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import { BoType } from '../BoType';
import './mpp_stat_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';

interface StatCardProps {
  IconComponent: (typeof MppIcons)[keyof typeof MppIcons];
  title: string;
  stat: number | null;
  boType?: BoType.gpBo;
  statDetails?: string;
}

/**
 * Props pour le composant StatCard.
 * @interface MppInputTextProps
 * @property {(typeof MppIcons)[keyof typeof MppIcons]} IconComponent - Composant icon de MppIcons pour afficher l'icone de la stat.
 * @property {string} title - Titre de la card.
 * @property {number} stat - Nombre/statistique que l'on veut afficher.
 * @property {BoType.gpBo} boType - Permet d'afficher une ombre spécifique au BO ECU, n'autorise que le type gpBo.
 * @property {string} statDetails - String qui affiche des détails après les stats
 */

/**
 * Composant d'affichage des statisques dans une card avec une icone à gauche pour illustrer
 *
 * @example
 * ```jsx
 * <MppStatCard
 * title={t('traduction')}
 * IconComponent={MppIcons.training}
 * stat={12}
 * statDetails="/élèves"
 * />
 * ```
 */

const StatCard: React.FC<StatCardProps> = ({
  IconComponent,
  title,
  stat,
  boType,
  statDetails,
}) => {
  return (
    <div
      className={`stat_card__container${boType ? ' stat_card__container--shadow' : ''}`}
    >
      {stat !== null && stat !== undefined ? (
        <div className="stat_card__icon">
          <IconComponent />
        </div>
      ) : (
        <div className="loader_background">
          <MppSkeletonLoader circular={true} />
        </div>
      )}
      <div className="stat_card__content">
        {stat !== null && stat !== undefined ? (
          <>
            <p className="stat_card__title text_small">{title}</p>
            <p className="stat_card__number title_h3">
              {stat} {statDetails ?? ''}
            </p>
          </>
        ) : (
          <MppSkeletonLoader count={2} />
        )}
      </div>
    </div>
  );
};

export default StatCard;
