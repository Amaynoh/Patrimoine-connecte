import React from 'react';

const TYPES = [
    { id: 'emploi', label: 'Emploi', icon: '💼' },
    { id: 'projet', label: 'Projet', icon: '🏗️' },
    { id: 'collaboration', label: 'Collaboration', icon: '🤝' }
];

const CONTRATS = [
    { id: 'CDI', label: 'CDI', icon: '📋' },
    { id: 'Stage', label: 'Stage', icon: '🎓' },
    { id: 'Stage (PFE)', label: 'Stage (PFE)', icon: '🎯' },
    { id: 'Bénévolat', label: 'Bénévolat', icon: '❤️' }
];

const VILLES = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger'];

const OpportuniteForm = ({ formData, onChange, onSubmit, loading, error, submitLabel }) => {
    const handleChange = (e) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };

    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] text-sm";

    return (
        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Titre *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Restauration de la Mosquée Koutoubia" className={inputClass} required />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Type *</label>
                <div className="grid grid-cols-3 gap-3">
                    {TYPES.map((item) => (
                        <div key={item.id} onClick={() => onChange({ ...formData, type: item.id })}
                            className={`cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 ${formData.type === item.id ? 'border-[#1e3a8a] bg-[#1e3a8a]/5 ring-1 ring-[#1e3a8a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <span>{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Contrat *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {CONTRATS.map((item) => (
                        <div key={item.id} onClick={() => onChange({ ...formData, contract_type: item.id })}
                            className={`cursor-pointer border rounded-lg p-2 flex items-center justify-center gap-1 ${formData.contract_type === item.id ? 'border-[#C17A56] bg-[#C17A56]/10 ring-1 ring-[#C17A56]' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <span>{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Localisation *</label>
                <select name="location" value={formData.location} onChange={handleChange} className={inputClass} required>
                    <option value="">Sélectionnez une ville</option>
                    {VILLES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Décrivez votre opportunité..." className={inputClass} required />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Missions (une par ligne)</label>
                <textarea name="missions" value={formData.missions || ''} onChange={handleChange} rows="3" placeholder="- Mission 1&#10;- Mission 2" className={inputClass} />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Compétences (une par ligne)</label>
                <textarea name="competences" value={formData.competences || ''} onChange={handleChange} rows="3" placeholder="Compétence 1&#10;Compétence 2" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Budget</label>
                    <input type="text" name="budget" value={formData.budget || ''} onChange={handleChange} placeholder="Ex: 10 000 MAD" className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date limite</label>
                    <input type="date" name="deadline" value={formData.deadline || ''} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div className="pt-4 flex justify-end border-t">
                <button type="submit" disabled={loading}
                    className={`bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1e40af] ${loading ? 'opacity-70' : ''}`}>
                    {loading ? 'Chargement...' : submitLabel}
                </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
    );
};

export default OpportuniteForm;
