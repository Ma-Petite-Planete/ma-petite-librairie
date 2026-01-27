import React, { useState, useRef } from 'react';
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
  onSelect: (selected: Identifier) => void;
  selectedValues: Identifier[]
}

const MppMultiDropDownSelect: React.FC<MppMultiDropDownSelectProps> = ({
  data,
  onSelect,
  selectedValues
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayLabel =
    selectedValues.length > 0
      ? selectedValues.map((cat) => cat.name).join(', ')
      : 'test';

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="multi_dropdown_select_wrapper">
      <button
        type="button"
        className={`multi_filters_select_button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={`multi_filters_label ${selectedValues.length > 0 ? '' : 'empty_values'}`}
        >
          {displayLabel}
        </span>
        <div className="dropdown_icon_wrapper">
          <span className={`arrow ${isOpen ? 'arrow--open' : ''}`} />
        </div>
      </button>

      {isOpen &&
        data.map((value) => (
          <MppDropDownSelect
            key={value.title}
            sectionTitle={value.title}
            values={value.items}
            selectedValues={selectedValues}
            onChange={onSelect}
            placeholder={`Sélectionner ${value.title}...`}
          />
        ))}
    </div>
  );
};

export default MppMultiDropDownSelect;

interface MppDropDownSelectProps {
  sectionTitle: string;
  values: Array<Identifier>;
  selectedValues: Array<Identifier>;
  onChange: (selected: Identifier) => void;
  placeholder: string;
}

const MppDropDownSelect: React.FC<MppDropDownSelectProps> = ({
  values,
  selectedValues,
  onChange,
  sectionTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (values.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="multi_select dropdown_multi_filters_dropdown"
    >
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
          {values.map((value) => {
            const allSelected = values.every((val) => {
              console.log("🚀 ~ MppDropDownSelect ~ val:", val)
              console.log("🚀 ~ MppDropDownSelect ~ selectedValues:", selectedValues)
              return selectedValues.includes(val);
            });
            console.log("🚀 ~ MppDropDownSelect ~ allSelected:", allSelected)
            const isSelected = selectedValues.some((selectedValue) => selectedValue.id === value.id) || allSelected;
            console.log("🚀 ~ MppDropDownSelect ~ isSelected:", isSelected)
            return (
              <li
                key={value.id}
                className={`dropdown_item ${isSelected ? 'selected' : ''} text_body`}
                onClick={() => onChange(value)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onChange(value);
                }}
              >
                <MppCheckbox checked={isSelected} onChange={null} />
                <span className="item_label">{value.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
