import React from 'react';

const OpportuniteSkills = ({ competences }) => {
    if (!competences || competences.length === 0) return null;

    return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compétences Requises</h2>
            <div className="flex flex-wrap gap-2">
                {competences.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default OpportuniteSkills;
