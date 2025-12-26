import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const CandidaturesRecues = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/candidatures/recues');
                setCandidatures(res.data);
            } catch { }
            setLoading(false);
        };
        fetch();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await api.put(`/candidatures/${id}/${action}`);
            setCandidatures(prev => prev.map(c => c.id === id ? { ...c, status: action === 'accepter' ? 'acceptee' : 'refusee' } : c));
        } catch { alert('Erreur'); }
    };

    const statusColors = { en_attente: 'bg-yellow-100 text-yellow-700', acceptee: 'bg-green-100 text-green-700', refusee: 'bg-red-100 text-red-700' };
    const statusLabels = { en_attente: 'En attente', acceptee: 'Acceptée', refusee: 'Refusée' };

    if (loading) return <div className="text-gray-500">Chargement...</div>;
    if (candidatures.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📩 Candidatures reçues</h2>
            <div className="space-y-4">
                {candidatures.map(c => (
                    <div key={c.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <Link to={`/profil/${c.user?.id}`} className="font-bold text-blue-600 hover:underline">{c.user?.name}</Link>
                                <p className="text-sm text-gray-500">Pour : {c.opportunite?.title}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${statusColors[c.status]}`}>{statusLabels[c.status]}</span>
                        </div>
                        {c.message && <p className="text-sm text-gray-600 mb-3 italic">"{c.message}"</p>}
                        {c.status === 'en_attente' && (
                            <div className="flex gap-2">
                                <button onClick={() => handleAction(c.id, 'accepter')} className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">Accepter</button>
                                <button onClick={() => handleAction(c.id, 'refuser')} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Refuser</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidaturesRecues;
