import React, { useState, useRef } from 'react';
import './mpp_multi_dropdown_filter.css';
import useClickOutside from '../../hooks/clickOutside';
import { MppIcons } from '../../utils/MppIcons';
import { Identifier } from '../../types_and_demo_data/identifier';
import MppCheckbox from '../MppCheckBox/MppCheckbox';

interface MppCategoryMultiFilterProps {
  categories: Array<Identifier>;
  selectedCategories: Array<Identifier>;
  onChange: (selected: Array<Identifier>) => void;
  placeholder: string;
}

/**
 * CategoryMultiFilter rends une liste de catégories multi-sélectionnables dans un dropdown.
 */
const MppCategoryMultiFilter: React.FC<MppCategoryMultiFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
  placeholder = 'Sélectionner...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onChange([]);
  };

  const toggleCategory = (category: Identifier) => {
    const exists = selectedCategories.some((cat) => cat.id === category.id);
    const newSelection = exists
      ? selectedCategories.filter((cat) => cat.id !== category.id)
      : [...selectedCategories, category];
    onChange(newSelection);
  };

  const displayLabel =
    selectedCategories.length > 0
      ? selectedCategories.map((cat) => cat.name).join(', ')
      : placeholder;

      const isNotEmpty = selectedCategories.length > 0;

  return (
    <div
      ref={containerRef}
      className="multi-filters-custom-select dropdown-multi-filters-dropdown"
    >
      <button
        type="button"
        className={`multi-filters-select-button ${isOpen && isNotEmpty ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={`label ${isNotEmpty ? "" : "empty_values"}`}>{displayLabel}</span>
        <div className="dropdown_icon_wrapper">
          {selectedCategories.length > 0 && (
            <span
              className="dropdown_clear_icon"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              <MppIcons.inputClose />
            </span>
          )}
          <span className={`arrow ${isOpen && isNotEmpty ? 'arrow--open' : ''}`} />
        </div>
      </button>

      {isOpen && isNotEmpty && (
        <ul className="multi-filters-select-dropdown">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategories.some((c) => c.id === cat.id);
            return (
              <>
                {idx > 0 && (
                  <div className="select_multifilter_dropdown_divider" />
                )}
                <li
                  className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(cat)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') toggleCategory(cat);
                  }}
                >
                  <MppCheckbox
                    checked={isSelected}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span className="item-label">{cat.name}</span>
                </li>
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MppCategoryMultiFilter;
