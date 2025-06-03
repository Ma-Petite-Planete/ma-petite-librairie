// src/components/MppCheckboxTable.tsx
"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import "./mpp_checkbox.css"; // même CSS que MppCheckbox

interface MppCheckboxTableProps {
  /** L’état “coché ou non” que TanStack Table nous passe */
  checked: boolean;
  /** État “trois états” (dash) pour TanStack Table */
  indeterminate?: boolean;
  /** Callback à appeler quand l’utilisateur clique, on retransmet à TanStack Table */
  onChange: (newChecked: boolean) => void;
  /** Optionnel : si on veut un style “en-tête” (main) ou “cellule” */
  isTableHeader?: boolean;
}

/**
 * Ce composant est un wrapper de MppCheckbox : 
 * - On supprime le useState interne
 * - On accepte checked, indeterminate et onChange
 * - On expose un ref pour permettre à TanStack de définir `input.indeterminate`
 */
export const MppCheckboxTable = forwardRef<
  HTMLInputElement,
  MppCheckboxTableProps
>(
  ({ checked, indeterminate = false, onChange, isTableHeader = false }, ref) => {
    // On combine le ref passé par TanStack et notre ref interne
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? internalRef) as React.RefObject<HTMLInputElement>;

    // À chaque render, TanStack veut pouvoir régler “indeterminate”
    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <div className="checkbox_container">
        <div className="checkbox_container_checkbox">
          <label
            className={
              isTableHeader
                ? "checkbox_container_label main_checkbox"
                : "checkbox_container_label secondary_checkbox"
            }
            htmlFor={`checkbox_table_${isTableHeader ? "header" : Math.random()}`}
          >
            <input
              ref={resolvedRef}
              type="checkbox"
              className="checkbox_container_input"
              id={`checkbox_table_${isTableHeader ? "header" : Math.random()}`}
              checked={checked}
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    );
  }
);

MppCheckboxTable.displayName = "MppCheckboxTable";
