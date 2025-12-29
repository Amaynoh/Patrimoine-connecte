import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOpportunites } from '../context/OpportunitesContext';  
import OpportuniteForm from '../components/opportunites/OpportuniteForm';

const CreateOpportunite = () => {
    const navigate = useNavigate();
    const { createOpportunite } = useOpportunites();

    const [formData, setFormData] = useState({
        title: '', type: 'emploi', contract_type: 'CDI', location: '', description: '', missions: '', competences: '', budget: '', deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await createOpportunite(formData);
        if (result.success) {
            navigate('/opportunites');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
                    ← Retour
                </button>
                <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">Publier une Opportunité</h1>
                <p className="text-gray-500 mb-8">Partagez vos projets avec la communauté</p>

                <OpportuniteForm
                    formData={formData}
                    onChange={setFormData}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    submitLabel="Publier"
                />
            </div>
        </div>
    );
};

export default CreateOpportunite;
