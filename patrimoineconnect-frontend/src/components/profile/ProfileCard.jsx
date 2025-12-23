import React, { useRef, useState } from 'react';
import api from '../../api/axios';

const ProfileCard = ({ user, onPhotoUpdate }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    // Construire l'URL de la photo
    const getPhotoUrl = () => {
        if (!user?.photo) {
            return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200';
        }
        // Si c'est déjà une URL complète
        if (user.photo.startsWith('http')) {
            return user.photo;
        }
        // Sinon, ajouter le préfixe du serveur
        return `http://127.0.0.1:8000/storage/${user.photo}`;
    };

    // Gérer le clic sur la photo
    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    // Gérer l'upload de la photo
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Vérification taille max 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('La photo ne doit pas dépasser 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await api.post('/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Notifier le parent de la mise à jour
            if (onPhotoUpdate) {
                onPhotoUpdate(response.data.user);
            }
        } catch (err) {
            console.error('Erreur upload photo:', err);

            // Gestion améliorée des erreurs
            if (err.response?.status === 422) {
                // Erreur de validation (ex: fichier trop lourd, mauvais format)
                const errors = err.response.data.errors;
                const errorMessage = errors && errors.photo
                    ? errors.photo[0]
                    : 'Erreur de validation lors de l\'upload.';
                alert(errorMessage);
            } else if (err.response?.status === 413) {
                // Payload Too Large (souvent configuration serveur Nginx/Apache)
                alert('Le fichier est trop volumineux pour le serveur.');
            } else {
                console.log('Full Error Object:', err);
                if (err.response) {
                    console.log('Status:', err.response.status);
                    console.log('Data:', err.response.data);
                }
                alert('Erreur lors de l\'upload de la photo. Veuillez réessayer.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Photo de profil cliquable */}
            <div className="flex flex-col items-center mb-6">
                <div
                    className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#D4A373]/30 mb-4 cursor-pointer group"
                    onClick={handlePhotoClick}
                >
                    <img
                        src={getPhotoUrl()}
                        alt="Photo de profil"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-2xl">📷</span>
                    </div>
                    {/* Loader pendant l'upload */}
                    {uploading && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-white text-sm">Upload...</span>
                        </div>
                    )}
                </div>

                {/* Input caché pour le fichier */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    className="hidden"
                />

                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Utilisateur'}</h2>
                <p className="text-[#D4A373] text-sm font-medium">{user?.specialty || user?.role || 'Membre'}</p>
                <p className="text-xs text-gray-400 mt-1">Cliquez sur la photo pour la modifier</p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-3 text-sm text-gray-600">
                {user?.city && (
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">📍</span>
                        <span>{user.city}, Maroc</span>
                    </div>
                )}
                {user?.email && (
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">✉️</span>
                        <span>{user.email}</span>
                    </div>
                )}
                {user?.phone && (
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">📞</span>
                        <span>{user.phone}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;

