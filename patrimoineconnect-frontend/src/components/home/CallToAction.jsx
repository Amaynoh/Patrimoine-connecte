import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CallToAction = () => {
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté
    const { user } = useSelector((state) => state.auth);
    const isAuthenticated = !!user;

    // Gérer le clic sur "Découvrir l'annuaire"
    const handleAnnuaireClick = () => {
        if (isAuthenticated) {
            // Si connecté, aller vers l'annuaire
            navigate('/annuaire');
        } else {
            // Si non connecté, rediriger vers inscription
            navigate('/register');
        }
    };

    return (
        <section className="relative py-20 bg-gradient-to-r from-[#78350f] to-[#b45309]">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Rejoignez PatrimoineConnect
                </h2>
                <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                    Participez à la préservation du patrimoine marocain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-[#78350f] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Créer mon profil
                    </button>
                    <button
                        onClick={handleAnnuaireClick}
                        className="text-white px-8 py-4 rounded-xl font-bold border-2 border-white/50 hover:border-white transition-all"
                    >
                        Découvrir l'annuaire
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
