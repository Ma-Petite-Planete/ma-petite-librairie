import React from 'react';
import { MppIcons } from '../../utils/MppIcons';
import './mpp_toaster.css';

interface MppToasterProps {
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Le composant MppToaster affiche des messages de succès et d'erreur.
 *
 * @composant
 * @param {Object} props - L'objet des propriétés.
 * @param {string} props.successMessage - Le message de succès à afficher.
 * @param {string} props.errorMessage - Le message d'erreur à afficher.
 *
 * @exemple
 * <MppToaster successMessage="Opération réussie !" errorMessage="Échec de l'opération !" />
 *
 * @returns {JSX.Element} Le composant rendu.
 */

const MppToaster: React.FC<MppToasterProps> = ({
  successMessage,
  errorMessage,
}) => {
  return (
    <div>
      {successMessage && (
        <div className="success_message_container toaster_message">
          <MppIcons.valid />
          <span className="toaster_message--span text_body">
            {successMessage}
          </span>
        </div>
      )}
      {errorMessage && (
        <div className="error_message_container toaster_message">
          <MppIcons.invalid />
          <span className="toaster_message--span text_body">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default MppToaster;
