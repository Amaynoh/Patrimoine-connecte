import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";

const HeroSection = () => {
    return (
        <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
                    Découvrez le patrimoine marocain à travers notre plateforme dédiée aux professionnels
                    de l'architecture et de l'artisanat traditionnel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/register"
                        className="bg-[#78350f] hover:bg-[#632c0c] text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
                    >
                        Rejoindre la communauté
                    </Link>
                    <Link
                        to="#comment-ca-marche"
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl border border-white/30 transition-all"
                    >
                        En savoir plus
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
