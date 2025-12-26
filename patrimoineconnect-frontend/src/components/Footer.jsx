import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0f172a] text-gray-400 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="w-full py-8 px-6 md:px-12 lg:px-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-3">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-auto brightness-0 invert"
                            />
                            <span className="text-xl font-bold text-white">
                                PatrimoineConnect
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-300 max-w-xs mx-auto md:mx-0">
                            La plateforme de référence pour les professionnels de
                            l'architecture et de l'artisanat traditionnel marocain.
                        </p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                            Liens utiles
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="#" className="hover:text-white transition">À propos</Link></li>
                            <li><Link to="#" className="hover:text-white transition">Contact</Link></li>
                            <li><Link to="#" className="hover:text-white transition">Conditions d'utilisation</Link></li>
                            <li><Link to="#" className="hover:text-white transition">Confidentialité</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                            Suivez-nous
                        </h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10Zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5Zm0 9A3.5 3.5 0 1 1 15.5 13 3.5 3.5 0 0 1 12 16.5Zm5.8-9.9a1.3 1.3 0 1 1-1.3-1.3 1.3 1.3 0 0 1 1.3 1.3Z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3Zm7 0h3.8v1.7h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.5V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="max-w-6xl mx-auto border-t border-gray-800 pt-6 text-center text-sm text-gray-500 mt-8">
                    © {new Date().getFullYear()} PatrimoineConnect. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;






