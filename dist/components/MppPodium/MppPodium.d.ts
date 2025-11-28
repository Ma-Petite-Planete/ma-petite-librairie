import React from 'react';
import './MppPodium.css';
import { BoType } from '../BoType';
import { DetailRow } from '../../types_and_demo_data/detailRowRanking';
export interface PodiumStep {
    id?: string;
    name: string;
    points: number;
    ranking: number;
    boldSubtitle?: string;
    lightSubtitle?: string;
    comparativeValue?: string;
    nb_challenge?: string;
    bottomCount?: string;
    subTitleTile?: string;
    details?: DetailRow[];
}
/**
 * MppPodium affiche un podium avec les éléments classés passés en entrée.
 *
 * Ce composant attend jusqu'à trois éléments classés (1er, 2e, 3e). Si
 * `rankedElements` est `null`, le composant affiche des placeholders (skeleton)
 * pour chacune des trois étapes du podium.
 *
 * @param {MppPodiumProps} props - Propriétés du composant podium.
 * @param {Array<PodiumStep> | null} props.rankedElements
 *   - La liste des éléments à afficher dans le podium (typiquement 1 à 3 éléments).
 *     Si `null`, on affiche des placeholders skeleton (3 étapes).
 * @param {string} props.color
 *   - La couleur appliquée aux badges et textes du podium (ex. "#FFCC00").
 * @param {string} props.typeOfPlayers
 *   - Libellé décrivant le type de joueurs (ex. "élèves", "équipes").
 * @param {boolean} props.displayFullInfos
 *   - Indique s’il faut afficher toutes les informations disponibles (boldSubtitle, structure…).
 * @param {BoType} [props.boType=BoType.scoBO]
 *   - Type de back-office, utilisé pour appliquer le style de fond approprié.
 *     Valeurs possibles : BoType.scoBO | BoType.gpBO.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 *   - Callback appelé au clic sur une étape du podium ou sur le backdrop de détails.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHover]
 *   - Callback appelé au survol d’une étape du podium.
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onHoverLeave]
 *   - Callback appelé à la sortie du survol d’une étape du podium.
 *
 * Remarques :
 * - Chaque élément de `rankedElements` doit contenir au minimum `name`, `points`
 *   et `ranking`. Les champs optionnels (boldSubtitle, lightSubtitle, details, etc.) seront
 *   affichés si `displayFullInfos` est vrai et si les données sont présentes.
 * - Les callbacks reçoivent l'événement mouse du div concerné.
 *
 * @example
 * ```tsx
 * const steps: PodiumStep[] = [
 *   { id: 'a', name: 'Alice',   points: 42, ranking: 1, boldSubtitle: 'Paris',     lightSubtitle: 'Lycée A' },
 *   { id: 'b', name: 'Bob',     points: 37, ranking: 2, boldSubtitle: 'Lyon',      lightSubtitle: 'Lycée B' },
 *   { id: 'c', name: 'Charlie', points: 29, ranking: 3, boldSubtitle: 'Marseille', lightSubtitle: 'Lycée C' },
 * ];
 *
 * <MppPodium
 *   rankedElements={steps}
 *   color="#FFCC00"
 *   typeOfPlayers="élèves"
 *   displayFullInfos={true}
 *   boType={BoType.gpBO}
 *   onClick={(e) => console.log('clicked', e)}
 * />
 * ```
 */
interface MppPodiumProps {
    rankedElements: Array<PodiumStep> | null;
    color: string;
    typeOfPlayers: string;
    displayFullInfos: boolean;
    boType?: BoType;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const MppPodium: React.FC<MppPodiumProps>;
export {};
