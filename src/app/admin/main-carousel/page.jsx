"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchSections } from "../../../redux/slices/sectionSlice";
import { getAllProducts } from "../../../redux/slices/adminProductSlice";
import {
    fetchMainCarousels,
    addMainCarousel,
    editMainCarousel,
    deleteMainCarousel
} from "../../../redux/slices/adminMainCarouselSlice";
import MainCarouselHeader from "./components/MainCarouselHeader";
import MainCarouselList from "./components/MainCarouselList";
import MainCarouselModal from "./components/MainCarouselModal";
import DeleteConfirmationModal from "../main-categories/components/DeleteModal";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

const MainCarouselManager = () => {
    const dispatch = useDispatch();
    const { mainCarousels, loading, error } = useSelector((s) => s.adminMainCarousel);
    const { sections } = useSelector((s) => s.sections);
    const { products } = useSelector((s) => s.adminProduct);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        section: "",
        products: [],
        image: null,
    });
    const [editingCarousel, setEditingCarousel] = useState(null);
    const [preview, setPreview] = useState(null);
    const [productSearch, setProductSearch] = useState("");

    useEffect(() => {
        dispatch(fetchMainCarousels());
        dispatch(fetchSections());
        dispatch(getAllProducts({})); // Fetch all products initially
    }, [dispatch]);

    // Open add modal
    const openAddModal = () => {
        setFormData({
            title: "",
            section: "",
            products: [],
            image: null
        });
        setPreview(null);
        setEditingCarousel(null);
        setProductSearch("");
        setIsModalOpen(true);
    };

    // Open edit modal
    const openEditModal = (carousel) => {
        setFormData({
            title: carousel.title,
            section: carousel.section?._id || "",
            products: carousel.products?.map(p => p._id) || [],
            image: null,
        });
        setPreview(carousel.image || null);
        setEditingCarousel(carousel);
        setProductSearch("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            title: "",
            section: "",
            products: [],
            image: null
        });
        setEditingCarousel(null);
        setPreview(null);
        setProductSearch("");
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

    const handleProductSearch = (e) => {
        const searchTerm = e.target.value;
        setProductSearch(searchTerm);
        dispatch(getAllProducts({ search: searchTerm }));
    };

    const handleProductSelect = (productId) => {
        const currentProducts = [...formData.products];
        if (currentProducts.includes(productId)) {
            // Remove product if already selected
            setFormData({
                ...formData,
                products: currentProducts.filter(id => id !== productId)
            });
        } else {
            // Add product if not selected
            setFormData({
                ...formData,
                products: [...currentProducts, productId]
            });
        }
    };

    const removeSelectedProduct = (productId) => {
        setFormData({
            ...formData,
            products: formData.products.filter(id => id !== productId)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", formData.title);
        if (formData.section) form.append("section", formData.section);

        formData.products.forEach((id) => {
            form.append("products", id);
        });

        if (formData.image) form.append("image", formData.image);

        try {
            if (editingCarousel) {
                await dispatch(editMainCarousel({ id: editingCarousel._id, data: form })).unwrap();
                toast.success("Main carousel updated successfully");
            } else {
                await dispatch(addMainCarousel(form)).unwrap();
                toast.success("Main carousel added successfully");
            }
            closeModal();
            dispatch(fetchMainCarousels());
        } catch (err) {
            toast.error(err?.message || "Error saving carousel");
        }
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        try {
            await dispatch(deleteMainCarousel(deleteConfirm._id)).unwrap();
            toast.success("Carousel deleted successfully");
            setDeleteConfirm(null);
            dispatch(fetchMainCarousels());
        } catch (err) {
            toast.error("Failed to delete carousel");
        }
    };

    const getSelectedProducts = () => {
        return products.filter(product => formData.products.includes(product._id));
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen">
                <div className="mx-auto">
                    {/* Header */}
                    <MainCarouselHeader
                        carouselCount={mainCarousels.length}
                        onAddCarousel={openAddModal}
                    />

                    {/* Carousel List */}
                    <MainCarouselList
                        carousels={mainCarousels}
                        loading={loading}
                        error={error}
                        onEdit={openEditModal}
                        onDelete={setDeleteConfirm}
                        onAddCarousel={openAddModal}
                    />

                    {/* Add/Edit Modal */}
                    {isModalOpen && (
                        <MainCarouselModal
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
                            products={products}
                            productSearch={productSearch}
                            onProductSearch={handleProductSearch}
                            onProductSelect={handleProductSelect}
                            onRemoveProduct={removeSelectedProduct}
                            selectedProducts={getSelectedProducts()}
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

export default MainCarouselManager;