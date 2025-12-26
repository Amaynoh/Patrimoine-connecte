import { Link } from 'react-router-dom';

const ShortcutCard = ({ to, icon, title, description, iconBgColor = 'bg-[#1e6b4f]/10', iconColor = 'text-[#1e6b4f]' }) => {
    return (
        <Link
            to={to}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#C17A56]/30 transition-all group"
        >
            <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center mb-4 group-hover:opacity-80 transition-opacity`}>
                <span className={iconColor}>{icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </Link>
    );
};

const ShortcutsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ShortcutCard
                to="/profile"
                icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                }
                title="Mon Profil"
                description="Modifier mes informations personnelles"
            />
            <ShortcutCard
                to="/annuaire"
                icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                }
                title="Consulter l'annuaire"
                description="Découvrir les artisans et architectes"
                iconBgColor="bg-[#C17A56]/10"
                iconColor="text-[#C17A56]"
            />
        </div>
    );
};

export default ShortcutsGrid;
