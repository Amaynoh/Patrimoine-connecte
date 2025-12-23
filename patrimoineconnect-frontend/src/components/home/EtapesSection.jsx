const EtapesSection = ({ etapes }) => {
    const icones = ['👤', '🔍', '🤝'];

    return (
        <section id="comment-ca-marche" className="py-10 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Rejoignez notre communauté et collaborez sur le patrimoine marocain.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {etapes.map((etape) => {
                        const icone = icones[etape.id - 1] || '⭐';
                        return (
                            <div
                                key={etape.id}
                                className="text-center p-8 rounded-2xl hover:shadow-xl transition-all"
                            >
                                <div
                                    className={`${etape.couleur} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                                >
                                    <span className="text-2xl">{icone}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {etape.titre}
                                </h3>
                                <p className="text-gray-600">{etape.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EtapesSection;
