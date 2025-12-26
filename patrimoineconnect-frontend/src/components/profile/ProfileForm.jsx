const ProfileForm = ({ formData, onChange, onSubmit, email, saving, error, success, onCancel }) => {

    const cityOptions = [
        { value: 'Casablanca', label: 'Casablanca' },
        { value: 'Rabat', label: 'Rabat' },
        { value: 'Marrakech', label: 'Marrakech' },
        { value: 'Fès', label: 'Fès' },
        { value: 'Tanger', label: 'Tanger' },
        { value: 'Salé', label: 'Salé' },
        { value: 'Meknès', label: 'Meknès' },
        { value: 'Agadir', label: 'Agadir' }
    ];

    const specialtyOptions = [
        { value: 'Poterie traditionnelle', label: 'Poterie traditionnelle' },
        { value: 'Zellige', label: 'Zellige' },
        { value: 'Menuiserie', label: 'Menuiserie' },
        { value: 'Ferronnerie', label: 'Ferronnerie' },
        { value: 'Sculpture sur plâtre', label: 'Sculpture sur plâtre' },
        { value: 'Tapis et tissage', label: 'Tapis et tissage' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Restauration', label: 'Restauration' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                👤 Informations personnelles
            </h2>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Votre nom"
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-white"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Ville <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] bg-white transition-all text-sm cursor-pointer"
                        >
                            <option value="">Sélectionner...</option>
                            {cityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Spécialité
                        </label>
                        <select
                            name="specialty"
                            value={formData.specialty}
                            onChange={onChange}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] bg-white transition-all text-sm cursor-pointer"
                        >
                            <option value="">Sélectionner...</option>
                            {specialtyOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={onChange}
                            placeholder="+212 6 12 34 56 78"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-white"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={email || ''} onChange={() => { }} disabled className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-gray-100 cursor-not-allowed"/>
                </div>
                <p className="text-xs text-gray-400 -mt-4">Pour modifier votre email, contactez le support</p>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Biographie
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={onChange}
                        placeholder="Décrivez votre parcours et vos compétences..."
                        rows={5}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm resize-none bg-white"
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-[#1e6b4f] hover:bg-[#155a42] text-white ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {saving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
