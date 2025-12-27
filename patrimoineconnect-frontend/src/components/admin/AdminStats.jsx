const AdminStats = ({ users, opportunites, candidatures, categories }) => {
    const stats = [
        { icon: '👥', n: users.length, label: 'Utilisateurs', bg: 'bg-[#C17A56]/10', txt: 'text-[#C17A56]' },
        { icon: '📋', n: opportunites.length, label: 'Opportunités', bg: 'bg-blue-50', txt: 'text-blue-500' },
        { icon: '📩', n: candidatures.length, label: 'Candidatures', bg: 'bg-green-50', txt: 'text-green-500' },
        { icon: '🏷️', n: categories.length, label: 'Catégories', bg: 'bg-purple-50', txt: 'text-purple-500' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
                    <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                        <span className={`${s.txt} text-xl`}>{s.icon}</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{s.n}</div>
                        <div className="text-sm text-gray-500">{s.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminStats;
