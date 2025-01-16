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

const MppToaster: React.FC<MppToasterProps> = ({
  message,
  displayToast,
  messageType,
  animationDirection,
}) => {
  const [displayToaster, setDisplayToaster] = useState<boolean>(displayToast);

  useEffect(() => {
    if (displayToaster) {
      setTimeout(() => {
        setDisplayToaster(false);
      }, 3500);
    }
  }, [displayToaster]);

  return (
    <div className="toaster_message_container">
      <div
        className={`${messageType === MessageType.error ? 'error_message_container' : 'success_message_container'} ${displayToaster ? 'visible' : 'hidden'}  ${animationDirection} toaster_message`}
      >
        {messageType === MessageType.error ? (
          <MppIcons.invalid />
        ) : (
          <MppIcons.valid />
        )}
        <span className="toaster_message--span text_body">{message}</span>
      </div>
    </div>
  );
};

export default MppToaster;
