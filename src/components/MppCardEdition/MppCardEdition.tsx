import React from 'react';
import './mpp_card_edition.css';
import iconHistoryPink from '../../ressources/icons/history_pink.svg';
interface MppCardEditionProps {
  backgroundColor: string;
  textColor: string;
  editionName: string;
  startDate: Date;
  endDate: Date;
}

const MppCardEdition: React.FC<MppCardEditionProps> = ({backgroundColor, textColor, editionName, startDate, endDate}) => {
  function formaterDate(dateStr: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', options);
  }

  function getEditionMessage(startDate: Date, endDate: Date): string {
    const now = new Date();
    const oneMonthBeforeStart = new Date(startDate);
    oneMonthBeforeStart.setMonth(oneMonthBeforeStart.getMonth() - 1);

    const oneWeekBeforeEnd = new Date(endDate);
    oneWeekBeforeEnd.setDate(oneWeekBeforeEnd.getDate() - 7);

    // Si la date actuelle est avant un mois avant le début de l'édition
    if (now < oneMonthBeforeStart) {
      return ""; // Pas de message
    }

    // Si la date actuelle est entre un mois avant et le début de l'édition
    if (now >= oneMonthBeforeStart && now < startDate) {
      return "Le départ de l’édition approche !";
    }

    // Si l'édition est en cours mais pas dans la dernière semaine
    if (now >= startDate && now < oneWeekBeforeEnd) {
      return "Edition en cours";
    }

    // Si l'édition est en cours pendant la dernière semaine
    if (now >= oneWeekBeforeEnd && now < endDate) {
      const remainingDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `Il reste ${remainingDays} jours !`;
    }

    // Si l'édition est terminée
    if (now >= endDate) {
      return "L’édition est terminée";
    }

    return "";
  }

  return (
    <div className='card_edition__container'>
      <div className='card_edition__infos'>

          <p className='edition_infos__date text_body'>
            <span className='edition_infos__name text_body_sb'>{editionName} - </span>
            Du lundi 18 novembre 9h au lundi 9 décembre 20h</p>
      </div>

      <div className='card_edition__days'>
      <img className='edition_days__icon' src={iconHistoryPink} alt='' />
        <p className='card_edition__text'>
          <p className='edition_days__details text_body_sb'>Il reste 7 jours !</p>
        </p>
      </div>
    </div>
  );
};

export default MppCardEdition;
