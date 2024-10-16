import React from 'react';
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
declare const MppTextArea: React.FC<MppTextAreaProps>;
export default MppTextArea;
