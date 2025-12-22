import React, { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

/**
 * Composant PasswordChange - Section changement de mot de passe
 */
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

        // Validation simple
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (passwords.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        // TODO: Appel API pour changer le mot de passe
        setSuccess('Mot de passe modifié avec succès !');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔒 Changer le mot de passe
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Mot de passe actuel"
                    name="currentPassword"
                    type="password"
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Nouveau mot de passe"
                    name="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <Button type="submit" variant="warning" className="w-full">
                    Mettre à jour
                </Button>
            </form>
        </div>
    );
};

export default PasswordChange;
