import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Nettoyage localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Dispatch Redux
        dispatch(logout());

        // Redirection
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100/50">
            <div className="w-full flex items-center justify-between px-4 py-3">
                <Link
                    to="/"
                    className="flex items-center space-x-3 group"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-amber-900/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-black text-[#451a03] tracking-tight">
                        PatrimoineConnect
                    </span>
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/opportunites" className="text-gray-700 hover:text-[#D4A373] transition-colors font-medium">
                        Opportunités
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-sm font-semibold text-gray-600 hover:text-[#78350f] transition-colors"
                            >
                                👤 {user?.name || "Mon Profil"}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
                            >
                                Se déconnecter
                            </button>
                            <Link
                                to="/opportunites/create"
                                className="bg-[#78350f] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-900/20 hover:bg-[#632c0c] transition-all"
                            >
                                + Créer
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-[#78350f] text-sm font-semibold transition-colors"
                            >
                                Se connecter
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#78350f] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-900/20 hover:bg-[#632c0c] hover:shadow-amber-900/40 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700 focus:outline-none"
                    aria-label="Menu"
                >
                    {!isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 pt-2 space-y-4 bg-white shadow-xl">
                    <Link
                        to="/opportunites"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 font-semibold"
                    >
                        Opportunités
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/opportunites/create"
                                onClick={() => setIsOpen(false)}
                                className="block text-[#78350f] font-bold"
                            >
                                + Créer une opportunité
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left text-red-600 font-semibold mt-4"
                            >
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block text-gray-700 font-semibold"
                            >
                                Se connecter
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setIsOpen(false)}
                                className="block text-center bg-[#78350f] text-white py-3 rounded-xl font-bold shadow-lg"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

