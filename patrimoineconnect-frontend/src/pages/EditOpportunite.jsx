import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOpportunites } from '../context/OpportunitesContext';
import OpportuniteForm from '../components/opportunites/OpportuniteForm';

const EditOpportunite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { fetchOpportuniteById, updateOpportunite } = useOpportunites();

    const [formData, setFormData] = useState({
        title: '', type: 'emploi', contract_type: 'CDI', location: '', description: '', missions: '', competences: '', budget: '', deadline: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOpportunite = async () => {
            const result = await fetchOpportuniteById(id);
            if (result.data) {
                const data = result.data;
                if (data.user_id !== user?.id) {
                    setError("Vous n'êtes pas autorisé à modifier cette opportunité.");
                    setLoading(false);
                    return;
                }
                setFormData({
                    title: data.title || '',
                    type: data.type || 'emploi',
                    contract_type: data.contract_type || 'CDI',
                    location: data.location || '',
                    description: data.description || '',
                    missions: Array.isArray(data.missions) ? data.missions.join('\n') : data.missions || '',
                    competences: Array.isArray(data.competences) ? data.competences.join('\n') : data.competences || '',
                    budget: data.budget || '',
                    deadline: data.deadline || ''
                });
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        loadOpportunite();
    }, [id, user?.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const result = await updateOpportunite(id, formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="bg-[#FAF7F2] min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
        </div>
    );

    if (error && !formData.title) return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600">{error}</p>
                <button onClick={() => navigate('/dashboard')} className="mt-4 bg-[#1e3a8a] text-white px-6 py-2 rounded-lg">
                    Retour
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-[#FAF7F2] min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
                    ← Retour
                </button>
                <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">Modifier l'Opportunité</h1>
                <p className="text-gray-500 mb-8">Mettez à jour les informations</p>

                <OpportuniteForm
                    formData={formData}
                    onChange={setFormData}
                    onSubmit={handleSubmit}
                    loading={submitting}
                    error={error}
                    submitLabel="Enregistrer"
                />
            </div>
        </div>
    );
};

export default EditOpportunite;
