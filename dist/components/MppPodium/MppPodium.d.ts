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
    rankedElements: Array<PodiumStep> | null;
    color: string;
    typeOfPlayers: string;
}
declare const MppPodium: React.FC<MppPodiumProps>;
export default MppPodium;
