import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import { BoType } from '../BoType';
import './mpp_stat_card.css';
interface StatCardProps {
    IconComponent: (typeof MppIcons)[keyof typeof MppIcons];
    title: string;
    stat: number | null | undefined;
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
declare const StatCard: React.FC<StatCardProps>;
export default StatCard;
