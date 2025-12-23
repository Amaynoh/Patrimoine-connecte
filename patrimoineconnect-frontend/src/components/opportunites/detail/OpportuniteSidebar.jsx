import React from 'react';

const OpportuniteSidebar = ({ user }) => {
    return (
        <div className="space-y-6">

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{user?.name || 'Aicha Bennani'}</h3>
                <p className="text-sm text-gray-500 mb-2">{user?.role || 'Directrice des Projets Culturels'}</p>
                <div className="flex justify-center items-center text-yellow-400 text-sm mb-4">
                    ★★★★★ <span className="text-gray-400 ml-1 text-xs">(4.9)</span>
                </div>

                <div className="text-left text-sm text-gray-500 space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                        <span>🏛️</span>
                        <span>Fondation Hassan II</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>Rabat, Maroc</span>
                    </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    ✉️ Contacter l'émetteur
                </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Statistiques</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Vues</span>
                        <span className="font-bold text-gray-900">1,247</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Candidatures</span>
                        <span className="font-bold text-gray-900">23</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Favoris</span>
                        <span className="font-bold text-gray-900">156</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Taux de réponse</span>
                        <span className="font-bold text-green-500">94%</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OpportuniteSidebar;
