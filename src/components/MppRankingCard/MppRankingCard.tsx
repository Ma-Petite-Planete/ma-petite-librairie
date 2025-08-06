import React from 'react';
import './mpp_ranking_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';
import useBoldNumbers from '../../hooks/useBoldNumbers';

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

const MppRankingCard: React.FC<MppRankingCardProps> = ({
  title,
  subtitle,
  ranking,
  points,
  subPointsText,
  pointsColor,
  rankingColorBackground,
  onClick,
  onHover,
  onHoverLeave,
}) => {
  const subtitleWithBoldNumbers = useBoldNumbers(subtitle);
  return (
    <div
      className="ranking_card_background "
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
    >
      <div className={`flex_row ${title ? '' : 'loading'}`}>
        {title ? (
          <>
            <p
              className="text_body_sb ranking_background"
              style={{ backgroundColor: `${rankingColorBackground}` }}
            >
              {ranking}
            </p>
            <div className="content_background">
              <p className="text_body_sb">{title}</p>
              <p className="text_small">{subtitleWithBoldNumbers}</p>
            </div>
          </>
        ) : (
          <>
            <div className="number_loading">
              <MppSkeletonLoader heightRow="25px" />
            </div>
            <div className="text_loading">
              <MppSkeletonLoader count={2} />
            </div>
          </>
        )}
      </div>
      <div className={`"points_background ${title ? '' : 'skeleton_loading'}`}>
        {title ? (
          <>
            <p className="text_body_sb" style={{ color: `${pointsColor}` }}>
              {points}
            </p>
            <p className="sub_point_text text_small">{subPointsText}</p>
          </>
        ) : (
          <MppSkeletonLoader count={2} />
        )}
      </div>
    </div>
  );
};

export default MppRankingCard;
