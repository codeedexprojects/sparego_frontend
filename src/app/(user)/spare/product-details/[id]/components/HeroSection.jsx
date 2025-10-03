"use client";
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, CheckCircle, Truck, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addToWishlist, getWishlist } from '@/redux/slices/wishlistSlice';
import { addToCart, buyNow } from '@/redux/slices/cartSlice';
import { IMG_URL } from '@/redux/baseUrl';

const HeroSection = ({ activeTab, setActiveTab, product }) => {
    const [mainImage, setMainImage] = useState('');
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuyNowClick, setIsBuyNowClick] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const { wishlist } = useSelector((state) => state.wishlist);
    const tabs = ['TWO WHEELER', 'FOUR WHEELER'];

    useEffect(() => {
        if (product?._id && wishlist) {
            const isInWishlist = wishlist.some(item => item._id === product._id || item.productId === product._id);
            setIsFavorite(isInWishlist);
        }
    }, [product, wishlist]);

    useEffect(() => {
        if (product?.images && product.images?.length > 0) {
            setMainImage(`${IMG_URL}${product.images[0]}`);
        }
    }, [product]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getWishlist());
        }
    }, [dispatch]);

    const handleImageClick = (imageName) => {
        setMainImage(`${IMG_URL}${imageName}`);
    };

    const handleWishlistAction = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to manage your wishlist');
            router.push('/spare/login');
            return;
        }

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
                // Refresh wishlist to get updated data
                await dispatch(getWishlist());

                // Show appropriate message based on current state
                if (isFavorite) {
                    toast.success('Removed from wishlist!');
                } else {
                    toast.success('Added to wishlist successfully!');
                }
            } else {
                const error = resultAction.payload || 'Failed to update wishlist';
                toast.error(typeof error === 'string' ? error : 'Failed to update wishlist');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsAddingToWishlist(false);
        }
    };

    const handleAddToCart = async () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to your cart');
            router.push('/spare/login');
            return;
        }

        if (!product?._id) {
            toast.error('Product information is not available');
            return;
        }

        setIsAddingToCart(true);
        try {
            const resultAction = await dispatch(addToCart({
                productId: product._id,
                quantity: 1
            }));

            if (addToCart.fulfilled.match(resultAction)) {
                toast.success('Added to cart successfully!');
            } else {
                const error = resultAction.payload || 'Failed to add to cart';
                toast.error(typeof error === 'string' ? error : 'Failed to add to cart');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to buy products');
            router.push('/spare/login');
            return;
        }

        if (!product?._id) {
            toast.error('Product information is not available');
            return;
        }

        setIsBuyNowClick(true);
        try {
            const resultAction = await dispatch(buyNow({
                productId: product._id,
                quantity: 1
            }));

            if (buyNow.fulfilled.match(resultAction)) {
                toast.success('Redirecting to checkout...');
                router.push('/spare/checkout');
            } else {
                const error = resultAction.payload || 'Failed to buy now';
                toast.error(typeof error === 'string' ? error : 'Failed to add to cart');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsBuyNowClick(false);
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
            <div className="mb-6 text-sm text-gray-600">
                <span>
                    Filtered By: {product?.mainCategory?.name || 'Category'} - {product?.name || 'Product'}
                </span>
            </div>

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
                            onClick={handleWishlistAction}
                            disabled={isAddingToWishlist}
                            className={`flex items-center hover:text-red-600 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-500'
                                } ${isAddingToWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">
                                {isAddingToWishlist
                                    ? 'PROCESSING...'
                                    : isFavorite
                                        ? 'REMOVE FROM WISHLIST'
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
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgeG1lbnNpb249IjEuMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                        }}
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
                                        src={`${IMG_URL}/${image}`}
                                        alt={`Product view ${index + 2}`}
                                        className="w-full h-full object-contain p-2"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjNmNGY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button onClick={handleBuyNow}
                            disabled={isBuyNowClick}
                            className={`flex-1 bg-red-600 text-white py-3 px-6 rounded font-medium hover:bg-red-700 transition-colors ${isBuyNowClick ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isBuyNowClick ? (
                                <>
                                    ADDING...
                                </>
                            ) : (
                                <>
                                    BUY IT NOW
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className={`flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:bg-gray-50 transition-colors flex items-center justify-center ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isAddingToCart ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600 mr-2"></div>
                                    ADDING...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    ADD TO CART
                                </>
                            )}
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
                            ₹{calculateDiscountedPrice().toLocaleString()}
                        </span>
                        {product?.discount && (
                            <>
                                <span className="text-lg text-gray-500 line-through">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                <span className="text-green-600 font-medium">
                                    ({product.discount}% Off)
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stock Info */}
                    {product?.stock !== undefined && (
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