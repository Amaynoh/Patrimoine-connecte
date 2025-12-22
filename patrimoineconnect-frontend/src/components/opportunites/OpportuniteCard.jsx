import React from 'react';
import { useNavigate } from 'react-router-dom';

const OpportuniteCard = ({ opp }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row gap-6 relative group">

            {/* Badge Type (Haut gauche) */}
            <div className={`absolute top-4 left-0 w-1 h-12 rounded-r-md ${opp.contract_type.includes('Stage') ? 'bg-green-400' :
                opp.contract_type === 'CDI' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>

            {/* Contenu Principal */}
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
                        {/* Bouton Favoris (coeur) */}
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                        {opp.description}
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                        Publié il y a {new Date(opp.created_at).toLocaleDateString()}
                    </div>
                    <button
                        onClick={() => navigate(`/opportunites/${opp.id}`)}
                        className="bg-[#8B5E3C] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6F4E37] transition-colors"
                    >
                        Voir l'offre
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpportuniteCard;
