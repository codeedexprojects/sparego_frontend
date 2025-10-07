"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentBlockEditor from './ContentBlockEditor';
import { addBlog, editBlog } from '../../../../redux/slices/adminBlogSlice';
import { IMG_URL } from '@/redux/baseUrl';

export default function AddBlogModal({ onClose, onSubmit, existingBlog }) { // Remove products props
  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.adminBlog);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    image: null,
    // Remove relatedProductId
  });
  const [contentBlocks, setContentBlocks] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // Prefill form when editing - remove product-related code
  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title || '',
        excerpt: existingBlog.excerpt || '',
        image: null, // user can upload new image to replace
        // Remove relatedProductId assignment
      });
      setContentBlocks(existingBlog.contentBlocks || []);
      setImagePreview(existingBlog.image || null);
    }
  }, [existingBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contentBlocks.length === 0) {
      alert('Please add at least one content block');
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('excerpt', formData.excerpt);
    if (formData.image) submitData.append('image', formData.image);
    submitData.append('contentBlocks', JSON.stringify(contentBlocks));
    
    // Remove relatedProductId logic entirely

    try {
      if (existingBlog) {
        await dispatch(editBlog({ id: existingBlog._id, data: submitData })).unwrap();
      } else {
        await dispatch(addBlog(submitData)).unwrap();
      }
      onSubmit();
    } catch (err) {
      console.error('Failed to save blog:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {existingBlog ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <button onClick={onClose} disabled={addLoading} className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Blog Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Blog Image</label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={`${IMG_URL}/${imagePreview}`} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <label className="cursor-pointer inline-block">
                  <span className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50" disabled={addLoading}>
                    Choose File
                  </span>
                  <input type="file" onChange={handleImageChange} accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" disabled={addLoading} />
                </label>
                <p className="text-sm text-gray-600 mt-2">{formData.image ? formData.image.name : 'No file chosen'}</p>
                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP. Max 5MB.</p>
              </div>
            </div>
          </div>

          {/* Blog Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog title"
              required
              disabled={addLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Enter blog excerpt (brief summary)"
              required
              rows={3}
              disabled={addLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
            />
          </div>

          {/* Content Blocks Editor */}
          <ContentBlockEditor contentBlocks={contentBlocks} setContentBlocks={setContentBlocks} disabled={addLoading} />

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} disabled={addLoading} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={addLoading} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center gap-2">
              {addLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                existingBlog ? 'Update Blog' : 'Add Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}