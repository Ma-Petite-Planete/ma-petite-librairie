import React from 'react';
import './mpp_multi_section_button.css';

interface ButtonActions {
  label: string;
  OnClick: () => void;
}

interface MppMultiSectionButtonProps {
  buttons_actions: Array<ButtonActions>;
}

/**
 * Le composant MppMultiSectionButton rend un bouton à sections multiples avec des actions personnalisables pour chaque section.
 *
 * @component
 * @param {MppMultiSectionButtonProps} props - Les propriétés du composant MppMultiSectionButton.
 * @param {Array<ButtonActions>} props.buttons_actions - Un tableau d'actions de boutons, chacun contenant un label et une fonction OnClick.
 *
 * @returns {JSX.Element} Le composant MppMultiSectionButton rendu.
 *
 * @example
 * const buttonActions = [
 *   { label: 'Bouton 1', OnClick: () => console.log('Bouton 1 cliqué') },
 *   { label: 'Bouton 2', OnClick: () => console.log('Bouton 2 cliqué') },
 *   { label: 'Bouton 3', OnClick: () => console.log('Bouton 3 cliqué') }
 * ];
 *
 * return (
 *   <MppMultiSectionButton buttons_actions={buttonActions} />
 * );
 */

const MppMultiSectionButton: React.FC<MppMultiSectionButtonProps> = ({
  buttons_actions,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div className="multi_section_button--container">
      {buttons_actions.map((button, index) => (
        <button
          key={index}
          className={`multi_section_button--button text_body_sb ${selectedIndex === index ? 'multi_section_button--selected' : ''}`}
          type="button"
          onClick={() => {
            button.OnClick();
            setSelectedIndex(index);
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default MppMultiSectionButton;
