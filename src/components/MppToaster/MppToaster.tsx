import React from 'react';
import './mpp_toaster.css';
import '../MppTextStyle/mpp_text_style.css';
import whiteCheck from '../../ressources/icon/check_white.svg';


const MppToaster: React.FC = () => {
  return (
    <div className="mpp_toaster_container">
      <img src={whiteCheck} alt="icone de validation blanche" />
      <p className="mpp_toaster_container__text text_body"> Vos modifications ont bien été enregistrées</p>
    </div>
  );
};

export default MppToaster;