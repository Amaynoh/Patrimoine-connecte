import { Link } from 'react-router-dom';

const ProfileSidebar = ({ user }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Mon Profil en un coup d'œil</h3>
                <div className="w-20 h-20 bg-gradient-to-br from-[#C17A56] to-[#A96745] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <h4 className="font-semibold text-gray-800">{user?.name || 'Utilisateur'}</h4>
                <span className="inline-block px-3 py-1 bg-[#1e6b4f]/10 text-[#1e6b4f] text-sm font-medium rounded-full mt-2 capitalize">
                    {user?.role || 'Membre'}
                </span>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                    {user?.city && (
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-[#C17A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {user.city}
                        </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-[#C17A56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Membre depuis 2024
                    </div>
                </div>

                <Link
                    to="/profile"
                    className="mt-6 block w-full bg-[#1e6b4f] hover:bg-[#155a41] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                    Modifier mon profil
                </Link>
            </div>
            <Link
                to="/opportunites"
                className="block bg-gradient-to-r from-[#6B1C23] to-[#8B2C33] text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
                <h3 className="font-semibold mb-2">Voir toutes les opportunités</h3>
                <p className="text-sm text-white/80">Découvrez les projets de patrimoine en cours</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                    Explorer
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Link>
        </div>
    );
};

export default ProfileSidebar;
