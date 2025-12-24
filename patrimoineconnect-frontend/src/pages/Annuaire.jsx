import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/annuaire/SearchBar';
import UserCard from '../components/annuaire/UserCard';


const Annuaire = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors du chargement", err);
                setError("Impossible de charger l'annuaire.");
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase();
        return user.name?.toLowerCase().includes(search) ||
            user.city?.toLowerCase().includes(search);
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <p className="text-gray-600 text-lg">Chargement de l'annuaire...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* En-tête */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Annuaire des Professionnels
                    </h1>
                    <p className="text-gray-600">
                        Découvrez les artisans, architectes et experts du patrimoine
                    </p>
                </div>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Rechercher par nom ou ville..."
                    resultCount={filteredUsers.length}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg mb-4">
                            Aucun professionnel trouvé pour "{searchTerm}"
                        </p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="text-[#8B5E3C] hover:underline"
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Annuaire;
