import './MppPodiumStep.css';
import React from 'react';
import { BoType } from '../../BoType';
import { DetailRow } from '../../../types_and_demo_data/detailRowRanking';
interface MppPodiumStepProps {
    id?: string;
    title: string | null;
    subtitle?: string;
    subtitleBold?: string;
    bottomCount?: string;
    pointsNumber: string;
    typeOfPlayer: string;
    color: string;
    ranking: number;
    boType: BoType;
    displayAllInfos: boolean;
    details?: DetailRow[];
    isOpen?: boolean;
    onStepClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppPodiumStep: React.FC<MppPodiumStepProps>;
export default MppPodiumStep;
