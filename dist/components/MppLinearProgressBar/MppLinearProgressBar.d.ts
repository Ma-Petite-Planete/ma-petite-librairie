import React from 'react';
import './mpp_linear_progress_bar.css';
interface LinearProgressBarProps {
    value: number;
    useValueAsProgressBarWidth?: boolean;
    maxValue?: number;
    displayValueAsDefault?: boolean;
    conditionForGreen?: boolean;
    conditionForRed?: boolean;
}
export declare enum ColumnType {
    league_created_vs_previsions = 0,
    leagyues_with_more_then_4_players = 1,
    players_registered = 2,
    activity_rate = 3
}
export declare enum ProgressBarStyle {
    red = "red",
    green = "green",
    orange = "orange",
    default = "default"
}
/**
 * Le composant `MppLinearProgressBar` rend une barre de progression linéaire personnalisable avec un style dynamique basé sur des conditions.
 *
 * @component
 * @param {LinearProgressBarProps} props - Propriétés permettant de configurer la barre de progression.
 * @param {number} props.value - Valeur actuelle de la barre de progression (obligatoire).
 * @param {boolean} [props.useValueAsProgressBarWidth=false] - Si `true`, la valeur est utilisée directement comme pourcentage de largeur (0 à 100).
 * @param {number} [props.maxValue] - La valeur maximale, utilisée pour calculer le pourcentage de progression si `useValueAsProgressBarWidth` est `false`.
 * @param {boolean} [props.displayValueAsDefault] - Si `true`, affiche une barre par défaut sans se baser sur la valeur, utile pour les cas sans données.
 * @param {boolean} [props.conditionForGreen] - Condition qui force le style de la barre en vert.
 * @param {boolean} [props.conditionForRed] - Condition qui force le style de la barre en rouge.
 *
 * @returns {JSX.Element} Le composant React représentant la barre de progression.
 *
 * @example
 * // Utilisation classique avec valeur et maximum
 * const value = 40
 * const maxValue = 100
 * <MppLinearProgressBar value={40} maxValue={100} conditionForGreen={value < 100} conditionForRed={value === 100}/>
 *
 * @example
 * // Utiliser la valeur comme pourcentage de largeur directement
 * // A utiliser si la value est déjà un pourcentage
 * // Du coup doit être moins de 100
 * <MppLinearProgressBar value={75} useValueAsProgressBarWidth={true} />
 *
 * @example
 * // Affichage de la barre par défaut sans données
 * const value = 8
 * <MppLinearProgressBar value={value} displayValueAsDefault={true} />
 **/
export declare const MppLinearProgressBar: React.FC<LinearProgressBarProps>;
export {};
