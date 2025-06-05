import React from 'react';
import './mpp_dropdown.css';
interface MppDropDownProps<T extends object, K extends keyof T> {
    property: K;
    options: Array<T>;
    onChange: (value: T | T[] | undefined) => void;
    defaultValue: T;
    defaultValues?: T[];
    placeholder: string;
    isDisabled?: boolean;
    textClassname?: string;
    needEmojiFont?: boolean;
    isDropDownEmpty?: boolean;
    emptyValue?: React.ReactNode;
    canClearField?: boolean;
    clearValue?: T | T[];
}
declare const MppDropDown: <T extends object, K extends keyof T>({ placeholder, onChange, options, isDisabled, defaultValue, defaultValues, textClassname, property, needEmojiFont, isDropDownEmpty, emptyValue, canClearField, clearValue, }: MppDropDownProps<T, K>) => React.JSX.Element;
export default MppDropDown;
