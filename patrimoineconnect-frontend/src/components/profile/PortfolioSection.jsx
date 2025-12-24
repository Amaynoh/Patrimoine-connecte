import { useRef } from 'react';
import Button from '../ui/Button';

const PortfolioSection = ({ images, onAddImages, onRemoveImage, uploading }) => {
    const fileInputRef = useRef(null);

    const handleAddClick = () => {
        if (!uploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));
        onAddImages(newImages);
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    🖼️ Mon Portfolio
                </h2>
                <Button
                    variant="primary"
                    className="text-sm"
                    onClick={handleAddClick}
                    disabled={uploading}
                >
                    {uploading ? '⏳ Upload en cours...' : '+ Ajouter des images'}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/jpg,image/gif"
                    multiple
                    className="hidden"
                />
            </div>

            {/* Indicateur de chargement pendant l'upload */}
            {uploading && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-lg text-sm flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Upload en cours, veuillez patienter...
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => onRemoveImage(image.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <div
                    onClick={handleAddClick}
                    className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 hover:border-[#D4A373] transition-colors ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                    <span className="text-3xl">+</span>
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Conseils pour vos photos :</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Utilisez un bon éclairage naturel</li>
                    <li>• Montrez vos créations sous différents angles</li>
                    <li>• Format recommandé : JPG ou PNG, max 5MB</li>
                </ul>
            </div>
        </div>
    );
};

export default PortfolioSection;

