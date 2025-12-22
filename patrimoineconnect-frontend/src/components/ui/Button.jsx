import React from 'react';

/**
 * Composant Button réutilisable
 */
const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = ''
}) => {
    // Styles selon le variant
    const variants = {
        primary: 'bg-[#1e6b4f] hover:bg-[#155a42] text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
        outline: 'border-2 border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373]/10',
        warning: 'bg-[#D4A373] hover:bg-[#c4935f] text-white'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
