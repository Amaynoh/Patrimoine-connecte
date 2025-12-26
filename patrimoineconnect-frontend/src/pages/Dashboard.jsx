import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import ShortcutsGrid from '../components/dashboard/ShortcutsGrid';
import MyOpportunitiesSection from '../components/dashboard/MyOpportunitiesSection';
import ProfileSidebar from '../components/dashboard/ProfileSidebar';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [myOpportunites, setMyOpportunites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const canPublish = user?.role === 'architecte' || user?.role === 'entreprise';
    const stats = {
        annoncesPubliees: myOpportunites.length,
        profilsVisites: 247,
        messagesNonLus: 3,
        connexions: 8
    };

    useEffect(() => {
        const fetchMyOpportunites = async () => {
            if (!canPublish) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get('/my-opportunities');
                setMyOpportunites(response.data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyOpportunites();
    }, [canPublish]);
    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette opportunité ?')) return;
        setDeleting(id);
        try {
            await api.delete(`/opportunites/${id}`);
            setMyOpportunites(myOpportunites.filter(opp => opp.id !== id));
        } catch (error) {
            alert('Erreur lors de la suppression');
        } finally {
            setDeleting(null);
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <WelcomeHeader userName={user?.name} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsGrid stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ShortcutsGrid />
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
