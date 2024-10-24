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
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHoverLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
        onHover={(e) => {
          console.log(e.target);
        }}
        onHoverLeave={(e) => {
          console.log(e.target);
        }}
        onClick={(e) => {
          console.log(e.target);
        }}
      />
*/
declare const MppRankingCard: React.FC<MppRankingCardProps>;
export default MppRankingCard;
