import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';

const OpportuniteSidebar = ({ user, opportuniteId }) => {
    const { isAuthenticated, user: currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const canApply = isAuthenticated && currentUser?.id !== user?.id;

    const handlePostuler = async () => {
        setSending(true);
        setError('');
        try {
            await api.post('/candidatures', { opportunite_id: opportuniteId, message });
            setSent(true);
            setShowPopup(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'envoi');
        }
        setSending(false);
    };

    const getPhotoUrl = () => {
        if (!user?.photo) return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'U');
        return user.photo.startsWith('http') ? user.photo : `http://127.0.0.1:8000/storage/${user.photo}`;
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src={getPhotoUrl()} alt={user?.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{user?.name || 'Utilisateur'}</h3>
                <p className="text-sm text-gray-500 mb-2">{user?.role || 'Membre'}</p>

                <div className="text-left text-sm text-gray-500 space-y-2 mb-6">
                    {user?.specialty && <div className="flex items-center gap-2">🏛️ <span>{user.specialty}</span></div>}
                    {user?.city && <div className="flex items-center gap-2">📍 <span>{user.city}, Maroc</span></div>}
                </div>

                {sent ? (
                    <div className="bg-green-100 text-green-700 py-2 px-4 rounded-lg">✅ Candidature envoyée !</div>
                ) : canApply ? (
                    <button onClick={() => setShowPopup(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        ✉️ Contacter l'émetteur
                    </button>
                ) : !isAuthenticated ? (
                    <p className="text-sm text-gray-400">Connectez-vous pour postuler</p>
                ) : null}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Envoyer une candidature</h3>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Écrivez un message pour vous présenter..."
                            rows={4}
                            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <div className="flex gap-3">
                            <button onClick={() => setShowPopup(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                                Annuler
                            </button>
                            <button onClick={handlePostuler} disabled={sending} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                {sending ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpportuniteSidebar;
