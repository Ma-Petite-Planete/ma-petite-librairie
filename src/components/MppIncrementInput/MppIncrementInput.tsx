import React, { useState, useEffect } from 'react';
import './mpp_increment_input.css';

interface MppIncrementInputProps {
  value: number;
  onChange: (newValue: number) => void;
  maxIncrement: number;
}

/**
 * Le composant MppIncrementInput fournit un contrôle numérique avec boutons d’incrémentation et décrmentation,
 * ainsi qu’un champ pour saisir la valeur manuellement.
 *
 * @param {MppIncrementInputProps} props - Les propriétés du composant.
 * @param {number} props.value - La valeur actuelle affichée et contrôlée par le composant.
 * @param {(newValue: number) => void} props.onChange - Fonction de rappel invoquée avec la nouvelle valeur
 *        dès qu’elle change (via les boutons ou la saisie manuelle).
 * @param {number} props.maxIncrement - La valeur maximale autorisée (le bouton + et la saisie sont clampés entre 0 et maxIncrement).
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import { MppIncrementInput } from './MppIncrementInput';
 *
 * const ExampleComponent = () => {
 *   const [quantity, setQuantity] = useState(0);
 *
 *   return (
 *     <MppIncrementInput
 *       value={quantity}
 *       onChange={setQuantity}
 *       maxIncrement={100}
 *     />
 *   );
 * };
 * ```
 */

export const MppIncrementInput: React.FC<MppIncrementInputProps> = ({
  value,
  onChange,
  maxIncrement,
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const commitChange = () => {
    let n = parseInt(inputValue, 10);
    if (isNaN(n)) {
      setInputValue(value.toString());
      return;
    }
    n = Math.max(0, Math.min(maxIncrement, n));

    onChange(n);
    setInputValue(n.toString());
  };

  return (
    <div className="increment_input_background text_body">
      <button
        className="increment_button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
      >
        −
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={maxIncrement.toString().length}
        className="increment_value increment_value_input"
        value={inputValue}
        onChange={(e) => {
          const digitsOnly = e.target.value.replace(/\D/g, '');
          setInputValue(digitsOnly);
        }}
        onBlur={commitChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
          }
        }}
        min={0}
        max={maxIncrement}
      />

      <button
        className="increment_button"
        onClick={() => onChange(Math.min(maxIncrement, value + 1))}
        disabled={value >= maxIncrement}
      >
        +
      </button>
    </div>
  );
};
