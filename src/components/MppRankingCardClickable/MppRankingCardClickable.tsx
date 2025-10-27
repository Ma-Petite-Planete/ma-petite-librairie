import React, { useState, useCallback } from 'react';
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

const MppRankingCardClickable: React.FC<MppRankingCardClickableProps> = ({
  title,
  subtitle,
  ranking,
  points,
  subPointsText,
  pointsColor,
  rankingColorBackground,
  details = [],
  onClick,
  onHover,
  onHoverLeave,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = details && details.length > 0;

  const toggle = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setExpanded((v) => !v);
      onClick?.(e);
    },
    [onClick]
  );

  return (
    <div className="ranking_card_clickable_wrapper">
      <div
        className={`ranking_card_clickable_background ${hasDetails ? 'cursor_pointer' : ''} ${expanded ? 'expanded' : ''}`}
        onClick={toggle}
        onMouseEnter={onHover}
        onMouseLeave={onHoverLeave}
        role={hasDetails ? 'button' : undefined}
        aria-expanded={hasDetails ? expanded : undefined}
        tabIndex={hasDetails ? 0 : -1}
      >
        <div className={`card_header ${title ? '' : 'loading'}`}>
          <>
            <div className="flex_row">
              <p
                className="text_body_sb ranking_background"
                style={{ backgroundColor: rankingColorBackground }}
              >
                {ranking}
              </p>
              <div className="content_background">
                <p className="text_body_sb">{title}</p>
                <p className="text_small">{subtitle}</p>
              </div>
            </div>

            <div className={`points_background ${title}`}>
              <p className="text_body_sb" style={{ color: pointsColor }}>
                {points}
              </p>
              <p className="sub_point_text text_small">{subPointsText}</p>
            </div>
          </>
        </div>

        {hasDetails && (
          <div className={`card_details ${expanded ? 'open' : ''}`}>
            <ul className="details_list">
              {details.map((row, idx) => (
                <li key={`${row.title}-${idx}`} className="detail_row">
                  <div className="detail_left">
                    <p className="text_small">
                      <span className=" text_body_sb">{row.title}</span> -{' '}
                      {row.subtitle}
                    </p>
                  </div>
                  <div className="detail_right">
                    <p className="detail_stat text_body_sb">
                      {row.statistique || '---'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MppRankingCardClickable;
