import InputField from '../ui/InputField';
import TextArea from '../ui/TextArea';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';

const ProfileForm = ({ formData, onChange, onSubmit, email, saving, error, success, onCancel }) => {

    const cityOptions = [
        { value: 'Casablanca', label: 'Casablanca' },
        { value: 'Rabat', label: 'Rabat' },
        { value: 'Marrakech', label: 'Marrakech' },
        { value: 'Fès', label: 'Fès' },
        { value: 'Tanger', label: 'Tanger' },
        { value: 'Salé', label: 'Salé' },
        { value: 'Meknès', label: 'Meknès' },
        { value: 'Agadir', label: 'Agadir' }
    ];

    const specialtyOptions = [
        { value: 'Poterie traditionnelle', label: 'Poterie traditionnelle' },
        { value: 'Zellige', label: 'Zellige' },
        { value: 'Menuiserie', label: 'Menuiserie' },
        { value: 'Ferronnerie', label: 'Ferronnerie' },
        { value: 'Sculpture sur plâtre', label: 'Sculpture sur plâtre' },
        { value: 'Tapis et tissage', label: 'Tapis et tissage' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Restauration', label: 'Restauration' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                👤 Informations personnelles
            </h2>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Nom complet"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Votre nom"
                        required
                    />
                    <SelectField
                        label="Ville"
                        name="city"
                        value={formData.city}
                        onChange={onChange}
                        options={cityOptions}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                        label="Spécialité"
                        name="specialty"
                        value={formData.specialty}
                        onChange={onChange}
                        options={specialtyOptions}
                    />
                    <InputField
                        label="Téléphone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="+212 6 12 34 56 78"
                    />
                </div>
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={email || ''}
                    onChange={() => { }}
                    disabled
                />
                <p className="text-xs text-gray-400 -mt-4">
                    Pour modifier votre email, contactez le support
                </p>
                <TextArea
                    label="Biographie"
                    name="bio"
                    value={formData.bio}
                    onChange={onChange}
                    placeholder="Décrivez votre parcours et vos compétences..."
                    rows={5}
                />
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                        {success}
                    </div>
                )}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? 'Enregistrement...' : '💾 Enregistrer les modifications'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
