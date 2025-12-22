import React from 'react';

/**
 * Composant TextArea réutilisable pour les zones de texte
 */
const TextArea = ({
    label,
    name,
    value,
    onChange,
    placeholder = '',
    rows = 4,
    required = false
}) => {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm resize-none bg-white"
            />
        </div>
    );
};

export default TextArea;
