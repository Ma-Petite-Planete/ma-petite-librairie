import React, { KeyboardEventHandler, ReactNode } from 'react';
import './mpp_input.css';
export interface ValidationCondition {
    condition: (value: string) => boolean;
    message: string;
}
interface MppInputTextProps {
    placeholder: string;
    value: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    prefixIcon?: ReactNode;
    needCounter?: boolean;
    maxCharacters?: number;
    validationConditions?: Array<ValidationCondition>;
    onChange: (value: string) => void;
    onClickIcon?: (value: string) => void;
    readOnly?: boolean;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    isPassword?: boolean;
    errorMessage?: string;
    autoComplete?: string;
    canClearField?: boolean;
}
declare const MppInput: React.FC<MppInputTextProps>;
export default MppInput;
