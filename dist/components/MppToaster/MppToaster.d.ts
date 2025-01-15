import React from 'react';
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
declare const MppToaster: React.FC<MppToasterProps>;
export default MppToaster;
