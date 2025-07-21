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
    onAnimationEnd?: () => void;
}
/**
 * MppToaster affiche un message de notification temporaire (toast) avec styles et animations personnalisables.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.message - Message à afficher dans le toast.
 * @param {boolean} props.displayToast - Contrôle l'affichage du toast.
 * @param {MessageType} props.messageType - Type de message (MessageType.error ou MessageType.succes).
 * @param {AnimationDirection} props.animationDirection - Direction de l'animation d'apparition.
 * @param {() => void} [props.onAnimationEnd] - Callback appelé à la fin de l'animation.
 *
 * @returns {JSX.Element} Composant MppToaster.
 *
 * @example
 * <MppToaster
 *   message="Opération réussie"
 *   displayToast={true}
 *   messageType={MessageType.succes}
 *   animationDirection={AnimationDirection.from_bottom}
 *   onAnimationEnd={() => console.log('Toast fermé')}
 * />
 */
export declare const MppToaster: React.FC<MppToasterProps>;
export {};
