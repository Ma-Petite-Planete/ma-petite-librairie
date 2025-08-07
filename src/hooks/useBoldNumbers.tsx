import React, { useMemo } from 'react';

function useBoldTaggedText(text: string) {
  return useMemo<React.ReactNode[]>(() => {
    const parts = text.split(/(%\/.*?\/%)/g);

    return parts.map((part, i) => {
      const match = part.match(/^%\/(.*?)\/%$/);
      if (match) {
        return <strong key={i}>{match[1]}</strong>;
      }

      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  }, [text]);
}

export default useBoldTaggedText;
