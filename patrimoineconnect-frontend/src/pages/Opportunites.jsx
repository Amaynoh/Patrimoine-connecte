import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import OpportuniteFilter from '../components/opportunites/OpportuniteFilter';
import OpportuniteCard from '../components/opportunites/OpportuniteCard';

const Opportunites = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [opportunites, setOpportunites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const allowedRoles = ['architecte', 'entreprise', 'admin'];
    const userRole = user?.role || user?.user_type || '';
    const canCreate = allowedRoles.includes(userRole);
    const [contractType, setContractType] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchOpportunites = async () => {
            try {
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
                <div className="w-full lg:w-1/4">
                    <OpportuniteFilter
                        contractType={contractType}
                        setContractType={setContractType}
                        location={location}
                        setLocation={setLocation}
                    />
                </div>
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Toutes les Opportunités</h1>
                            <p className="text-sm text-gray-500 mt-1">Découvrez nos <span className="font-semibold">{filteredOpportunites.length}</span> offres disponibles</p>
                        </div>
                        {canCreate && (
                            <button
                                onClick={() => navigate('/opportunites/create')}
                                className="bg-[#8B5E3C] hover:bg-[#6F4E37] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                            >
                                <span>+ Poster une opportunité</span>
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {filteredOpportunites.map((opp) => (
                            <OpportuniteCard key={opp.id} opp={opp} />
                        ))}
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
