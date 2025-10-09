import React from 'react';

const BottomCarouselModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    onChange,
    preview,
    onRemoveImage,
    sections,
    editingCarousel
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {editingCarousel ? "Edit Bottom Carousel" : "Add New Bottom Carousel"}
                    </h2>
                </div>
                <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                    <FormInput
                        label="Title *"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        placeholder="Enter carousel title"
                        required
                    />

                    <FormSelect
                        label="Section (Optional)"
                        name="section"
                        value={formData.section}
                        onChange={onChange}
                    >
                        <option value="">Spare Parts</option>
                        {sections.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.title}
                            </option>
                        ))}
                    </FormSelect>

                    <ImageUpload
                        preview={preview}
                        onChange={onChange}
                        onRemove={onRemoveImage}
                        required={!editingCarousel}
                        label="Carousel Image *"
                    />

                    <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.title || (!editingCarousel && !preview)}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editingCarousel ? "Update Carousel" : "Add Carousel"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Reusable Form Components
const FormInput = ({ label, name, value, onChange, placeholder, required = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const FormSelect = ({ label, name, value, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {children}
        </select>
    </div>
);

const ImageUpload = ({ preview, onChange, onRemove, required = false, label }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center justify-center w-full">
            {preview ? (
                <div className="relative w-full">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    >
                        ×
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input type="file" name="image" accept="image/*" onChange={onChange} className="hidden" required={required} />
                </label>
            )}
        </div>
    </div>
);

export default BottomCarouselModal;
