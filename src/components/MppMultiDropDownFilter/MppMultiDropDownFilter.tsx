import React, { useState, useRef } from 'react';
import './mpp_multi_dropdown_filter.css';
import useClickOutside from '../../hooks/clickOutside';
import { MppIcons } from '../../utils/MppIcons';
import { Identifier } from '../../types_and_demo_data/identifier';


interface CategoryMultiFilterProps {
  categories: Identifier[];
  selectedCategories: Identifier[];
  onChange: (selected: Identifier[]) => void;
  placeholder: string;
}

/**
 * CategoryMultiFilter rends une liste de catégories multi-sélectionnables dans un dropdown.
 */
const CategoryMultiFilter: React.FC<CategoryMultiFilterProps> = ({
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
    const exists = selectedCategories.some(cat => cat.id === category.id);
    const newSelection = exists
      ? selectedCategories.filter(cat => cat.id !== category.id)
      : [...selectedCategories, category];
    onChange(newSelection);
  };

  const displayLabel =
    selectedCategories.length > 0
      ? selectedCategories.map(cat => cat.name).join(', ')
      : placeholder;

  return (
    <div ref={containerRef} className={`custom_select dropdown-multi-filters-dropdown`}
    >
      <button
        type="button"
        className={`select_button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="label">{displayLabel}</span>
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
          <span className={`arrow ${isOpen ? 'arrow--open' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <ul className="select_dropdown">
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              {idx > 0 && <div className="select_multifilter_dropdown_divider" />}
              <li
                className={`dropdown-item ${selectedCategories.some(c => c.id === cat.id) ? 'selected' : ''
                  }`}
                onClick={() => toggleCategory(cat)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter') toggleCategory(cat);
                }}
              >
                <input type="checkbox" readOnly checked={
                  selectedCategories.some(c => c.id === cat.id)}
                />
                <span className="item-label">
                  {cat.name}
                </span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryMultiFilter;
