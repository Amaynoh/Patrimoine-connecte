import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const OpportunitesContext = createContext(null);
export const OpportunitesProvider = ({ children }) => {

    const [opportunites, setOpportunites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchOpportunites = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/opportunites');
            setOpportunites(response.data);
        } catch (err) {
            setError("Impossible de charger les opportunités.");
        }
        setLoading(false);
    };
    const fetchOpportuniteById = async (id) => {
        try {
            const response = await api.get(`/opportunites/${id}`);
            return { data: response.data, error: null };
        } catch (err) {
            return { data: null, error: "Impossible de charger l'opportunité." };
        }
    };

    const createOpportunite = async (formData) => {
        try {
            const missions = formData.missions ? formData.missions.split('\n').filter(i => i.trim()) : [];
            const competences = formData.competences ? formData.competences.split('\n').filter(i => i.trim()) : [];

            await api.post('/opportunites', { ...formData, missions, competences });
            return { success: true, error: null };
        } catch (err) {
            let errorMsg = "Erreur lors de la publication.";
            if (err.response?.status === 422) {
                errorMsg = Object.values(err.response.data.errors).flat().join(', ');
            }
            return { success: false, error: errorMsg };
        }
    };

    const updateOpportunite = async (id, formData) => {
        try {
            const missions = formData.missions ? formData.missions.split('\n').filter(i => i.trim()) : [];
            const competences = formData.competences ? formData.competences.split('\n').filter(i => i.trim()) : [];

            await api.put(`/opportunites/${id}`, { ...formData, missions, competences });
            return { success: true, error: null };
        } catch (err) {
            let errorMsg = "Erreur lors de la modification.";
            if (err.response?.status === 422) {
                errorMsg = Object.values(err.response.data.errors).flat().join(', ');
            }
            return { success: false, error: errorMsg };
        }
    };
    const deleteOpportunite = async (id) => {
        try {
            await api.delete(`/opportunites/${id}`);

            setOpportunites(prev => prev.filter(opp => opp.id !== id));
            setMyOpportunites(prev => prev.filter(opp => opp.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: "Erreur lors de la suppression." };
        }
    };

    const [myOpportunites, setMyOpportunites] = useState([]);
    const [myLoading, setMyLoading] = useState(false);

    const fetchMyOpportunites = async () => {
        setMyLoading(true);
        try {
            const response = await api.get('/my-opportunities');
            setMyOpportunites(response.data);
        } catch (err) {
            console.error('Erreur', err);
        }
        setMyLoading(false);
    };

    const value = {
        opportunites,
        loading,
        error,
        fetchOpportunites,
        fetchOpportuniteById,
        createOpportunite,
        updateOpportunite,
        deleteOpportunite,
        myOpportunites,
        myLoading,
        fetchMyOpportunites,
    };

    return (
        <OpportunitesContext.Provider value={value}>
            {children}
        </OpportunitesContext.Provider>
    );
};
export const useOpportunites = () => {
    const context = useContext(OpportunitesContext);
    if (!context) {
        throw new Error('useOpportunites doit être utilisé dans OpportunitesProvider');
    }
    return context;
};
