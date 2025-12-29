import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const ProfilPublic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchUserById } = useUsers();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const result = await fetchUserById(id);
            setUser(result.data);
            setError(result.error);
            setLoading(false);
        };
        loadUser();
    }, [id]);

    const formatRole = (role) => ({ artisan: 'Artisan', architecte: 'Architecte', restaurateur: 'Restaurateur', entreprise: 'Entreprise', laureat: 'Lauréat' }[role] || role);

    const getPhotoUrl = (path) => !path ? null : path.startsWith('http') ? path : `http://127.0.0.1:8000/storage/${path}`;

    if (loading) return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5E3C]"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{error}</h2>
                <button onClick={() => navigate('/annuaire')} className="bg-[#8B5E3C] hover:bg-[#6F4E37] text-white py-2 px-6 rounded-lg mt-4">Retour</button>
            </div>
        </div>
    );

    const ContactItem = ({ icon, label, value, href }) => value && (
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center text-[#8B5E3C]">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <a href={href} className="text-gray-900 hover:text-[#8B5E3C]">{value}</a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/annuaire')} className="flex items-center gap-2 text-[#8B5E3C] hover:text-[#6F4E37] mb-8 font-medium">
                    ← Retour à l'annuaire
                </button>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#D4A373]/30 flex-shrink-0">
                            {user.photo ? (
                                <img src={getPhotoUrl(user.photo)} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#8B5E3C] flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                            <span className="inline-block px-4 py-1 text-sm font-medium bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full mb-4">{formatRole(user.role)}</span>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
                                {user.city && <span>📍 {user.city}</span>}
                                {user.specialty && <span>🔧 {user.specialty}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">📞 Contact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ContactItem icon="✉️" label="Email" value={user.email} href={`mailto:${user.email}`} />
                        <ContactItem icon="📞" label="Téléphone" value={user.phone} href={`tel:${user.phone}`} />
                    </div>
                </div>
                {user.bio && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 À propos</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{user.bio}</p>
                    </div>
                )}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">🖼️ Mes Réalisations</h2>
                    {user.portfolio?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {user.portfolio.map((img) => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                                    <img src={getPhotoUrl(img.image_path)} alt={img.title || 'Réalisation'} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    {img.title && <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end"><p className="text-white p-4">{img.title}</p></div>}
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
