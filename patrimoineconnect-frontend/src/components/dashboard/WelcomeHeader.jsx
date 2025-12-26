import { Link } from 'react-router-dom';

const WelcomeHeader = ({ userName }) => {
    return (
        <div className="bg-gradient-to-r from-[#C17A56] to-[#D4956A] text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Bienvenue, {userName || 'Utilisateur'} !
                </h1>
                <p className="mt-2 text-white/80 italic">
                    "Le patrimoine n'est pas seulement ce que nous héritons du passé, mais ce que nous créons pour l'avenir."
                </p>
            </div>
        </div>
    );
};

export default WelcomeHeader;
