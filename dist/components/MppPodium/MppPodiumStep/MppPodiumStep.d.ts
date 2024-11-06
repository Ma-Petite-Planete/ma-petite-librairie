import './MppPodiumStep.css';
import React from 'react';
interface MppPodiumStepProps {
    id?: string;
    title: string;
    subtitle?: string;
    subtitleBold?: string;
    pointsNumber: string;
    typeOfPlayer: string;
    color: string;
    ranking: number;
    displayAllInfos: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppPodiumStep: React.FC<MppPodiumStepProps>;
export default MppPodiumStep;
