import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'laureat',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const roles = [
        { id: 'laureat', name: 'Lauréat' },
        { id: 'artisan', name: 'Artisan' },
        { id: 'architecte', name: 'Architecte' },
        { id: 'restaurateur', name: 'Restaurateur' },
        { id: 'entreprise', name: 'Entreprise' },
    ];

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.password_confirmation) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            await api.post('/register', formData);
            navigate('/login', { state: { message: 'Inscription réussie ! Veuillez vous connecter.' } });
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Erreur lors de l'inscription";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full font-sans flex flex-col min-h-screen justify-center bg-gray-50">
            <main className="flex-grow flex justify-center items-center px-4 py-4 overflow-auto">
                <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100">

                    <div className="text-center mb-2">
                        <h1 className="text-lg font-bold text-slate-900">Créer un compte</h1>
                    </div>

                    {error && (
                        <div className="mb-2 p-2 rounded bg-rose-50 text-rose-600 text-xs flex items-center border border-rose-100">
                            <span className="mr-1">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="space-y-0.5">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Nom complet</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none text-gray-800 text-sm"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Email</label>
                            <input type="email" name="email" value={formData.email}onChange={handleChange} className="w-full px-3 py-1.5 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none text-gray-800 text-sm" placeholder="nom@exemple.com" required/>
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Type de compte</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none text-gray-800 text-sm cursor-pointer"
                            >
                                {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-0.5">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none pr-8 text-gray-800 text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-0.5">
                            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Confirmer</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none text-gray-800 text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#8B5A2B] hover:bg-[#724C25] text-white font-bold py-2.5 rounded shadow-sm transition-all duration-300 transform active:scale-[0.98] mt-2 text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Inscription...' : "S'inscrire"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            Déjà inscris ? <Link to="/login" className="text-[#8B5A2B] font-bold hover:underline">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;


