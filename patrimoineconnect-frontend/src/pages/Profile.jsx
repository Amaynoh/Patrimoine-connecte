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
    const [formData, setFormData] = useState({ name: '', city: '', specialty: '', phone: '', bio: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/profile');
                const u = res.data;
                setUser(u);
                setFormData({ name: u.name || '', city: u.city || '', specialty: u.specialty || '', phone: u.phone || '', bio: u.bio || '' });
            } catch { setError('Impossible de charger le profil'); }
            setLoading(false);

            try {
                const res = await api.get('/profile/portfolio');
                setPortfolioImages(res.data.map(img => ({ id: img.id, preview: img.url, name: img.title || 'Image' })));
            } catch { }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError(''); setSuccess('');
        try {
            const res = await api.put('/profile', formData);
            setUser(res.data.user);
            setSuccess('Profil mis à jour !');
        } catch (err) {
            setError(err.response?.status === 422 ? Object.values(err.response.data.errors).flat().join(', ') : 'Erreur');
        } finally { setSaving(false); }
    };

    const handleAddPortfolioImages = async (newFiles) => {
        setUploadingImages(true);
        for (const f of newFiles) {
            try {
                const fd = new FormData();
                fd.append('image', f.file);
                fd.append('title', f.name);
                const res = await api.post('/profile/portfolio', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                setPortfolioImages(prev => [...prev, { id: res.data.image.id, preview: res.data.image.url, name: res.data.image.title || 'Image' }]);
            } catch { setError('Erreur upload'); }
        }
        setUploadingImages(false);
    };

    const handleRemovePortfolioImage = async (id) => {
        try {
            await api.delete(`/profile/portfolio/${id}`);
            setPortfolioImages(prev => prev.filter(img => img.id !== id));
        } catch { setError('Erreur suppression'); }
    };

    if (loading) return <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center"><div className="text-gray-500">Chargement...</div></div>;

    return (
        <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e6b4f]">Mon Profil</h1>
                    <p className="text-gray-500 mt-1">Gérez vos informations personnelles</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ProfileCard user={user} onPhotoUpdate={setUser} />
                        <PasswordChange />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} email={user?.email} saving={saving} error={error} success={success} onCancel={() => navigate(-1)} />
                        <PortfolioSection images={portfolioImages} onAddImages={handleAddPortfolioImages} onRemoveImage={handleRemovePortfolioImage} uploading={uploadingImages} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
