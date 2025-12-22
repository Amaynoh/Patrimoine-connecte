import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import InputField from '../components/ui/InputField';
import TextArea from '../components/ui/TextArea';
import SelectField from '../components/ui/SelectField';
import Button from '../components/ui/Button';
import ProfileCard from '../components/profile/ProfileCard';
import PasswordChange from '../components/profile/PasswordChange';


const Profile = () => {
    const navigate = useNavigate();
    const portfolioInputRef = useRef(null);

    // États pour les données du profil
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

    // État pour les images du portfolio (local uniquement pour l'instant)
    const [portfolioImages, setPortfolioImages] = useState([]);

    // Options pour les villes
    const cityOptions = [
        { value: 'Casablanca', label: 'Casablanca' },
        { value: 'Rabat', label: 'Rabat' },
        { value: 'Marrakech', label: 'Marrakech' },
        { value: 'Fès', label: 'Fès' },
        { value: 'Tanger', label: 'Tanger' },
        { value: 'Salé', label: 'Salé' },
        { value: 'Meknès', label: 'Meknès' },
        { value: 'Agadir', label: 'Agadir' }
    ];

    // Options pour les spécialités
    const specialtyOptions = [
        { value: 'Poterie traditionnelle', label: 'Poterie traditionnelle' },
        { value: 'Zellige', label: 'Zellige' },
        { value: 'Menuiserie', label: 'Menuiserie' },
        { value: 'Ferronnerie', label: 'Ferronnerie' },
        { value: 'Sculpture sur plâtre', label: 'Sculpture sur plâtre' },
        { value: 'Tapis et tissage', label: 'Tapis et tissage' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Restauration', label: 'Restauration' }
    ];

    // Charger les données du profil au montage
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
                console.error('Erreur lors du chargement du profil:', err);
                setError('Impossible de charger le profil');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Callback pour mise à jour de la photo depuis ProfileCard
    const handlePhotoUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    // Soumission du formulaire
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
            console.error('Erreur lors de la mise à jour:', err);
            if (err.response?.status === 422) {
                const errors = Object.values(err.response.data.errors).flat().join(', ');
                setError(`Erreur de validation : ${errors}`);
            } else {
                setError('Erreur lors de la mise à jour du profil');
            }
        } finally {
            setSaving(false);
        }
    };

    // Ajouter des images au portfolio
    const handleAddPortfolioImages = () => {
        portfolioInputRef.current?.click();
    };

    // Gérer la sélection d'images pour le portfolio
    const handlePortfolioFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Créer des URLs pour prévisualisation
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setPortfolioImages([...portfolioImages, ...newImages]);
    };

    // Supprimer une image du portfolio
    const handleRemovePortfolioImage = (imageId) => {
        setPortfolioImages(portfolioImages.filter(img => img.id !== imageId));
    };

    // Affichage du chargement
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

                {/* En-tête */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e6b4f]">Mon Profil</h1>
                    <p className="text-gray-500 mt-1">Gérez vos informations personnelles et votre portfolio</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Colonne gauche - Carte profil et mot de passe */}
                    <div className="lg:col-span-1">
                        <ProfileCard user={user} onPhotoUpdate={handlePhotoUpdate} />
                        <PasswordChange />
                    </div>

                    {/* Colonne droite - Formulaire */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Section Informations personnelles */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                👤 Informations personnelles
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Ligne 1 : Nom et Ville */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Nom complet"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Votre nom"
                                        required
                                    />
                                    <SelectField
                                        label="Ville"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        options={cityOptions}
                                        required
                                    />
                                </div>

                                {/* Ligne 2 : Spécialité et Téléphone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectField
                                        label="Spécialité"
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        options={specialtyOptions}
                                    />
                                    <InputField
                                        label="Téléphone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+212 6 12 34 56 78"
                                    />
                                </div>

                                {/* Email (lecture seule) */}
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={user?.email || ''}
                                    onChange={() => { }}
                                    disabled
                                />
                                <p className="text-xs text-gray-400 -mt-4">
                                    Pour modifier votre email, contactez le support
                                </p>

                                {/* Biographie */}
                                <TextArea
                                    label="Biographie"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Décrivez votre parcours, vos compétences et votre passion pour le patrimoine..."
                                    rows={5}
                                />

                                {/* Messages d'erreur et succès */}
                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                                        {success}
                                    </div>
                                )}

                                {/* Boutons */}
                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={saving}
                                    >
                                        {saving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Section Portfolio */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    🖼️ Mon Portfolio
                                </h2>
                                <Button
                                    variant="primary"
                                    className="text-sm"
                                    onClick={handleAddPortfolioImages}
                                >
                                    + Ajouter des images
                                </Button>
                                {/* Input caché pour les images */}
                                <input
                                    type="file"
                                    ref={portfolioInputRef}
                                    onChange={handlePortfolioFileChange}
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    multiple
                                    className="hidden"
                                />
                            </div>

                            {/* Grille de photos */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {portfolioImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative aspect-square rounded-lg overflow-hidden group"
                                    >
                                        <img
                                            src={image.preview}
                                            alt={image.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Bouton supprimer */}
                                        <button
                                            onClick={() => handleRemovePortfolioImage(image.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Placeholder pour ajouter plus */}
                                <div
                                    onClick={handleAddPortfolioImages}
                                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 hover:border-[#D4A373] transition-colors cursor-pointer"
                                >
                                    <span className="text-3xl">+</span>
                                </div>
                            </div>

                            {/* Conseils */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Conseils pour vos photos :</h4>
                                <ul className="text-sm text-gray-500 space-y-1">
                                    <li>• Utilisez un bon éclairage naturel</li>
                                    <li>• Montrez vos créations sous différents angles</li>
                                    <li>• Incluez des photos de votre processus de création</li>
                                    <li>• Format recommandé : JPG ou PNG, max 5MB par image</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

