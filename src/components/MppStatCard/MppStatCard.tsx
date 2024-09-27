import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import { BoType } from '../BoType';
import './mpp_stat_card.css';

interface StatCardProps {
  IconComponent: (typeof MppIcons)[keyof typeof MppIcons];
  title: string;
  stat: number;
  boType?: BoType.gpBo;
}

const StatCard: React.FC<StatCardProps> = ({
  IconComponent,
  title,
  stat,
  boType,
}) => {
  return (
    <div
      className={`stat_card__container ${boType ? 'stat_card__container--shadow' : ''}`}
    >
      <div className="stat_card__icon">
        <IconComponent />
      </div>
      <div className="stat_card__content">
        <p className="stat_card__title text_small">{title}</p>
        <p className="stat_card__number title_h3">{stat}</p>
      </div>
    </div>
  );
};

export default StatCard;
