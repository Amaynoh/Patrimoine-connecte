import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const MesCandidatures = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get('/candidatures/mes-candidatures');
                setCandidatures(res.data);
            } catch { }
            setLoading(false);
        };
        fetch();
    }, []);

    const handleAnnuler = async (id) => {
        if (!window.confirm('Annuler cette candidature ?')) return;
        try {
            await api.delete(`/candidatures/${id}`);
            setCandidatures(prev => prev.filter(c => c.id !== id));
        } catch { alert('Erreur'); }
    };

    const statusColors = { en_attente: 'bg-yellow-100 text-yellow-700', acceptee: 'bg-green-100 text-green-700', refusee: 'bg-red-100 text-red-700' };
    const statusLabels = { en_attente: 'En attente', acceptee: 'Acceptée', refusee: 'Refusée' };

    if (loading) return <div className="text-gray-500">Chargement...</div>;
    if (candidatures.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📤 Mes candidatures</h2>
            <div className="space-y-3">
                {candidatures.map(c => (
                    <div key={c.id} className="flex justify-between items-center border rounded-lg p-3">
                        <div>
                            <Link to={`/opportunites/${c.opportunite?.id}`} className="font-medium text-blue-600 hover:underline">
                                {c.opportunite?.title}
                            </Link>
                            <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs ${statusColors[c.status]}`}>{statusLabels[c.status]}</span>
                            {c.status === 'en_attente' && (
                                <button onClick={() => handleAnnuler(c.id)} className="text-red-500 hover:text-red-700 text-sm">Annuler</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MesCandidatures;
