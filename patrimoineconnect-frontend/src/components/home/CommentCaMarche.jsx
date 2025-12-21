// Composant CommentCaMarche - Les 3 étapes pour commencer

const CommentCaMarche = () => {
    // Les 3 étapes
    const etapes = [
        { id: 1, titre: "Créez votre profil", description: "Présentez votre expertise dans l'artisanat traditionnel.", couleur: "bg-blue-500" },
        { id: 2, titre: "Trouvez des opportunités", description: "Découvrez des projets patrimoniaux près de chez vous.", couleur: "bg-orange-500" },
        { id: 3, titre: "Collaborez", description: "Échangez avec les propriétaires de projets.", couleur: "bg-yellow-500" }
    ];

    return (
        <section id="comment-ca-marche" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Titre */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Rejoignez notre communauté et collaborez sur le patrimoine marocain.
                    </p>
                </div>

                {/* Grille des étapes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {etapes.map((etape) => (
                        <div key={etape.id} className="text-center p-8 rounded-2xl hover:shadow-xl transition-all">
                            {/* Numéro */}
                            <div className={`${etape.couleur} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                <span className="text-2xl font-bold">{etape.id}</span>
                            </div>
                            {/* Titre */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{etape.titre}</h3>
                            {/* Description */}
                            <p className="text-gray-600">{etape.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommentCaMarche;
