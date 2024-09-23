import React from 'react';
import './mpp_card_edition.css';
import iconHistoryPink from '../../ressources/icons/history_pink.svg';
interface MppCardEditionProps {}

const MppCardEdition: React.FC<MppCardEditionProps> = ({}) => {
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

  return (
    <div className='card_edition__container'>
      <div className='card_edition__infos'>

          <p className='edition_infos__date text_body'>
            <span className='edition_infos__name text_body_sb'>Edition Automne 2024 - </span>
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
