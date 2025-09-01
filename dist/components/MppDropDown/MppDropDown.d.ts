import React from 'react';
import './mpp_dropdown.css';
interface MppDropDownProps<T extends object, K extends keyof T> {
    property: K;
    options: Array<T>;
    onChange: (value: T) => void;
    defaultValue: T | null;
    placeholder: string;
    isDisabled?: boolean;
    textClassname?: string;
    needEmojiFont?: boolean;
    isDropDownEmpty?: boolean;
    emptyValue?: React.ReactNode;
    isOptionDisabled?: (option: T) => boolean;
    highlightCurrentOption?: boolean;
    width?: string;
    identifierKey?: keyof T;
    parentElement?: Element | null;
}
interface HighlightedDropDownProps<T extends object, K extends keyof T> extends MppDropDownProps<T, K> {
    highlightCurrentOption: true;
    identifierKey: keyof T;
}
interface NonHighlightedDropDownProps<T extends object, K extends keyof T> extends MppDropDownProps<T, K> {
    highlightCurrentOption?: false | undefined;
    identifierKey?: keyof T;
}
type MppDropDownPropsComplete<T extends object, K extends keyof T> = HighlightedDropDownProps<T, K> | NonHighlightedDropDownProps<T, K>;
declare const MppDropDown: <T extends object, K extends keyof T>({ placeholder, onChange, options, isDisabled, defaultValue, textClassname, property, needEmojiFont, isDropDownEmpty, emptyValue, isOptionDisabled, highlightCurrentOption, width, identifierKey, parentElement, }: MppDropDownPropsComplete<T, K>) => React.JSX.Element;
export default MppDropDown;
