import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import { MppTypography } from '../../utils/MppTypography';
import { BoType } from '../BoType';
import './mpp_stat_card.css';
interface StatCardProps {
    IconComponent: (typeof MppIcons)[keyof typeof MppIcons];
    title: string;
    stat: number | null | undefined;
    boType?: BoType.gpBo;
    statDetails?: string;
    useSkeletonLoader?: boolean;
    width?: number | string;
    titleTypography?: MppTypography;
    statTypography?: MppTypography;
    titleColor?: string;
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
 * @param {number | string} [props.width="200px"] - Largeur de la carte : nombre en px ou valeur CSS (ex. "100%").
 * @param {MppTypography} [props.titleTypography="text_small"] - Classe de typographie du titre.
 * @param {MppTypography} [props.statTypography="title_h3"] - Classe de typographie de la statistique.
 * @param {string} [props.titleColor] - Couleur du titre (ex. GpColors.darkBlue). Gris par défaut.
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
declare const StatCard: React.FC<StatCardProps>;
export default StatCard;
