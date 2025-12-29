import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const UsersContext = createContext(null);
export const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            setError("Impossible de charger l'annuaire.");
        }
        setLoading(false);
    };
    const fetchUserById = async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return { data: response.data, error: null };
        } catch (err) {
            const errorMsg = err.response?.status === 404
                ? "Utilisateur non trouvé"
                : "Impossible de charger le profil";
            return { data: null, error: errorMsg };
        }
    };

    const value = {
        users,
        loading,
        error,
        fetchUsers,
        fetchUserById,
    };

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers doit être utilisé dans UsersProvider');
    }
    return context;
};
