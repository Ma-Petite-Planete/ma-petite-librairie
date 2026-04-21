import { RefObject, useEffect, useRef } from 'react';

const useClickOutside = (
  elementRef: RefObject<Element>,
  callback: () => void
) => {
  const callbackRef = useRef<() => void>();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        callbackRef.current?.();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [elementRef]);
};
export default useClickOutside;
