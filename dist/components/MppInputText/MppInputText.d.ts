import React from 'react';
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
declare const MppInputText: React.FC<MppInputTextProps>;
export default MppInputText;
