
const StatsCard = ({ icon, value, label, bgColor = 'bg-[#C17A56]/10', iconColor = 'text-[#C17A56]' }) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
                <span className={iconColor}>{icon}</span>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
            </div>
        </div>
    );
};

const StatsGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                }
                value={stats.annoncesPubliees}
                label="Annonces publiées"
            />
            <StatsCard
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                }
                value={stats.profilsVisites}
                label="Profils visités"
                bgColor="bg-blue-50"
                iconColor="text-blue-500"
            />
            <StatsCard
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                }
                value={stats.messagesNonLus}
                label="Messages non lus"
                bgColor="bg-green-50"
                iconColor="text-green-500"
            />
            <StatsCard
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                }
                value={stats.connexions}
                label="Connexions"
                bgColor="bg-yellow-50"
                iconColor="text-yellow-600"
            />
        </div>
    );
};

export default StatsGrid;
