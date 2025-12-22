import React from 'react';

const OpportuniteDescription = ({ description, missions }) => {
    return (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description du Projet</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
            </div>

            {missions && missions.length > 0 && (
                <>
                    <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">Objectifs de la Mission</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        {missions.map((mission, index) => (
                            <li key={index}>{mission}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default OpportuniteDescription;
