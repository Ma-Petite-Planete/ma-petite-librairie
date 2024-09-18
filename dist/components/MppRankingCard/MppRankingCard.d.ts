import React from 'react';
import './mpp_ranking_card.css';
interface MppRankingCardProps {
    title: string;
    subtitle: string;
    ranking: number;
    points: string;
    subPointsText?: string;
    pointsColor: string;
    rankingColorBackground: string;
}
/**
* @example
*  <MppRankingCard
        title={'Les poulet'}
        subtitle={'Collège Jean Rostand'}
        ranking={4}
        points={'26.2pts'}
        subPointsText={'par élève'}
        pointsColor={ScoColors.mainYellow}
        rankingColorBackground={ScoColors.mainYellow}
      />
*/
declare const MppRankingCard: React.FC<MppRankingCardProps>;
export default MppRankingCard;
