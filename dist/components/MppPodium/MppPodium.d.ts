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
}
declare const MppPodium: React.FC<MppPodiumProps>;
export default MppPodium;
