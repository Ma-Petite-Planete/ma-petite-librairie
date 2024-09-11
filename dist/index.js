import React from 'react';

// src/components/Button.tsx
const Button = ({ label, onClick }) => {
    return (React.createElement("button", {
        onClick: onClick, style: {
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }
    }, label));
};

export { Button };
