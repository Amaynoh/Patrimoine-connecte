import api from '../../api/axios';

const AdminUsers = ({ users, setUsers }) => {
    const del = (id, name) => {
        if (!window.confirm(`Supprimer "${name}" ?`)) return;
        api.delete(`/admin/users/${id}`)
            .then(() => setUsers(users.filter(u => u.id !== id)))
            .catch(e => alert(e.response?.data?.message || 'Erreur'));
    };

    const badge = (role) => {
        const colors = { admin: 'bg-red-100 text-red-700', architecte: 'bg-blue-100 text-blue-700', entreprise: 'bg-purple-100 text-purple-700' };
        return colors[role] || 'bg-[#C17A56]/10 text-[#C17A56]';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">👥 Utilisateurs</h2>
            <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr><th className="text-left p-3">Nom</th><th className="text-left p-3">Email</th><th className="text-left p-3">Rôle</th><th className="text-right p-3">Actions</th></tr></thead>
                <tbody className="divide-y">
                    {users.slice(0, 10).map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                            <td className="p-3 font-medium">{u.name}</td>
                            <td className="p-3 text-gray-600">{u.email}</td>
                            <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${badge(u.role)}`}>{u.role}</span></td>
                            <td className="p-3 text-right">{u.role !== 'admin' && <button onClick={() => del(u.id, u.name)} className="text-red-600 text-sm">🗑️ Supprimer</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
