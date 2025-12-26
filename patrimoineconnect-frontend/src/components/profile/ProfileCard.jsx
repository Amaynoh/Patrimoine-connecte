import { useRef, useState } from 'react';
import api from '../../api/axios';

const ProfileCard = ({ user, onPhotoUpdate }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const getPhotoUrl = () => {
        if (!user?.photo) return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200';
        return user.photo.startsWith('http') ? user.photo : `http://127.0.0.1:8000/storage/${user.photo}`;
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }

        setUploading(true);
        const fd = new FormData();
        fd.append('photo', file);

        try {
            const res = await api.post('/profile/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (onPhotoUpdate) onPhotoUpdate(res.data.user);
        } catch (err) {
            alert(err.response?.data?.errors?.photo?.[0] || 'Erreur upload');
        } finally { setUploading(false); }
    };

    const InfoItem = ({ icon, text }) => text && (
        <div className="flex items-center gap-3">
            <span className="text-gray-400">{icon}</span>
            <span>{text}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#D4A373]/30 mb-4 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                    <img src={getPhotoUrl()} alt="Photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-2xl">📷</span>
                    </div>
                    {uploading && <div className="absolute inset-0 bg-black/70 flex items-center justify-center"><span className="text-white text-sm">Upload...</span></div>}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Utilisateur'}</h2>
                <p className="text-[#D4A373] text-sm font-medium">{user?.specialty || user?.role || 'Membre'}</p>
                <p className="text-xs text-gray-400 mt-1">Cliquez sur la photo pour la modifier</p>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
                <InfoItem icon="📍" text={user?.city && `${user.city}, Maroc`} />
                <InfoItem icon="✉️" text={user?.email} />
                <InfoItem icon="📞" text={user?.phone} />
            </div>
        </div>
    );
};

export default ProfileCard;
