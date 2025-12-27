const AdminCandidatures = ({ candidatures }) => {
    const statusBadge = (s) => s === 'acceptee' ? 'bg-green-100 text-green-700' : s === 'refusee' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';
    const statusText = (s) => s === 'acceptee' ? 'Acceptée' : s === 'refusee' ? 'Refusée' : 'En attente';

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">📩 Candidatures</h2>
            <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr><th className="text-left p-3">Candidat</th><th className="text-left p-3">Pour</th><th className="text-left p-3">Statut</th></tr></thead>
                <tbody className="divide-y">
                    {candidatures.slice(0, 10).map(c => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-3 font-medium">{c.user?.name || 'Inconnu'}</td>
                            <td className="p-3 text-gray-600">{c.opportunite?.title || 'Supprimée'}</td>
                            <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${statusBadge(c.status)}`}>{statusText(c.status)}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCandidatures;
