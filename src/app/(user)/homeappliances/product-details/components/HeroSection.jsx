import React, { useState } from 'react';
import { Heart, MapPin, CheckCircle, Truck } from 'lucide-react';

const ProductDetailPage = () => {
    const [activeTab, setActiveTab] = useState('TWO WHEELER');
    const [mainImage, setMainImage] = useState('/home/product1.png');

    const tabs = ['TWO WHEELER', 'FOUR WHEELER'];

    const productImages = [
        '/home/product1.png',
        '/home/product2.png',
        '/home/product3.png',
    ];

    return (
        <div className=" mx-auto p-6 ">
            {/* Tabs */}
            <div className="flex mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === tab
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
                <span>Filtered By: Honda Activa - 2022  Castrol Power1 Engine Oil</span>
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
                        <button className="flex items-center text-red-500 hover:text-red-600">
                            <Heart className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">ADD TO WISHLIST</span>
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="flex gap-4">
                        {/* Main Image */}
                        <div className="flex-1">
                            <div className="bg-white border rounded-lg p-4 flex items-center justify-center">
                                <img
                                    src={mainImage}
                                    alt="Castrol Power1 Oil"
                                    className="max-w-[250px] max-h-[250px] object-contain"
                                />
                            </div>

                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex flex-col gap-2 w-20">
                            {productImages.slice(1).map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-white border rounded cursor-pointer hover:border-red-500 transition-colors aspect-square"
                                    onClick={() => setMainImage(image)}
                                >
                                    <img
                                        src={image}
                                        alt={`Product view ${index + 2}`}
                                        className="w-full h-full object-contain p-2"
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
                            <img
                                src="/api/placeholder/80/40"
                                alt="Castrol Brand"
                                className="h-8"
                            />
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Truck className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Deliver Within 8 Days</span>
                        </div>
                    </div>

                    {/* Product Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Castrol Power1 4T Scooter Oil 1 Ml
                        </h1>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-black">₹429</span>
                        <span className="text-lg text-gray-500 line-through">₹480</span>
                        <span className="text-green-600 font-medium">(15% Off)</span>
                    </div>

                    {/* Compatibility */}
                    <div className="flex items-center p-3    rounded">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-700 font-medium">Fits Your Honda Activa 2022</span>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Castrol Power1 4T Is A Premium Semi-Synthetic Engine Oil Designed For
                            Scooters And Motorcycles. It Ensures Smooth Acceleration, Enhanced Engine
                            Protection, And Optimal Performance In City Traffic Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;