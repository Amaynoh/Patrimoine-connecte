import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import AdminStats from '../components/admin/AdminStats';
import AdminCategories from '../components/admin/AdminCategories';
import AdminUsers from '../components/admin/AdminUsers';
import AdminOpportunites from '../components/admin/AdminOpportunites';
import AdminCandidatures from '../components/admin/AdminCandidatures';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [opportunites, setOpportunites] = useState([]);
    const [candidatures, setCandidatures] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!user || user.role !== 'admin') return <Navigate to="/dashboard" replace />;

    useEffect(() => {
        Promise.all([
            api.get('/admin/users'),
            api.get('/admin/opportunites'),
            api.get('/admin/candidatures'),
            api.get('/categories')
        ]).then(([u, o, c, cat]) => {
            setUsers(u.data.data || []);
            setOpportunites(o.data.data || []);
            setCandidatures(c.data.data || []);
            setCategories(cat.data || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center"><p>Chargement...</p></div>;

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C17A56] to-[#D4956A] text-white py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold">🛡️ Panel Administration</h1>
                    <p className="mt-2 text-white/80 italic">Bienvenue, {user?.name}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <AdminStats users={users} opportunites={opportunites} candidatures={candidatures} categories={categories} />
                <AdminCategories categories={categories} setCategories={setCategories} />
                <AdminUsers users={users} setUsers={setUsers} />
                <AdminOpportunites opportunites={opportunites} setOpportunites={setOpportunites} />
                <AdminCandidatures candidatures={candidatures} />
            </div>
        </div>
    );
};

export default AdminDashboard;
