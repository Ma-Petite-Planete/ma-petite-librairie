import React from 'react';
import './mpp_challenge_ranking_card.css';
import { BoType } from '../BoType';
interface MppChallengeCardProps {
    title: string;
    subtitle?: string;
    ranking?: number;
    value: string;
    boType?: BoType;
    rankingColor?: string;
}
declare const MppChallengeCard: React.FC<MppChallengeCardProps>;
export default MppChallengeCard;
