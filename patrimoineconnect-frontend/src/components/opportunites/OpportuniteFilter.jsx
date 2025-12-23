import React from 'react';

const OpportuniteFilter = ({ contractType, setContractType, location, setLocation }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Filtres de recherche</h2>

            {/* Recherche par mot clé (visuel) */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Mots-clés</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Ex: architecture..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Type de contrat */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Type de contrat</label>
                <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-sm bg-white"
                >
                    <option value="">Tous les types</option>
                    <option value="CDI">CDI</option>
                    <option value="Stage">Stage</option>
                    <option value="Stage (PFE)">Stage (PFE)</option>
                    <option value="Bénévolat">Bénévolat</option>
                </select>
            </div>

            {/* Ville */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">Ville</label>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-sm bg-white"
                >
                    <option value="">Toutes les villes</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fès">Fès</option>
                </select>
            </div>

            <button className="w-full bg-[#8B5E3C] hover:bg-[#6F4E37] text-white font-medium py-2 rounded-lg transition duration-200">
                Appliquer les filtres
            </button>
        </div>
    );
};

export default OpportuniteFilter;
