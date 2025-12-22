import React from 'react';

/**
 * Composant SelectField réutilisable pour les listes déroulantes
 */
const SelectField = ({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false
}) => {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] bg-white transition-all text-sm cursor-pointer"
            >
                <option value="">Sélectionner...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
