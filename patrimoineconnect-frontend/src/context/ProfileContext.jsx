import { createContext, useContext } from 'react';
import api from '../api/axios';
const ProfileContext = createContext(null);
export const ProfileProvider = ({ children }) => {

    const fetchProfile = async () => {
        try {
            const response = await api.get('/profile');
            return { data: response.data, error: null };
        } catch (err) {
            return { data: null, error: 'Impossible de charger le profil' };
        }
    };

    const updateProfile = async (formData) => {
        try {
            const response = await api.put('/profile', formData);
            return { data: response.data.user, error: null };
        } catch (err) {
            let errorMsg = 'Erreur';
            if (err.response?.status === 422) {
                errorMsg = Object.values(err.response.data.errors).flat().join(', ');
            }
            return { data: null, error: errorMsg };
        }
    };
    const fetchPortfolio = async () => {
        try {
            const response = await api.get('/profile/portfolio');
            return response.data.map(img => ({
                id: img.id,
                preview: img.url,
                name: img.title || 'Image'
            }));
        } catch (err) {
            return [];
        }
    };
    const addPortfolioImage = async (file, title) => {
        try {
            const fd = new FormData();
            fd.append('image', file);
            fd.append('title', title);
            const response = await api.post('/profile/portfolio', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return {
                data: {
                    id: response.data.image.id,
                    preview: response.data.image.url,
                    name: response.data.image.title || 'Image'
                },
                error: null
            };
        } catch (err) {
            return { data: null, error: 'Erreur upload' };
        }
    };

    const deletePortfolioImage = async (id) => {
        try {
            await api.delete(`/profile/portfolio/${id}`);
            return { success: true };
        } catch (err) {
            return { success: false, error: 'Erreur suppression' };
        }
    };

    const value = {
        fetchProfile,
        updateProfile,
        fetchPortfolio,
        addPortfolioImage,
        deletePortfolioImage,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile doit être utilisé dans ProfileProvider');
    }
    return context;
};
