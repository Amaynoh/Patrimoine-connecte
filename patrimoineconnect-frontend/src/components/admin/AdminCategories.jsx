import { useState } from 'react';
import api from '../../api/axios';

const AdminCategories = ({ categories, setCategories }) => {
    const [newCat, setNewCat] = useState('');
    const [edit, setEdit] = useState({ id: null, name: '' });

    const add = () => {
        if (!newCat.trim()) return;
        api.post('/admin/categories', { name: newCat })
            .then(r => { setCategories([...categories, r.data]); setNewCat(''); })
            .catch(e => alert(e.response?.data?.message || 'Erreur'));
    };

    const update = () => {
        if (!edit.name.trim()) return;
        api.put(`/admin/categories/${edit.id}`, { name: edit.name })
            .then(r => { setCategories(categories.map(c => c.id === edit.id ? r.data : c)); setEdit({ id: null, name: '' }); })
            .catch(e => alert(e.response?.data?.message || 'Erreur'));
    };

    const del = (id, name) => {
        if (!window.confirm(`Supprimer "${name}" ?`)) return;
        api.delete(`/admin/categories/${id}`)
            .then(() => setCategories(categories.filter(c => c.id !== id)))
            .catch(() => alert('Erreur'));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">🏷️ Catégories</h2>
            <div className="flex gap-2 mb-4">
                <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Nouvelle catégorie..." className="flex-1 border rounded-lg px-3 py-2" />
                <button onClick={add} className="bg-[#C17A56] text-white px-4 py-2 rounded-lg hover:bg-[#A86544]">+ Ajouter</button>
            </div>
            {categories.length === 0 ? <p className="text-gray-500 text-center py-4">Aucune catégorie</p> : (
                <div className="space-y-2">
                    {categories.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            {edit.id === c.id ? (
                                <div className="flex gap-2 flex-1">
                                    <input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} className="flex-1 border rounded px-2 py-1" />
                                    <button onClick={update} className="text-green-600">✅</button>
                                    <button onClick={() => setEdit({ id: null, name: '' })} className="text-gray-600">❌</button>
                                </div>
                            ) : (
                                <>
                                    <span className="font-medium">{c.name}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEdit({ id: c.id, name: c.name })} className="text-blue-600 text-sm">✏️</button>
                                        <button onClick={() => del(c.id, c.name)} className="text-red-600 text-sm">🗑️</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
