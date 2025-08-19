import React from 'react';
import './mpp_challenge_ranking_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';

interface MppChallengeCardProps {
  title: string;
  subtitle?: string;
  ranking?: number;
  value: string;
}

const MppChallengeCard: React.FC<MppChallengeCardProps> = ({
  title,
  subtitle,
  ranking,
  value,
}) => {
  return (
    <div className="challenge_card__container">
      <div className="challenge_card__ranking_title">
        {ranking && (
          <div className="challenge_card__ranking text_body_sb">{ranking}</div>
        )}
        <div className={`challenge_card__content ${title ? '' : 'loading'}`}>
          {title ? (
            <>
              <p className="challenge_card__title text_small_b">{title}</p>
              {subtitle && (
                <p className="challenge_card__subtitle text_small">
                  {subtitle}
                </p>
              )}
            </>
          ) : (
            <>
              <MppSkeletonLoader heightRow="20px" />
              <div className="loading_subtitle">
                <MppSkeletonLoader />
              </div>
            </>
          )}
        </div>
      </div>
      {title ? (
        <span className="challenge_card__points text_small_b">{value}</span>
      ) : (
        <div className="loading_point">
          <MppSkeletonLoader heightRow="20px" />
        </div>
      )}
    </div>
  );
};

export default MppChallengeCard;
