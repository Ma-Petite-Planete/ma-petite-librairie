import { RefObject, useEffect, useRef } from 'react';

const useClickOutside = (
  elementRef: RefObject<Element>,
  callback: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      !elementRef.current.contains(event.target as Node) &&
      callbackRef.current
    ) {
      callbackRef.current();
    }
  };
  const callbackRef = useRef<() => void>();
  callbackRef.current = callback;
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
};
export default useClickOutside;
