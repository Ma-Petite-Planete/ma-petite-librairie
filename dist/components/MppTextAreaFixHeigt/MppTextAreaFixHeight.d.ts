import React from 'react';
import './mpp_text_area_fix_height.css';
/**
 * Composant MppTextAreaFixHeight
 *
 * Ce composant rend une `<textarea>` à hauteur fixe, avec une gestion interne du focus
 * et des changements de valeur. Il conserve son propre état local pour l’affichage et
 * remonte les modifications via un callback `onChange`.
 *
 * @param {string} placeholder
 *   Texte affiché quand la zone est vide.
 * @param {string} value
 *   Valeur contrôlée du textarea. Le composant synchronise son état interne sur cette prop.
 * @param {(value: string) => void} [onChange]
 *   Callback appelé à chaque frappe avec la nouvelle valeur.
 * @param {boolean} [readOnly=false]
 *   Met le textarea en lecture seule si `true`.
 * @param {string} fixHeight
 *   Hauteur CSS (par ex. `"150px"`) appliquée au container pour fixer la taille.
 * @param {string} [id]
 *   Identifiant HTML du textarea. Si non fourni, un ID unique est généré via `useId()`.
 *
 * @example
 * ```tsx
 * const MyForm = () => {
 *   const [text, setText] = useState("");
 *
 *   return (
 *     <MppTextAreaFixHeight
 *       placeholder="Décrivez votre idée…"
 *       value={text}
 *       onChange={setText}
 *       fixHeight="200px"
 *     />
 *   );
 * };
 * ```
 */
interface MppTextAreaFixHeightProps {
    placeholder: string;
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    fixHeight: string;
    id?: string;
}
declare const MppTextAreaFixHeight: React.FC<MppTextAreaFixHeightProps>;
export default MppTextAreaFixHeight;
