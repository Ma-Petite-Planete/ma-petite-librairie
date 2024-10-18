import './MppPodiumStep.css';
import React from 'react';
interface MppPodiumStepProps {
    title: string;
    subtitle?: string;
    subtitleBold?: string;
    pointsNumber: number;
    typeOfPlayer: string;
    color: string;
    ranking: number;
    displayAllInfos: boolean;
}
declare const MppPodiumStep: React.FC<MppPodiumStepProps>;
export default MppPodiumStep;
