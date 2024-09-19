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

const MppRankingCard: React.FC<MppRankingCardProps> = ({
  title,
  subtitle,
  ranking,
  points,
  subPointsText,
  pointsColor,
  rankingColorBackground,
}) => {
  return (
    <div className="ranking_card_background ">
      <div className="flex_row">
        <p
          className="text_body_sb ranking_background"
          style={{ backgroundColor: `${rankingColorBackground}` }}
        >
          {ranking}
        </p>
        <div className="content_background">
          <p className="text_body_sb">{title}</p>
          <p className="text_small">{subtitle}</p>
        </div>
      </div>
      <div className="points_background">
        <p className="text_body_sb" style={{ color: `${pointsColor}` }}>
          {points}
        </p>
        <p className="sub_point_text text_small">{subPointsText}</p>
      </div>
    </div>
  );
};

export default MppRankingCard;
