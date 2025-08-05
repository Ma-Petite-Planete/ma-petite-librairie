import './MppPodiumStep.css';
import React from 'react';
import { BoType } from '../../BoType';
interface MppPodiumStepProps {
    id?: string;
    title: string;
    subtitle?: string;
    subtitleBold?: string;
    bottomCount?: string;
    pointsNumber: string;
    typeOfPlayer: string;
    color: string;
    ranking: number;
    boType: BoType;
    displayAllInfos: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppPodiumStep: React.FC<MppPodiumStepProps>;
export default MppPodiumStep;
