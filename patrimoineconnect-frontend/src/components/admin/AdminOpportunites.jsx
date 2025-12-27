import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminOpportunites = ({ opportunites, setOpportunites }) => {
    const del = (id, title) => {
        if (!window.confirm(`Supprimer "${title}" ?`)) return;
        api.delete(`/admin/opportunites/${id}`)
            .then(() => setOpportunites(opportunites.filter(o => o.id !== id)))
            .catch(() => alert('Erreur'));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">📋 Opportunités</h2>
            <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr><th className="text-left p-3">Titre</th><th className="text-left p-3">Créée par</th><th className="text-left p-3">Lieu</th><th className="text-right p-3">Actions</th></tr></thead>
                <tbody className="divide-y">
                    {opportunites.slice(0, 10).map(o => (
                        <tr key={o.id} className="hover:bg-gray-50">
                            <td className="p-3"><Link to={`/opportunites/${o.id}`} className="text-[#C17A56] hover:underline font-medium">{o.title}</Link></td>
                            <td className="p-3 text-gray-600">{o.user?.name || '-'}</td>
                            <td className="p-3 text-gray-600">{o.location || '-'}</td>
                            <td className="p-3 text-right"><button onClick={() => del(o.id, o.title)} className="text-red-600 text-sm">🗑️ Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOpportunites;
