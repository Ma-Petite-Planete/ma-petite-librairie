import React, { useEffect } from 'react';
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

/**
 * @interface MppCardEditionProps
 * @property {string} backgroundColor - Couleur de fond.
 * @property {string} textColor - Couleur des textes.
 * @property {string} editionName - Nom de l'édition.
 * @property {string} startDate - Date de début de l'édition.
 * @property {string} endDate - Date de fin de l'édition.
 * @property {boolean} displayDaysLeft - Booléen pour afficher ou pas le message.
 *
 * Composant d'affichage des dates de début et de fin d'édition et, côté scolaire, affichage d'un message en fonction de la date du jour
 *
 * @example
 * ````
 * <MppCardEdition
        displayDaysLeft={true}
        backgroundColor={ScoColors.veryLightYellow}
        textColor={ScoColors.darkBlue}
        editionName={'Edition Automne 2024'}
        startDate={'2024-02-12 08:57:38+00'}
        endDate={'2024-03-03 08:57:49+00'}
      />
 * ````
 */

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

  const [editionStartdate, setEditionStartdate] = React.useState(formaterDate(startDate));
  const [editionEnddate, setEditionEnddate] = React.useState(formaterDate(endDate));
  const [editionMessage, setEditionMessage] = React.useState(getEditionMessage(startDate, endDate));

  useEffect(() => {
    setEditionStartdate(formaterDate(startDate));
    setEditionEnddate(formaterDate(endDate));
    setEditionMessage(getEditionMessage(startDate, endDate));
  }, [startDate, endDate]);

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
          Du {editionStartdate} au {editionEnddate}
        </p>
      </div>

      {displayDaysLeft && editionMessage ? (
        <div className='card_edition__days'>
          <MppIcons.history
            fill={ScoColors.tonicViolet}
            className='card_edition__icon'
          />
          <p className='edition_days__details text_body_sb'>
            {editionMessage}
          </p>
        </div>
      ) : null}
    </div>
  );
};



export default MppCardEdition;


