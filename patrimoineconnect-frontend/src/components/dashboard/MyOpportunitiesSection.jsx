import { Link } from 'react-router-dom';
import OpportunityItem from './OpportunityItem';

const MyOpportunitiesSection = ({
    opportunites,
    loading,
    deleting,
    onEdit,
    onDelete,
    formatDate
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#6B1C23]">Mes Annonces Publiées</h2>
                    <p className="text-sm text-gray-500 mt-1">Gérez vos opportunités de patrimoine marocain</p>
                </div>
                <Link
                    to="/opportunites/create"
                    className="inline-flex items-center gap-2 bg-[#C17A56] hover:bg-[#A96745] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Publier une nouvelle opportunité
                </Link>
            </div>

            <div className="divide-y divide-gray-100">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Chargement...</div>
                ) : opportunites.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">Aucune opportunité publiée</p>
                        <Link to="/opportunites/create" className="text-[#C17A56] hover:underline font-medium">
                            Créer votre première opportunité
                        </Link>
                    </div>
                ) : (
                    opportunites.map((opp) => (
                        <OpportunityItem
                            key={opp.id}
                            opportunite={opp}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            deleting={deleting}
                            formatDate={formatDate}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOpportunitiesSection;
