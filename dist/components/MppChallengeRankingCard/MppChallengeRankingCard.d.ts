import React from 'react';
import './mpp_challenge_ranking_card.css';
interface MppChallengeCardProps {
    title: string;
    subtitle?: string;
    ranking?: number;
    value: string;
}
declare const MppChallengeCard: React.FC<MppChallengeCardProps>;
export default MppChallengeCard;
