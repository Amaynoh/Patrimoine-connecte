import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OpportuniteHeader from '../components/opportunites/detail/OpportuniteHeader';
import OpportuniteDescription from '../components/opportunites/detail/OpportuniteDescription';
import OpportuniteSkills from '../components/opportunites/detail/OpportuniteSkills';
import OpportuniteSidebar from '../components/opportunites/detail/OpportuniteSidebar';

const OpportuniteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [opportunite, setOpportunite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpportunite = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/opportunites/${id}`);
                setOpportunite(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement de l'opportunité", err);
                setError("Impossible de charger les détails de l'opportunité.");
                setLoading(false);
            }
        };

        if (id) {
            fetchOpportunite();
        }
    }, [id]);

    if (loading) return <div className="text-center py-20 text-gray-600">Chargement...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!opportunite) return <div className="text-center py-20">Opportunité introuvable.</div>;

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Retour
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        <OpportuniteHeader opp={opportunite} />
                        <OpportuniteDescription description={opportunite.description} missions={opportunite.missions} />
                        <OpportuniteSkills competences={opportunite.competences} />
                    </div>
                    <div className="w-full lg:w-1/3">
                        <OpportuniteSidebar user={opportunite.user} opportuniteId={opportunite.id} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OpportuniteDetail;
