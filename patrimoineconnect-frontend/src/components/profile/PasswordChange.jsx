import React, { useState } from 'react';

const PasswordChange = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (passwords.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        setSuccess('Mot de passe modifié avec succès !');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔒 Changer le mot de passe
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Mot de passe actuel <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-white"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Nouveau mot de passe <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-white"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Confirmer le mot de passe <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] transition-all text-sm bg-white"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <button
                    type="submit"
                    className="w-full px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-[#D4A373] hover:bg-[#c4935f] text-white"
                >
                    Mettre à jour
                </button>
            </form>
        </div>
    );
};

export default PasswordChange;
