import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/profile/ProfileCard';
import PasswordChange from '../components/profile/PasswordChange';
import ProfileForm from '../components/profile/ProfileForm';
import PortfolioSection from '../components/profile/PortfolioSection';

const Profile = () => {
    const navigate = useNavigate();
    const { fetchProfile, updateProfile, fetchPortfolio, addPortfolioImage, deletePortfolioImage } = useProfile();

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
            const profileResult = await fetchProfile();
            if (profileResult.data) {
                const u = profileResult.data;
                setUser(u);
                setFormData({ name: u.name || '', city: u.city || '', specialty: u.specialty || '', phone: u.phone || '', bio: u.bio || '' });
            } else {
                setError(profileResult.error);
            }
            setLoading(false);
            const images = await fetchPortfolio();
            setPortfolioImages(images);
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

        const result = await updateProfile(formData);
        if (result.data) {
            setUser(result.data);
            setSuccess('Profil mis à jour !');
        } else {
            setError(result.error);
        }
        setSaving(false);
    };

    const handleAddPortfolioImages = async (newFiles) => {
        setUploadingImages(true);
        for (const f of newFiles) {
            const result = await addPortfolioImage(f.file, f.name);
            if (result.data) {
                setPortfolioImages(prev => [...prev, result.data]);
            } else {
                setError(result.error);
            }
        }
        setUploadingImages(false);
    };

    const handleRemovePortfolioImage = async (id) => {
        const result = await deletePortfolioImage(id);
        if (result.success) {
            setPortfolioImages(prev => prev.filter(img => img.id !== id));
        } else {
            setError(result.error);
        }
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
