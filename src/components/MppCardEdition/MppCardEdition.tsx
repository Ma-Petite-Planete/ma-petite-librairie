import React from 'react';
import './mpp_card_edition.css';
import { MppIcons } from '../../utils/MppIcons';
import { ScoColors } from '../../utils/Mppcolors';
interface MppCardEditionProps {
  backgroundColor?: string;
  textColor?: string;
  editionName: string;
  startDate: string;
  endDate: string;
  displayDaysLeft: boolean;
}

const MppCardEdition: React.FC<MppCardEditionProps> = ({
  backgroundColor,
  textColor,
  editionName,
  startDate,
  endDate,
  displayDaysLeft,
}) => {
  const formaterDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
    });

  const getEditionMessage = (
    startDateStr: string,
    endDateStr: string
  ): string => {
    const now = new Date();
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const oneMonthBeforeStart = new Date(startDate);
    oneMonthBeforeStart.setMonth(oneMonthBeforeStart.getMonth() - 1);

    const oneWeekBeforeEnd = new Date(endDate);
    oneWeekBeforeEnd.setDate(oneWeekBeforeEnd.getDate() - 7);

    if (now < oneMonthBeforeStart) {
      return '';
    }

    if (now >= oneMonthBeforeStart && now < startDate) {
      return 'Le départ de l’édition approche !';
    }

    if (now >= startDate && now < oneWeekBeforeEnd) {
      return 'Edition en cours';
    }

    if (now >= oneWeekBeforeEnd && now < endDate) {
      const remainingDays = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `Il reste ${remainingDays} jours !`;
    }

    if (now >= endDate) {
      return 'L’édition est terminée';
    }

    return '';
  };

  return (
    <div
      style={{ backgroundColor: `${backgroundColor}` }}
      className='card_edition__container'
    >
      <div style={{ color: `${textColor}` }} className='card_edition__infos'>
        <p className='edition_infos__date text_body'>
          <span className='edition_infos__name text_body_sb'>
            {editionName} -{' '}
          </span>
          Du {formaterDate(startDate)} au {formaterDate(endDate)}
        </p>
      </div>

      {displayDaysLeft ? (
        <div className='card_edition__days'>
          <MppIcons.history
            fill={ScoColors.tonicViolet}
            className='card_edition__icon'
          />
          <p className='edition_days__details text_body_sb'>
            {getEditionMessage(startDate, endDate)}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MppCardEdition;
