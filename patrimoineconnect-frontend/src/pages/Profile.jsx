import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProfileCard from '../components/profile/ProfileCard';
import PasswordChange from '../components/profile/PasswordChange';
import ProfileForm from '../components/profile/ProfileForm';
import PortfolioSection from '../components/profile/PortfolioSection';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        specialty: '',
        phone: '',
        bio: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                const userData = response.data;
                setUser(userData);
                setFormData({
                    name: userData.name || '',
                    city: userData.city || '',
                    specialty: userData.specialty || '',
                    phone: userData.phone || '',
                    bio: userData.bio || ''
                });
                setLoading(false);
            } catch (err) {
                console.error('Erreur:', err);
                setError('Impossible de charger le profil');
                setLoading(false);
            }
        };

        // Charger les images du portfolio
        const fetchPortfolio = async () => {
            try {
                const response = await api.get('/portfolio');
                const images = response.data.map(img => ({
                    id: img.id,
                    preview: img.url,
                    name: img.title || 'Image portfolio'
                }));
                setPortfolioImages(images);
            } catch (err) {
                console.error('Erreur chargement portfolio:', err);
            }
        };

        fetchProfile();
        fetchPortfolio();
    }, []);

    const handlePhotoUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.put('/profile', formData);
            setUser(response.data.user);
            setSuccess('Profil mis à jour avec succès !');
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = Object.values(err.response.data.errors).flat().join(', ');
                setError(`Erreur: ${errors}`);
            } else {
                setError('Erreur lors de la mise à jour');
            }
        } finally {
            setSaving(false);
        }
    };

    // Uploader les nouvelles images vers l'API
    const handleAddPortfolioImages = async (newFiles) => {
        setUploadingImages(true);

        for (const fileData of newFiles) {
            try {
                const formData = new FormData();
                formData.append('image', fileData.file);
                formData.append('title', fileData.name);

                const response = await api.post('/portfolio', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // Ajouter l'image retournée par l'API
                const savedImage = response.data.image;
                setPortfolioImages(prev => [...prev, {
                    id: savedImage.id,
                    preview: savedImage.url,
                    name: savedImage.title || 'Image portfolio'
                }]);
            } catch (err) {
                console.error('Erreur upload image:', err);
                setError('Erreur lors de l\'upload d\'une image');
            }
        }

        setUploadingImages(false);
    };

    // Supprimer une image via l'API
    const handleRemovePortfolioImage = async (imageId) => {
        try {
            await api.delete(`/portfolio/${imageId}`);
            setPortfolioImages(portfolioImages.filter(img => img.id !== imageId));
        } catch (err) {
            console.error('Erreur suppression image:', err);
            setError('Erreur lors de la suppression de l\'image');
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <div className="text-gray-500">Chargement du profil...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e6b4f]">Mon Profil</h1>
                    <p className="text-gray-500 mt-1">Gérez vos informations personnelles</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ProfileCard user={user} onPhotoUpdate={handlePhotoUpdate} />
                        <PasswordChange />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileForm
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            email={user?.email}
                            saving={saving}
                            error={error}
                            success={success}
                            onCancel={() => navigate(-1)}
                        />
                        <PortfolioSection
                            images={portfolioImages}
                            onAddImages={handleAddPortfolioImages}
                            onRemoveImage={handleRemovePortfolioImage}
                            uploading={uploadingImages}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
