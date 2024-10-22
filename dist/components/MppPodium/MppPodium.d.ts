import React from 'react';
import './MppPodium.css';
interface PodiumStep {
    id?: string;
    name: string;
    points: number;
    ranking: number;
    city?: string;
    structure?: string;
}
interface MppPodiumProps {
    rankedElements: Array<PodiumStep> | null;
    color: string;
    typeOfPlayers: string;
    displayFullInfos: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppPodium: React.FC<MppPodiumProps>;
export default MppPodium;
