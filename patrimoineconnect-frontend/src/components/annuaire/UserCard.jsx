import { useNavigate } from 'react-router-dom';
const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const formatRole = (role) => {
        const roles = {
            artisan: 'Artisan',
            architecte: 'Architecte',
            restaurateur: 'Restaurateur',
            entreprise: 'Entreprise',
            laureat: 'Lauréat'
        };
        return roles[role] || role;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.photo ? (
                    <img
                        src={user.photo.startsWith('http') ? user.photo : `http://127.0.0.1:8000/storage/${user.photo}`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-[#8B5E3C] flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {user.name}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full mb-3">
                    {formatRole(user.role)}
                </span>

                {user.city && (
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {user.city}
                    </div>
                )}

                <button
                    onClick={() => navigate(`/profil/${user.id}`)}
                    className="w-full bg-[#8B5E3C] hover:bg-[#6F4E37] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                    Voir Profil
                </button>
            </div>
        </div>
    );
};

export default UserCard;
