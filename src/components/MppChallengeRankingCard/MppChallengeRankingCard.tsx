import React from 'react';
import './mpp_challenge_ranking_card.css';
import MppSkeletonLoader from '../MppSkeletonLoader/MppSkeletonLoader';
import { BoType } from '../BoType';

interface MppChallengeCardProps {
  title: string;
  subtitle?: string;
  ranking?: number;
  value: string;
  boType?: BoType;
}

const MppChallengeCard: React.FC<MppChallengeCardProps> = ({
  title,
  subtitle,
  ranking,
  value,
  boType = BoType.scoBO
}) => {
  const titleIsEmpty = title.replace(/[^a-zA-Z0-9]/g, "") === "" ;
  return (
    <div className={`challenge_card__container ${boType === BoType.gpBo ? 'padding_ecu' : '' } ${title ? '' : 'loading'}`}>
      <div className="challenge_card__ranking_title">
        {ranking && (
          <div className="challenge_card__ranking text_body_sb">{ranking}</div>
        )}
        <div className={`challenge_card__content`}>
          {!titleIsEmpty ? (
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
      {!titleIsEmpty ? (
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
