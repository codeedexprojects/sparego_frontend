"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";
import BlogList from "./components/BlogList";
import AddBlogModal from "./components/AddBlogModal";
import { fetchBlogs } from "../../../redux/slices/adminBlogSlice";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((s) => s.adminBlog);

  const [showModal, setShowModal] = useState(false);

  // Fetch blogs only (no products)
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleAddBlog = () => {
    setShowModal(false);
    dispatch(fetchBlogs());
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
          >
            <span className="text-xl">+</span> Add New Blog
          </button>
        </div>

        <BlogList />

        {showModal && (
          <AddBlogModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddBlog}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default BlogsPage;