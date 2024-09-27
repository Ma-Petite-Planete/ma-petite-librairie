import React from 'react';
import './mpp_challenge_card.css';
interface MppChallengeCardProps {

}

const MppChallengeCard: React.FC<MppChallengeCardProps> = ({ }) => {
  return (
    <div className='challenge_card__container'>
      <div className='challenge_card__content'>
        <p className='challenge_card__title text_small_b'>#12.Gros titre</p>
        <p className='challenge_card__subtitle text_small'>catégorie - niveau</p>
      </div>
      <div className='challenge_card__points text_small_b'>
        <span>x133</span>
      </div>
    </div>
  )
};

export default MppChallengeCard;