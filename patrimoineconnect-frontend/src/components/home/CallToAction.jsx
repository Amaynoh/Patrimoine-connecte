import { Link } from "react-router-dom";

const CallToAction = () => {
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
                    <Link
                        to="/register"
                        className="bg-white text-[#78350f] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Créer mon profil
                    </Link>
                    <Link
                        to="#"
                        className="text-white px-8 py-4 rounded-xl font-bold border-2 border-white/50 hover:border-white transition-all"
                    >
                        Découvrir l'annuaire
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
