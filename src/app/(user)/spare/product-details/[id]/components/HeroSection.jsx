import React, { useState, useEffect } from 'react';
import { Heart, MapPin, CheckCircle, Truck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { addToWishlist } from '@/redux/slices/wishlistSlice';

const HeroSection = ({ activeTab, setActiveTab, isFavorite, setIsFavorite, product }) => {
    const [mainImage, setMainImage] = useState('');
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    const dispatch = useDispatch();

    const tabs = ['TWO WHEELER', 'FOUR WHEELER'];

    // Set main image when product loads
    useEffect(() => {
        if (product?.images && product.images.length > 0) {
            const imageBaseUrl = '/api/images/';
            setMainImage(`${imageBaseUrl}${product.images[0]}`);
        }
    }, [product]);

    const handleImageClick = (imageName) => {
        const imageBaseUrl = '/api/images/';
        setMainImage(`${imageBaseUrl}${imageName}`);
    };

    const handleAddToWishlist = async () => {
        if (!product?._id) {
            toast.error('Product information is not available');
            return;
        }

        setIsAddingToWishlist(true);
        try {
            const resultAction = await dispatch(addToWishlist({
                productId: product._id
            }));

            if (addToWishlist.fulfilled.match(resultAction)) {
                setIsFavorite(true);
                toast.success('Added to wishlist successfully!');
            } else {
                const error = resultAction.payload || 'Failed to add to wishlist';
                toast.error(typeof error === 'string' ? error : 'Failed to add to wishlist');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsAddingToWishlist(false);
        }
    };

    const calculateDiscountedPrice = () => {
        if (product?.discount) {
            return product.price - (product.price * product.discount / 100);
        }
        return product?.price || 0;
    };

    const getCompatibleVehicleInfo = () => {
        if (product?.compatibleVehicles && product.compatibleVehicles.length > 0) {
            const vehicle = product.compatibleVehicles[0];
            return `Fits Your ${vehicle.modelLine || 'Vehicle'} ${vehicle.year || ''}`;
        }
        return 'Compatible Vehicle Information';
    };

    return (
        <div className="mx-auto p-6">
            {/* Tabs */}
            <div className="flex mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                            activeTab === tab
                                ? 'border-red-500 text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Info */}
            <div className="mb-6 text-sm text-gray-600">
                <span>
                    Filtered By: {product?.mainCategory?.name || 'Category'} - {product?.name || 'Product'}
                </span>
            </div>

            {/* Main Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* Delivery and Wishlist Row */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                            <span className="text-sm">Delivering To Perinthalmanna 686551</span>
                        </div>
                        <button 
                            onClick={handleAddToWishlist}
                            disabled={isAddingToWishlist}
                            className={`flex items-center hover:text-red-600 transition-colors ${
                                isFavorite ? 'text-red-500' : 'text-gray-500'
                            } ${isAddingToWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">
                                {isAddingToWishlist 
                                    ? 'ADDING...' 
                                    : isFavorite 
                                        ? 'ADDED TO WISHLIST' 
                                        : 'ADD TO WISHLIST'
                                }
                            </span>
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="flex gap-4">
                        {/* Main Image */}
                        <div className="flex-1">
                            <div className="bg-white border rounded-lg p-4 flex items-center justify-center">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt={product?.name || 'Product Image'}
                                        className="max-w-[250px] max-h-[250px] object-contain"
                                    />
                                ) : (
                                    <div className="w-[250px] h-[250px] bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-gray-500">No Image Available</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex flex-col gap-2 w-20">
                            {product?.images && product.images.slice(1, 4).map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-white border rounded cursor-pointer hover:border-red-500 transition-colors aspect-square"
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img
                                        src={`/api/images/${image}`}
                                        alt={`Product view ${index + 2}`}
                                        className="w-full h-full object-contain p-2"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/80/80';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded font-medium hover:bg-red-700 transition-colors">
                            BUY NOW
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:bg-gray-50 transition-colors">
                            ADD TO CART
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Brand and Delivery Info */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-800">
                                {product?.partNumber || 'Product Code'}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Truck className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Deliver Within 8 Days</span>
                        </div>
                    </div>

                    {/* Product Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {product?.name || 'Product Name'}
                        </h1>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-black">
                            ₹{calculateDiscountedPrice()}
                        </span>
                        {product?.discount && (
                            <>
                                <span className="text-lg text-gray-500 line-through">
                                    ₹{product.price}
                                </span>
                                <span className="text-green-600 font-medium">
                                    ({product.discount}% Off)
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stock Info */}
                    {product?.stock && (
                        <div className="text-sm text-gray-600">
                            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>
                    )}

                    {/* Compatibility */}
                    <div className="flex items-center p-3 rounded">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-700 font-medium">
                            {getCompatibleVehicleInfo()}
                        </span>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product?.description || 'No description available'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;