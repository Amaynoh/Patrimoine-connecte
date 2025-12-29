import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [opportunites, setOpportunites] = useState([]);
    const [candidatures, setCandidatures] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [usersRes, oppsRes, candsRes, catsRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/opportunites'),
                api.get('/admin/candidatures'),
                api.get('/categories')
            ]);
            setUsers(usersRes.data.data || []);
            setOpportunites(oppsRes.data.data || []);
            setCandidatures(candsRes.data.data || []);
            setCategories(catsRes.data || []);
        } catch (err) {
            console.error('Erreur chargement admin', err);
        }
        setLoading(false);
    };

    const value = {
        users, setUsers,
        opportunites, setOpportunites,
        candidatures, setCandidatures,
        categories, setCategories,
        loading,
        fetchAdminData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin doit être utilisé dans AdminProvider');
    }
    return context;
};
