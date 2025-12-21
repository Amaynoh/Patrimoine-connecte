// Composant Temoignages - Ce que disent nos membres

const Temoignages = () => {
    // Liste des témoignages
    const temoignages = [
        { id: 1, nom: "Ahmed Benali", metier: "Maître artisan", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", message: "PatrimoineConnect m'a permis de décrocher des commandes." },
        { id: 2, nom: "Fatima Mouni", metier: "Architecte", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", message: "J'ai découvert des projets passionnants." },
        { id: 3, nom: "Youssef Tazi", metier: "Restaurateur", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", message: "Une communauté qui valorise nos savoir-faire." }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Titre */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ce que disent nos membres
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Découvrez les témoignages de notre communauté.
                    </p>
                </div>

                {/* Grille des témoignages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {temoignages.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                            {/* Citation */}
                            <p className="text-gray-600 mb-6 italic">"{t.message}"</p>
                            {/* Auteur */}
                            <div className="flex items-center">
                                <img src={t.photo} alt={t.nom} className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-amber-200" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{t.nom}</h4>
                                    <p className="text-sm text-amber-600">{t.metier}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Temoignages;
