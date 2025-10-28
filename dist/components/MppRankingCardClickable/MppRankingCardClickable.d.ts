import React from 'react';
import './mpp_ranking_card_clickable.css';
import { DetailRow } from '../../types_and_demo_data/detailRowRanking';
interface MppRankingCardClickableProps {
    title: string;
    subtitle: string;
    ranking: number;
    points: string;
    subPointsText?: string;
    pointsColor: string;
    rankingColorBackground: string;
    details?: DetailRow[];
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MppRankingCardClickable: React.FC<MppRankingCardClickableProps>;
export default MppRankingCardClickable;
