import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import ShortcutsGrid from '../components/dashboard/ShortcutsGrid';
import MyOpportunitiesSection from '../components/dashboard/MyOpportunitiesSection';
import ProfileSidebar from '../components/dashboard/ProfileSidebar';
import CandidaturesRecues from '../components/dashboard/CandidaturesRecues';
import MesCandidatures from '../components/dashboard/MesCandidatures';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [myOpportunites, setMyOpportunites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    const canPublish = user?.role === 'architecte' || user?.role === 'entreprise';
    const isCandidat = user?.role === 'artisan' || user?.role === 'laureat' || user?.role === 'restaurateur';

    const stats = { annoncesPubliees: myOpportunites.length, profilsVisites: 247, messagesNonLus: 3, connexions: 8 };

    useEffect(() => {
        const fetchMyOpportunites = async () => {
            if (!canPublish) { setLoading(false); return; }
            try {
                const res = await api.get('/my-opportunities');
                setMyOpportunites(res.data);
            } catch { }
            setLoading(false);
        };
        fetchMyOpportunites();
    }, [canPublish]);

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette opportunité ?')) return;
        setDeleting(id);
        try {
            await api.delete(`/opportunites/${id}`);
            setMyOpportunites(prev => prev.filter(opp => opp.id !== id));
        } catch { alert('Erreur'); }
        setDeleting(null);
    };

    const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <WelcomeHeader userName={user?.name} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsGrid stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ShortcutsGrid />
                        {canPublish && <CandidaturesRecues />}

                        {isCandidat && <MesCandidatures />}

                        {canPublish && (
                            <MyOpportunitiesSection
                                opportunites={myOpportunites}
                                loading={loading}
                                deleting={deleting}
                                onEdit={(id) => navigate(`/opportunites/edit/${id}`)}
                                onDelete={handleDelete}
                                formatDate={formatDate}
                            />
                        )}
                    </div>
                    <ProfileSidebar user={user} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
