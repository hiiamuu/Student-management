const FormField = ({ label, error, children }) => (
    <div className="mb-5">
        {label && (
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} <span className="text-red-600">*</span>
            </label>
        )}
        {children}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

export default FormField;
