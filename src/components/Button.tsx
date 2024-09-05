// src/components/Button.tsx

import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
}
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            {label}
        </button>
    );
};