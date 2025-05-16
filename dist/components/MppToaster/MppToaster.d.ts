import React from 'react';
import './mpp_toaster.css';
export declare enum MessageType {
    error = 0,
    succes = 1
}
export declare enum AnimationDirection {
    from_bottom = "toaster_message_container--bottom",
    from_top = "toaster_message_container--top"
}
interface MppToasterProps {
    message: string;
    displayToast: boolean;
    messageType: MessageType;
    animationDirection: AnimationDirection;
    setReset?: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Le composant MppToaster rend un message de notification (toast) avec des styles et animations personnalisables.
 *
 * @component
 * @param {MppToasterProps} props - Les propriétés du composant MppToaster.
 * @param {string} props.message - Le message à afficher dans le toast.
 * @param {boolean} props.displayToast - Indicateur pour afficher ou masquer le toast.
 * @param {MessageType} props.messageType - Le type de message (erreur ou succès).
 * @param {AnimationDirection} props.animationDirection - La direction de l'animation du toast.
 *
 * @returns {JSX.Element} Le composant MppToaster rendu.
 *
 * @example
 * <MppToaster
 *   message="Opération réussie"
 *   displayToast={true}
 *   messageType={MessageType.succes}
 *   animationDirection={AnimationDirection.from_bottom}
 * />
 */
export declare const MppToaster: React.FC<MppToasterProps>;
export {};
