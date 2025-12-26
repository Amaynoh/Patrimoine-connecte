import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';

const EditOpportunite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: '',
        type: 'emploi',
        contract_type: 'CDI',
        location: '',
        description: '',
        organization: '',
        missions: '',
        competences: '',
        budget: '',
        deadline: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Charger les données de l'opportunité existante
    useEffect(() => {
        const fetchOpportunite = async () => {
            try {
                const response = await api.get(`/opportunites/${id}`);
                const data = response.data;

                // Vérifier que l'utilisateur est le propriétaire
                if (data.user_id !== user?.id) {
                    setError("Vous n'êtes pas autorisé à modifier cette opportunité.");
                    setLoading(false);
                    return;
                }

                // Convertir les tableaux en texte (un élément par ligne)
                const missionsText = Array.isArray(data.missions)
                    ? data.missions.join('\n')
                    : data.missions || '';
                const competencesText = Array.isArray(data.competences)
                    ? data.competences.join('\n')
                    : data.competences || '';

                setFormData({
                    title: data.title || '',
                    type: data.type || 'emploi',
                    contract_type: data.contract_type || 'CDI',
                    location: data.location || '',
                    description: data.description || '',
                    organization: data.organization || '',
                    missions: missionsText,
                    competences: competencesText,
                    budget: data.budget || '',
                    deadline: data.deadline || '',
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement de l'opportunité.");
                setLoading(false);
            }
        };

        fetchOpportunite();
    }, [id, user?.id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTypeChange = (newType) => {
        setFormData({ ...formData, type: newType });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Convertir les missions et compétences en tableaux
            const missionsArray = formData.missions
                ? formData.missions.split('\n').filter(item => item.trim() !== '')
                : [];
            const competencesArray = formData.competences
                ? formData.competences.split('\n').filter(item => item.trim() !== '')
                : [];

            await api.put(`/opportunites/${id}`, {
                ...formData,
                missions: missionsArray,
                competences: competencesArray
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Erreur lors de la modification.";
            if (err.response?.status === 422) {
                const errors = Object.values(err.response.data.errors).flat().join(', ');
                setError(`Données invalides : ${errors}`);
            } else if (err.response?.status === 403) {
                setError("Vous n'êtes pas autorisé à modifier cette opportunité.");
            } else {
                setError(message);
            }
            setSubmitting(false);
        }
    };

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    // Affichage en cas d'erreur d'autorisation
    if (error && loading === false && !formData.title) {
        return (
            <div className="bg-[#FAF7F2] min-h-screen py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600 font-medium">{error}</p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="mt-4 bg-[#1e3a8a] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1e40af]"
                        >
                            Retour au Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Retour
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e3a8a]">Modifier l'Opportunité</h1>
                    <p className="text-gray-500 mt-2">Mettez à jour les informations de votre opportunité</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 space-y-8">
                    {/* Titre */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Titre de l'opportunité <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ex: Restauration de la Mosquée Koutoubia"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm"
                            required
                        />
                    </div>

                    {/* Type d'opportunité */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Type d'opportunité <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'emploi', label: 'Emploi', icon: '💼' },
                                { id: 'projet', label: 'Projet', icon: '🏗️' },
                                { id: 'collaboration', label: 'Collaboration', icon: '🤝' }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleTypeChange(item.id)}
                                    className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center gap-3 transition-all ${formData.type === item.id
                                        ? 'border-[#1e3a8a] bg-[#1e3a8a]/5 text-[#1e3a8a] ring-1 ring-[#1e3a8a]'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-semibold text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Type de contrat */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Type de contrat <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { id: 'CDI', label: 'CDI', icon: '📋' },
                                { id: 'Stage', label: 'Stage', icon: '🎓' },
                                { id: 'Stage (PFE)', label: 'Stage (PFE)', icon: '🎯' },
                                { id: 'Bénévolat', label: 'Bénévolat', icon: '❤️' }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setFormData({ ...formData, contract_type: item.id })}
                                    className={`cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${formData.contract_type === item.id
                                        ? 'border-[#C17A56] bg-[#C17A56]/10 text-[#C17A56] ring-1 ring-[#C17A56]'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Localisation */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Localisation <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] bg-white transition-all text-sm"
                            required
                        >
                            <option value="">Sélectionnez une ville</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Fès">Fès</option>
                            <option value="Tanger">Tanger</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Description détaillée <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Décrivez votre opportunité..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Missions */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Objectifs de la Mission (un par ligne)
                        </label>
                        <textarea
                            name="missions"
                            value={formData.missions}
                            onChange={handleChange}
                            rows="4"
                            placeholder="- Réaliser un diagnostic...&#10;- Élaborer un plan..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Séparez chaque objectif par une nouvelle ligne.</p>
                    </div>

                    {/* Compétences */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Compétences Requises (une par ligne)
                        </label>
                        <textarea
                            name="competences"
                            value={formData.competences}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Architecture du patrimoine&#10;Restauration..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Séparez chaque compétence par une nouvelle ligne.</p>
                    </div>

                    {/* Budget et Date limite */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Budget estimé
                            </label>
                            <input
                                type="text"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="Ex: 10 000 - 15 000 MAD"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Date limite
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-gray-500 font-medium hover:text-gray-800 px-4 py-2"
                        >
                            ✕ Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`bg-[#1e3a8a] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-[#1e40af] transition-all transform hover:-translate-y-0.5 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? 'Enregistrement...' : "Enregistrer les modifications"}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default EditOpportunite;
