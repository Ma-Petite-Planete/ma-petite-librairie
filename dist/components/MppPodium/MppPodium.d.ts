import React from 'react';
import './MppPodium.css';
import { BoType } from '../BoType';
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
}
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
