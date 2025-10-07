"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog, clearErrors } from '../../../../redux/slices/adminBlogSlice';
import AddBlogModal from './AddBlogModal';
import DeleteConfirmationModal from '../../main-categories/components/DeleteModal';
import { toast, Toaster } from 'react-hot-toast'; // ✅ toast
import { IMG_URL } from '@/redux/baseUrl';

export default function BlogList() {
  const dispatch = useDispatch();
  const { blogs, loading, error, deleteLoading, deleteError } = useSelector((state) => state.adminBlog);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [deleteBlogItem, setDeleteBlogItem] = useState(null); // blog to delete
  const [editingBlog, setEditingBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error || deleteError) {
      toast.error(error || deleteError); // show error toast
      dispatch(clearErrors());
    }
  }, [error, deleteError, dispatch]);

  const handleDeleteConfirm = async () => {
    if (!deleteBlogItem) return;
    try {
      await dispatch(deleteBlog(deleteBlogItem._id)).unwrap();
      toast.success('Blog deleted successfully'); // ✅ success toast
      setDeleteBlogItem(null);
      dispatch(fetchBlogs());
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingBlog(null);
    setShowModal(false);
  };

  const handleBlogSubmit = () => {
    toast.success(editingBlog ? 'Blog updated successfully' : 'Blog added successfully'); // ✅ success toast
    dispatch(fetchBlogs());
    handleModalClose();
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Management</h1>

          {/* Search & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title or excerpt"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Excerpt</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBlogs.map((blog, index) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img src={`${IMG_URL}/${blog.image}`} alt={blog.title} className="h-12 w-12 rounded-lg object-cover" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{blog.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.excerpt}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(blog.createdAt)}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteBlogItem(blog)}
                        disabled={deleteLoading && deleteBlogItem?._id === blog._id}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {deleteLoading && deleteBlogItem?._id === blog._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBlogs.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">No blogs found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <AddBlogModal
          onClose={handleModalClose}
          onSubmit={handleBlogSubmit}
          existingBlog={editingBlog}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteBlogItem && (
        <DeleteConfirmationModal
          item={deleteBlogItem}
          onClose={() => setDeleteBlogItem(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Blog"
          description="Are you sure you want to delete this blog? This action cannot be undone."
        />
      )}
    </div>
  );
}
