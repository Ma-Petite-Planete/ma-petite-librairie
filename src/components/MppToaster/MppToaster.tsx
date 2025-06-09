import React, { useEffect, useState } from 'react';
import { MppIcons } from '../../utils/MppIcons';
import './mpp_toaster.css';

export enum MessageType {
  error,
  succes,
}

export enum AnimationDirection {
  from_bottom = 'toaster_message_container--bottom',
  from_top = 'toaster_message_container--top',
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

export const MppToaster: React.FC<MppToasterProps> = ({
  message,
  displayToast,
  messageType,
  animationDirection,
  onAnimationEnd,
}) => {
  const [displayToaster, setDisplayToaster] = useState<boolean>(false);

  useEffect(() => {
    if (displayToast) {
      setDisplayToaster(true);
    }
  }, [displayToast]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayToaster(false);
      onAnimationEnd?.();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [displayToaster, onAnimationEnd]);

  return (
    <div
      className={`
        ${
          messageType === MessageType.error
            ? 'error_message_container'
            : 'success_message_container'
        }
        ${displayToaster ? 'visible' : 'hidden'}
        ${animationDirection}
        toaster_message
      `}
    >
      {messageType === MessageType.error ? (
        <MppIcons.invalid />
      ) : (
        <MppIcons.valid />
      )}
      <span className="toaster_message--span text_body">{message}</span>
    </div>
  );
};