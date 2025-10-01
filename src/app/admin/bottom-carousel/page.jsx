"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import {
    fetchBottomCarousels,
    addBottomCarousel,
    editBottomCarousel,
    deleteBottomCarousel
} from "../../../redux/slices/adminBottomCarouselSlice";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import BottomCarouselHeader from "./components/BottomCarouselHeader";
import BottomCarouselList from "./components/BottomCarouselList";
import BottomCarouselModal from "./components/BottomCarouselModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const BottomCarouselManager = () => {
    const dispatch = useDispatch();
    const { bottomCarousels, loading, error } = useSelector((s) => s.adminBottomCarousel);
    const { sections } = useSelector((s) => s.sections);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        section: "",
        image: null,
    });
    const [editingCarousel, setEditingCarousel] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        dispatch(fetchBottomCarousels());
        dispatch(fetchSections());
    }, [dispatch]);

    const openAddModal = () => {
        setFormData({ title: "", section: "", image: null });
        setPreview(null);
        setEditingCarousel(null);
        setIsModalOpen(true);
    };

    const openEditModal = (carousel) => {
        setFormData({
            title: carousel.title,
            section: carousel.section?._id || "",
            image: null,
        });
        setPreview(carousel.image || null);
        setEditingCarousel(carousel);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ title: "", section: "", image: null });
        setEditingCarousel(null);
        setPreview(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files[0]) {
            setFormData({ ...formData, image: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", formData.title);
        if (formData.section) form.append("section", formData.section);
        if (formData.image) form.append("image", formData.image);

        try {
            if (editingCarousel) {
                await dispatch(editBottomCarousel({ id: editingCarousel._id, data: form })).unwrap();
                toast.success("Bottom carousel updated successfully");
            } else {
                await dispatch(addBottomCarousel(form)).unwrap();
                toast.success("Bottom carousel added successfully");
            }
            closeModal();
            dispatch(fetchBottomCarousels());
        } catch (err) {
            toast.error(err?.message || "Error saving carousel");
        }
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await dispatch(deleteBottomCarousel(deleteConfirm._id)).unwrap();
            toast.success("Carousel deleted successfully");
            setDeleteConfirm(null);
            dispatch(fetchBottomCarousels());
        } catch (err) {
            toast.error("Failed to delete carousel");
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen">
                <div className="mx-auto">
                    {/* Header */}
                    <BottomCarouselHeader
                        carouselCount={bottomCarousels.length}
                        onAddCarousel={openAddModal}
                    />

                    {/* Carousel List */}
                    <BottomCarouselList
                        carousels={bottomCarousels}
                        loading={loading}
                        error={error}
                        onEdit={openEditModal}
                        onDelete={setDeleteConfirm}
                        onAddCarousel={openAddModal}
                    />

                    {/* Add/Edit Modal */}
                    {isModalOpen && (
                        <BottomCarouselModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onSubmit={handleSubmit}
                            formData={formData}
                            onChange={handleChange}
                            preview={preview}
                            onRemoveImage={() => {
                                setPreview(null);
                                setFormData({ ...formData, image: null });
                            }}
                            sections={sections}
                            editingCarousel={editingCarousel}
                        />
                    )}

                    {/* Delete Confirmation Modal */}
                    {deleteConfirm && (
                        <DeleteConfirmationModal
                            item={deleteConfirm}
                            onClose={() => setDeleteConfirm(null)}
                            onConfirm={confirmDelete}
                            title="Delete Carousel"
                            description={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
                        />
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default BottomCarouselManager;
