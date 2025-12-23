import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreateOpportunite = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        type: 'emploi',
        location: '',
        description: '',
        organization: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setLoading(true);
        setError(null);

        try {
            const missionsArray = formData.missions ? formData.missions.split('\n').filter(item => item.trim() !== '') : [];
            const competencesArray = formData.competences ? formData.competences.split('\n').filter(item => item.trim() !== '') : [];

            await api.post('/opportunites', {
                ...formData,
                organization: formData.organization || 'Particulier', // Valeur par défaut si vide
                missions: missionsArray,
                competences: competencesArray
            });
            // Redirection vers la liste
            navigate('/opportunites');
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Erreur lors de la publication.";
            // Si erreur de validation (422)
            if (err.response?.status === 422) {
                const errors = Object.values(err.response.data.errors).flat().join(', ');
                setError(`Données invalides : ${errors}`);
            }
            // Si erreur d'autorisation (403)
            else if (err.response?.status === 403) {
                setError("Vous n'êtes pas autorisé à publier (Réservé aux Architectes/Entreprises).");
            }
            else {
                setError(message);
            }
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header Navigation */}
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Retour
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e3a8a]">Publier une Nouvelle Opportunité</h1>
                    <p className="text-gray-500 mt-2">Créez une annonce pour partager vos projets et opportunités avec la communauté PatrimoineConnect</p>
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

                    {/* Type d'opportunité (Cartes Radio) */}
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
                            placeholder="Décrivez votre opportunité, les objectifs, les exigences et les bénéfices attendus..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Missions (Nouvel ajout) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Objectifs de la Mission (un par ligne)
                        </label>
                        <textarea
                            name="missions"
                            value={formData.missions || ''}
                            onChange={handleChange}
                            rows="4"
                            placeholder="- Réaliser un diagnostic...&#10;- Élaborer un plan..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Séparez chaque objectif par une nouvelle ligne.</p>
                    </div>

                    {/* Compétences (Nouvel ajout) */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Compétences Requises (une par ligne)
                        </label>
                        <textarea
                            name="competences"
                            value={formData.competences || ''}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Architecture du patrimoine&#10;Restauration..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Séparez chaque compétence par une nouvelle ligne.</p>
                    </div>

                    {/* Budget et Date limite */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Budget */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Budget estimé
                            </label>
                            <input
                                type="text"
                                name="budget"
                                value={formData.budget || ''}
                                onChange={handleChange}
                                placeholder="Ex: 10 000 - 15 000 MAD"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm"
                            />
                        </div>

                        {/* Date limite */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Date limite
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Boutons Actions */}
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
                            disabled={loading}
                            className={`bg-[#1e3a8a] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-[#1e40af] transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Publication...' : "Publier l'opportunité"}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                </form>

                {/* Footer Tips - Version statique pour l'UI */}
                <div className="mt-8 bg-[#fdf6b2] rounded-lg p-6 flex gap-4 text-[#92400e]">
                    <div className="text-2xl">💡</div>
                    <div className="text-sm">
                        <h4 className="font-bold mb-2">Conseils pour une publication réussie</h4>
                        <ul className="list-disc pl-4 space-y-1 opacity-90">
                            <li>Rédigez un titre clair et accrocheur</li>
                            <li>Détaillez les compétences recherchées</li>
                            <li>Mentionnez les bénéfices et la rémunération</li>
                            <li>Ajoutez des mots-clés pertinents pour améliorer la visibilité</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateOpportunite;
