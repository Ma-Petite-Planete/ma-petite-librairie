import React, { useState, useEffect, useRef, useId } from 'react';
import './mpp_text_area.css';

export interface ValidationCondition {
  condition: (value: string) => boolean;
  message: string;
}

interface MppTextAreaProps {
  placeholder: string;
  value: string;
  validationConditions?: Array<ValidationCondition>;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

const MppTextArea: React.FC<MppTextAreaProps> = ({
  placeholder,
  value = '',
  onChange,
  readOnly = false,
  style,
  id,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
    adjustHeight();
  }, [value]);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    adjustHeight();
    onChange(newValue);
  };
  const reactId = useId();
  const finalId = id ?? `mpp-textarea-${reactId}`;
  return (
    <>
      <div
        className={`mpp_text_area_container ${isFocused && !readOnly ? 'focused' : ''}`}
        style={style}
      >
        <textarea
          id={finalId}
          ref={textAreaRef}
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={readOnly ? null : handleChange}
          className={`mpp_text_area ${readOnly ? 'read_only' : ''}`}
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default MppTextArea;
