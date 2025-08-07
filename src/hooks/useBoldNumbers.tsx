import React, { useMemo } from 'react';

function useBoldBracedNumbers(text: string) {
  return useMemo<React.ReactNode[]>(() => {
    const parts = text.split(/(\{\d+\})/g);

    return parts.map((part, i) => {
      const match = part.match(/^\{(\d+)\}$/);
      if (match) {
        return <strong key={i}>{match[1]}</strong>;
      }

      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  }, [text]);
}

export default useBoldBracedNumbers;
