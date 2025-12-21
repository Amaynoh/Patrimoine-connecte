import fesImg from '../../assets/fes.webp';
import marrakechImg from '../../assets/marakech.jpg';
import aitbenImg from '../../assets/aitben.webp';

const ProjetsSection = ({ projets }) => {
    const getImage = (projet) => {
        const titleLower = projet.titre.toLowerCase();

        if (titleLower.includes('fès') || titleLower.includes('dar el-makhzen')) {
            return fesImg;
        }
        if (titleLower.includes('marrakech')) {
            return marrakechImg;
        }
        if (titleLower.includes('aït benhaddou')) {
            return aitbenImg;
        }

        return projet.image;
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Projets en cours
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Découvrez les projets de restauration et de préservation en cours.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projets.map((projet) => (
                        <div
                            key={projet.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                        >
                            <img
                                src={getImage(projet)}
                                alt={projet.titre}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                        {projet.lieu}
                                    </span>
                                    <span className="text-sm text-green-600 font-medium">
                                        {projet.statut === 'en_cours' ? '🟢 En cours' : '✅ Terminé'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {projet.titre}
                                </h3>
                                <p className="text-gray-600 line-clamp-3">
                                    {projet.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjetsSection;
