import React from 'react';
import './mpp_text_style.css';

const MppTextStyle: React.FC = () => {
  return (
    <div>
      <div className="text_style_container">
        <div className="text_style_sub_container">
          <p className="title_h1">Titre H1 (.title_h1)</p>
          <p className="title_h2">Titre H2 (.title_h2)</p>
          <p className="title_h3">Titre H3 (.title_h3)</p>
          <p className="subtitle">Sous Titre (.subtitle)</p>
        </div>
        <div className="text_style_sub_container">
          <p>Texte Display (native value)</p>
          <p className="text_body">Texte body (.text_body)</p>
          <p className="text_body_sb">Texte body semi bold (.text_body_sb)</p>
          <p className="text_small_b">Texte small bold (.text_small_b)</p>
          <p className="text_small">Texte small (.text_small)</p>
        </div>
      </div>
    </div>
  );
};

export default MppTextStyle;
