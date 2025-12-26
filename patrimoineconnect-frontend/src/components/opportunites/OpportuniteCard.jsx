import React from 'react';
import { useNavigate } from 'react-router-dom';

const OpportuniteCard = ({ opp }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row gap-6 relative group">

            <div className={`absolute top-4 left-0 w-1 h-12 rounded-r-md ${opp.contract_type.includes('Stage') ? 'bg-green-400' :
                opp.contract_type === 'CDI' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${opp.contract_type.includes('Stage') ? 'bg-green-100 text-green-700' :
                                opp.contract_type === 'CDI' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                }`}>
                                {opp.contract_type}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{opp.title}</h3>
                            <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                <span className="text-gray-700">{opp.organization || 'Entreprise Confidentielle'}</span>
                                <span>•</span>
                                <span className="text-gray-500 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    {opp.location}
                                </span>
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                        {opp.description}
                    </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="text-xs text-gray-400">
                        Publié il y a {new Date(opp.created_at).toLocaleDateString()}
                    </div>
                    <button
                        onClick={() => navigate(`/opportunites/${opp.id}`)}
                        className="bg-[#8B5E3C] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6F4E37] transition-colors w-full sm:w-auto"
                    >
                        Voir l'offre
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpportuniteCard;
