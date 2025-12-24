const SearchBar = ({ value, onChange, placeholder = "Rechercher...", resultCount }) => {
    return (
        <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 
                             focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent
                             bg-white shadow-sm"
                />
                <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            {resultCount !== undefined && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                    {resultCount} résultat(s) trouvé(s)
                </p>
            )}
        </div>
    );
};

export default SearchBar;
