import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import api from "../api/axios";
import logo from "../assets/logo.png";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post('/login', { email, password });

            // Stockage dans localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Mise à jour du store Redux
            dispatch(loginSuccess({
                user: response.data.user,
                token: response.data.token
            }));

            navigate("/opportunites");
        } catch (err) {
            setError(err.response?.data?.message || "Identifiants incorrects");
        } finally {
            setLoading(false);
        }
    };

    // ... reste du rendu identique ...
    return (
        <div className="w-full flex-grow flex justify-center items-center px-4 py-4">
            <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-4">
                    <h1 className="text-lg font-bold text-slate-900 mb-1">Ravi de vous revoir</h1>
                </div>

                {/* Messages */}
                {successMessage && (
                    <div className="mb-2 p-2 rounded bg-emerald-50 text-emerald-700 text-xs flex items-center border border-emerald-100">
                        <span className="mr-2">✅</span> {successMessage}
                    </div>
                )}
                {error && (
                    <div className="mb-2 p-2 rounded bg-rose-50 text-rose-600 text-xs flex items-center border border-rose-100">
                        <span className="mr-2">⚠️</span> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@exemple.com"
                            required
                            className="w-full px-3 py-2 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 outline-none text-sm"
                        />
                    </div>

                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block">Mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2 bg-[#f0edeb] rounded border-transparent focus:border-[#8B5A2B] focus:bg-white focus:ring-0 pr-8 outline-none text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-[10px] font-semibold text-gray-500 hover:text-[#8B5A2B]">Mot de passe oublié ?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#8B5A2B] text-white font-bold py-2.5 rounded shadow-sm text-sm hover:bg-[#724C25] transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

