import React from 'react';
import './MppPodium.css';
interface PodiumStep {
    name: string;
    points: number;
    ranking: number;
    city?: string;
    structure?: string;
}
interface MppPodiumProps {
    rankedElements: Array<PodiumStep>;
    color: string;
    typeOfPlayers: string;
    displayFullInfos: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppPodium: React.FC<MppPodiumProps>;
export default MppPodium;
