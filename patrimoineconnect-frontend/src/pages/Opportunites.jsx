import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OpportuniteFilter from '../components/opportunites/OpportuniteFilter';
import OpportuniteCard from '../components/opportunites/OpportuniteCard';

const Opportunites = () => {
    const navigate = useNavigate();
    const [opportunites, setOpportunites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États pour les filtres
    const [contractType, setContractType] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchOpportunites = async () => {
            try {
                // Utilisation de l'URL de l'API (à adapter si variable d'env)
                const response = await axios.get('http://127.0.0.1:8000/api/opportunites');
                setOpportunites(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement des opportunités", err);
                setError("Impossible de charger les opportunités.");
                setLoading(false);
            }
        };

        fetchOpportunites();
    }, []);

    // Filtrage simple côté client
    const filteredOpportunites = opportunites.filter(opp => {
        return (
            (contractType === '' || opp.contract_type === contractType) &&
            (location === '' || opp.location.toLowerCase().includes(location.toLowerCase()))
        );
    });

    if (loading) return <div className="text-center py-20 text-gray-600">Chargement des opportunités...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* SIDEBAR FILTRES */}
                <div className="w-full lg:w-1/4">
                    <OpportuniteFilter
                        contractType={contractType}
                        setContractType={setContractType}
                        location={location}
                        setLocation={setLocation}
                    />
                </div>

                {/* LISTE DES OPPORTUNITÉS */}
                <div className="w-full lg:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Toutes les Opportunités</h1>
                            <p className="text-sm text-gray-500 mt-1">Découvrez nos <span className="font-semibold">{filteredOpportunites.length}</span> offres disponibles</p>
                        </div>
                        <button
                            onClick={() => navigate('/opportunites/create')}
                            className="bg-[#8B5E3C] hover:bg-[#6F4E37] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            <span>+ Poster une opportunité</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredOpportunites.map((opp) => (
                            <OpportuniteCard key={opp.id} opp={opp} />
                        ))}

                        {/* État vide */}
                        {filteredOpportunites.length === 0 && (
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <p className="text-gray-500">Aucune opportunité ne correspond à vos critères.</p>
                                <button
                                    onClick={() => { setContractType(''); setLocation(''); }}
                                    className="mt-4 text-[#8B5E3C] hover:underline"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Opportunites;
