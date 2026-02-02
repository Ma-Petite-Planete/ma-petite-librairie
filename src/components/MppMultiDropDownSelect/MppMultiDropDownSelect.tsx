import React, { useState, useRef, useEffect, useCallback } from 'react';
import './mpp_multi_dropdown_select.css';
import useClickOutside from '../../hooks/clickOutside';
import { Identifier } from '../../types_and_demo_data/identifier';
import MppCheckbox from '../MppCheckBox/MppCheckbox';

interface MppDropDownSection {
  title: string;
  items: Array<Identifier>;
}
interface MppMultiDropDownSelectProps {
  data: MppDropDownSection[];
  onSelect: (selected: Identifier[]) => void;
  selectedValues: Identifier[];
  isOpenByDefault: boolean;
  placeholderOnEmpty: string;
}

const MppMultiDropDownSelect: React.FC<MppMultiDropDownSelectProps> = ({
  data,
  onSelect,
  selectedValues,
  isOpenByDefault,
  placeholderOnEmpty,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const displayLabel =
    selectedValues.length > 0
      ? selectedValues.map((item) => item.name).join(', ')
      : placeholderOnEmpty;

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="multi_dropdown_select_wrapper">
      <button
        type="button"
        className={`multi_filters_select_button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`multi_dropdown_select_label ${selectedValues.length > 0 ? '' : 'empty_values'}`}
        >
          {displayLabel}
        </span>
        <div className="dropdown_icon_wrapper">
          <span className={`arrow ${isOpen ? 'arrow--open' : ''}`} />
        </div>
      </button>
      <div className="multi_dropdown_select_container">
        {isOpen &&
          data.map((value) => (
            <MppDropDownSelect
              openByDefault={isOpenByDefault}
              key={value.title}
              sectionTitle={value.title}
              values={value.items}
              selectedValues={selectedValues}
              onChange={onSelect}
              placeholder={`Sélectionner ${value.title}...`}
            />
          ))}
      </div>
    </div>
  );
};

export default MppMultiDropDownSelect;

interface MppDropDownSelectProps {
  sectionTitle: string;
  values: Array<Identifier>;
  selectedValues: Array<Identifier>;
  onChange: (selected: Identifier[]) => void;
  placeholder: string;
  openByDefault: boolean;
}

const MppDropDownSelect: React.FC<MppDropDownSelectProps> = ({
  values,
  selectedValues,
  onChange,
  sectionTitle,
  openByDefault,
}) => {
  const [isOpen, setIsOpen] = useState(openByDefault);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAllSelect = useCallback(() => {
    console.log('handleAllSelect called');
    const allValuesSelected = values.every((value) => {
      return selectedValues.some((selected) => selected.id === value.id);
    });
    console.log(
      '🚀 ~ MppDropDownSelect ~ allValuesSelected:',
      allValuesSelected
    );

    if (allValuesSelected) {
      const newSelectedValues = selectedValues.filter(
        (v) => !values.some((x) => x.id === v.id)
      );
      onChange(newSelectedValues);
      return;
    } else {
      const newSelectedValues = [...selectedValues, ...values];
      onChange(newSelectedValues);
      return;
    }
  }, [onChange, selectedValues, values]);

  useEffect(() => {
    const allSelected =
      values.length > 0 &&
      values.every((value) =>
        selectedValues.some((selected) => selected.id === value.id)
      );
    console.log('🚀 ~ MppDropDownSelect useeffect ~ allSelected:', allSelected);
    setIsAllSelected(allSelected);
  }, [selectedValues, values]);

  if (values.length === 0) return null;

  const handleSingleSelect = (selected: Identifier) => {
    const foundValue = selectedValues.find((value) => value.id === selected.id);
    if (foundValue) {
      const newSelectedValues = selectedValues.filter(
        (value) => value.id !== selected.id
      );
      onChange(newSelectedValues);
      return;
    } else {
      const newSelectedValues = [...selectedValues, selected];
      onChange(newSelectedValues);
    }
  };

  return (
    <div ref={containerRef} className="multi_select">
      <button
        type="button"
        className={`multi_select_button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="dropdown_icon_wrapper">
          <p className="text_body_sb">{sectionTitle}</p>
          <span className={`arrow ${isOpen ? 'arrow--open' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <ul className="multi_select_dropdown">
          <li
            className="dropdown_item text_body"
            onClick={() => {
              handleAllSelect();
            }}
          >
            <MppCheckbox
              checked={isAllSelected}
              onChange={() => handleAllSelect()}
            />
            <span className="item_label">{'tout selectionné'}</span>
          </li>
          {values.map((value) => {
            const isSelected =
              selectedValues.some(
                (selectedValue) => selectedValue.id === value.id
              ) || isAllSelected;
            return (
              <li
                key={value.id}
                className={`dropdown_item text_body`}
                onClick={() => handleSingleSelect(value)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSingleSelect(value);
                }}
              >
                <MppCheckbox
                  checked={isSelected}
                  onChange={() => handleSingleSelect(value)}
                />
                <span className="item_label">{value.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
