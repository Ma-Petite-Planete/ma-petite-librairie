import React, { useMemo } from 'react';

function useBoldNumbers(text: string) {
  return useMemo<React.ReactNode[]>(() => {
    const parts = text.split(/(\s+)/g);

    return parts.map((part, i) =>
      /^\d+$/.test(part) ? (
        <strong key={i}>{part}</strong>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  }, [text]);
}

export default useBoldNumbers;
