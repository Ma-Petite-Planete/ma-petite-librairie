import React, { useState, useEffect, useCallback } from 'react';
import './mpp_text_area.css';

export interface ValidationCondition {
  condition: (value: string) => boolean;
  message: string;
}

interface MppTextAreaProps {
  placeholder: string;
  value: string;
  validationConditions?: Array<ValidationCondition>;
  onChange?: (value: string, hasError: boolean) => void;
  onClickIcon?: (value: string) => void;
  setHasError?: (hasError: boolean) => void;
  readOnly?: boolean;
}

const MppTextArea: React.FC<MppTextAreaProps> = ({
  placeholder,
  value = '',
  validationConditions = [],
  onChange,
  setHasError,
  readOnly = false,
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

      setErrorMessages(errors);
      if (setHasError) setHasError(errors.length > 0);
      return errors.length > 0;
    },
    [validationConditions, setHasError]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFirstEntry(false);
    setIsFocused(false);
    validateInput(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const hasError = validateInput(newValue);
    onChange(newValue, hasError);
  };

  return (
    <>
      <div
        className={`mpp_text_area_container ${isFocused && !readOnly ? 'focused' : ''} ${errorMessages.length > 0 && !isFirstEntry && inputValue ? 'error' : ''}`}
      >
        <textarea
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={readOnly ? null : handleChange}
          className={`mpp_text_area ${readOnly ? 'read_only' : ''}`}
          readOnly={readOnly}
        />
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

export default MppTextArea;
