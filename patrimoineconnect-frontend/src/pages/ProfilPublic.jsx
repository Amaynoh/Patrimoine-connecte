import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilPublic = () => {
    // Récupérer l'ID depuis l'URL
    const { id } = useParams();
    const navigate = useNavigate();

    // États pour les données, le chargement et les erreurs
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les données au montage du composant
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement du profil:", err);
                if (err.response?.status === 404) {
                    setError("Utilisateur non trouvé");
                } else {
                    setError("Impossible de charger le profil");
                }
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    // Formater le rôle pour l'affichage
    const formatRole = (role) => {
        const roles = {
            artisan: 'Artisan',
            architecte: 'Architecte',
            restaurateur: 'Restaurateur',
            entreprise: 'Entreprise',
            laureat: 'Lauréat'
        };
        return roles[role] || role;
    };

    // Construire l'URL de la photo
    const getPhotoUrl = (photoPath) => {
        if (!photoPath) return null;
        if (photoPath.startsWith('http')) return photoPath;
        return `http://127.0.0.1:8000/storage/${photoPath}`;
    };

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5E3C] mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    // Affichage en cas d'erreur (404 ou autre)
    if (error) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
                    <p className="text-gray-600 mb-6">Le profil demandé n'existe pas ou a été supprimé.</p>
                    <button
                        onClick={() => navigate('/annuaire')}
                        className="bg-[#8B5E3C] hover:bg-[#6F4E37] text-white py-2 px-6 rounded-lg font-medium transition-colors"
                    >
                        Retour à l'annuaire
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Bouton Retour */}
                <button
                    onClick={() => navigate('/annuaire')}
                    className="flex items-center gap-2 text-[#8B5E3C] hover:text-[#6F4E37] mb-8 font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour à l'annuaire
                </button>

                {/* En-tête du profil */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                        {/* Photo de profil */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4A373]/30 flex-shrink-0">
                            {user.photo ? (
                                <img
                                    src={getPhotoUrl(user.photo)}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#8B5E3C] flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Informations principales */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>

                            {/* Badge du rôle */}
                            <span className="inline-block px-4 py-1 text-sm font-medium bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full mb-4">
                                {formatRole(user.role)}
                            </span>

                            {/* Ville et Spécialité */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
                                {user.city && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{user.city}</span>
                                    </div>
                                )}
                                {user.specialty && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        <span>{user.specialty}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Contact */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span>📞</span> Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.email && (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#8B5E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <a href={`mailto:${user.email}`} className="text-gray-900 hover:text-[#8B5E3C] transition-colors">
                                        {user.email}
                                    </a>
                                </div>
                            </div>
                        )}
                        {user.phone && (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#8B5E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Téléphone</p>
                                    <a href={`tel:${user.phone}`} className="text-gray-900 hover:text-[#8B5E3C] transition-colors">
                                        {user.phone}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section Bio */}
                {user.bio && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>📝</span> À propos
                        </h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {user.bio}
                        </p>
                    </div>
                )}

                {/* Section Portfolio */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span>🖼️</span> Mes Réalisations
                    </h2>

                    {/* Vérifier si le portfolio existe et a des images */}
                    {user.portfolio && user.portfolio.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {user.portfolio.map((image) => (
                                <div
                                    key={image.id}
                                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                                >
                                    <img
                                        src={getPhotoUrl(image.image_path)}
                                        alt={image.title || 'Réalisation'}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* Overlay avec titre au hover */}
                                    {image.title && (
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                            <p className="text-white p-4 font-medium">{image.title}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <div className="text-5xl mb-4">📷</div>
                            <p className="text-gray-500">Aucune réalisation pour le moment</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProfilPublic;
