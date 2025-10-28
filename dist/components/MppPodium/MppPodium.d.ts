import React from 'react';
import './MppPodium.css';
import { BoType } from '../BoType';
import { DetailRow } from '../../types_and_demo_data/detailRowRanking';
export interface PodiumStep {
    id?: string;
    name: string;
    points: number;
    ranking: number;
    city?: string;
    structure?: string;
    comparativeValue?: string;
    nb_challenge?: string;
    bottomCount?: string;
    subTitleTile?: string;
    details?: DetailRow[];
}
/**
 * MppPodium affiche un podium avec les éléments classés passés en entrée.
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
