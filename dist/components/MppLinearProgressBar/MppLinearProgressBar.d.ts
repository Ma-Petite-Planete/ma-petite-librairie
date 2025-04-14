import React from 'react';
import './mpp_linear_progress_bar.css';
interface LinearProgressBarProps {
    maxValue: number;
    value: number;
    colorStyle: ProgressBarStyle;
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
    invisible = "invisible",
    darkBlue = "dark_blue",
    default = "default"
}
/**
 * Le composant LinearProgressBar rend une barre de progression linéaire personnalisable avec un style de couleur.
 *
 * @component
 * @param {LinearProgressBarProps} props - Les propriétés du composant LinearProgressBar.
 * @param {number} props.maxValue - La valeur maximale de la barre de progression.
 * @param {number} props.value - La valeur actuelle de la barre de progression.
 * @param {ProgressBarStyle} props.colorStyle - Le style de couleur de la barre de progression.
 *
 * @returns {JSX.Element} Le composant LinearProgressBar rendu.
 *
 * @example
 * <LinearProgressBar
 *   maxValue={100}
 *   value={50}
 *   colorStyle={ProgressBarStyle.green}
 * />
 */
export declare const MppLinearProgressBar: React.FC<LinearProgressBarProps>;
export {};
