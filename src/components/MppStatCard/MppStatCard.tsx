import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import { BoType } from '../BoType';
import './mpp_stat_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';

interface StatCardProps {
  IconComponent: (typeof MppIcons)[keyof typeof MppIcons];
  title: string;
  stat: number | null | undefined;
  boType?: BoType.gpBo;
  statDetails?: string;
  useSkeletonLoader?: boolean;
}

/**
 * Composant d'affichage des statistiques dans une carte avec une icône à gauche pour illustrer.
 *
 * Affiche un titre, une statistique principale, une icône, et éventuellement des détails complémentaires.
 * Gère l'affichage d'un loader skeleton lorsque la statistique n'est pas encore disponible.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {(typeof MppIcons)[keyof typeof MppIcons]} props.IconComponent - Composant d'icône issu de MppIcons pour illustrer la statistique.
 * @param {string} props.title - Titre affiché sur la carte.
 * @param {number | null | undefined} props.stat - Valeur numérique de la statistique à afficher. Si null/undefined, affiche un loader ou "--".
 * @param {BoType.gpBo} [props.boType] - Permet d'afficher une ombre spécifique pour le type de BO ECU (optionnel).
 * @param {string} [props.statDetails] - Détails complémentaires affichés après la statistique (optionnel).
 * @param {boolean} [props.useSkeletonLoader=true] - Active ou non l'affichage du skeleton loader lors du chargement (optionnel, true par défaut).
 *
 * @example
 * ```tsx
 * <MppStatCard
 *   title="Traduction"
 *   IconComponent={MppIcons.training}
 *   stat={12}
 *   statDetails="/élèves"
 * />
 * ```
 */

const StatCard: React.FC<StatCardProps> = ({
  IconComponent,
  title,
  stat,
  boType,
  statDetails,
  useSkeletonLoader = true
}) => {
  return (
    <div
      className={`stat_card__container${boType ? ' stat_card__container--shadow' : ''}`}
    >
      {stat !== null && stat !== undefined  || !useSkeletonLoader ? (
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
        ) : useSkeletonLoader ?

        (
          <MppSkeletonLoader count={2} />
        ): <>
            <p className="stat_card__title text_small">{title}</p>
            <p className="stat_card__number title_h3">
              --
            </p>
          </>}
      </div>
    </div>
  );
};

export default StatCard;
