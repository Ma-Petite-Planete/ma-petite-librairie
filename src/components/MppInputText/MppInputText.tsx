import React, { useState, useEffect, useCallback } from 'react';
import './mpp_input_text.css';

export interface ValidationCondition {
  condition: (value: string) => boolean;
  message: string;
}

interface MppInputTextProps {
  placeholder: string;
  value: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  needCounter?: boolean;
  maxCharacteres?: number;
  validationConditions?: Array<ValidationCondition>;
  onChange: (value: string, hasError: boolean) => void;
  onClickIcon?: (value: string) => void;
  setHasError?: (hasError: boolean) => void;
  onClickErrorMessage?: string;
}

const MppInputText: React.FC<MppInputTextProps> = ({
  placeholder,
  value = '',
  icon: Icon,
  needCounter = false,
  maxCharacteres,
  validationConditions = [],
  onChange,
  onClickIcon,
  setHasError,
  onClickErrorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [inputValue, setInputValue] = useState(value);
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const validateInput = useCallback(
    (value: string) => {
      const errors = validationConditions
        .filter((validation) => !validation.condition(value))
        .map((validation) => validation.message);

      if (onClickErrorMessage) {
        errors.push(onClickErrorMessage);
      }

      setErrorMessages(errors);
      if (setHasError) setHasError(errors.length > 0);
      return errors.length > 0;
    },
    [validationConditions, onClickErrorMessage, setHasError]
  );

  useEffect(() => {
    if (onClickErrorMessage) {
      validateInput(inputValue);
    }
  }, [onClickErrorMessage, inputValue, validateInput]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFirstEntry(false);
    setIsFocused(false);
    validateInput(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newValueVerify = maxCharacteres
      ? newValue.slice(0, maxCharacteres)
      : newValue;
    setInputValue(newValueVerify);
    const hasError = validateInput(newValueVerify);
    onChange(newValueVerify, hasError);
  };

  const handleIconClick = () => {
    if (onClickIcon) {
      onClickIcon(inputValue);
    }
  };

  return (
    <>
      <div
        className={`mpp_input_container ${isFocused ? 'focused' : ''} ${errorMessages.length > 0 && !isFirstEntry && inputValue ? 'error' : ''}`}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="mpp_input"
        />
        {(isFocused || inputValue) && Icon ? (
          <Icon
            className={onClickIcon ? 'input_icon_pointer' : ''}
            onClick={handleIconClick}
          />
        ) : needCounter ? (
          <span
            className={`input_counter ${inputValue.length === maxCharacteres ? 'max_characteres' : ''}`}
          >{`${inputValue.length}/${maxCharacteres}`}</span>
        ) : null}
      </div>
      <div className="input_errors">
        {errorMessages.length > 0 &&
          inputValue &&
          !isFirstEntry &&
          errorMessages.map((error, index) => (
            <p key={index} className="input_error">
              {error}
            </p>
          ))}
      </div>
    </>
  );
};

export default MppInputText;
