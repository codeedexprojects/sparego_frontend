"use client";
import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getMainCategories } from '@/redux/slices/categorySlice';
import { useRouter } from 'next/navigation';  
import { IMG_URL } from '@/redux/baseUrl';

const AutomotivePartsCatalog = () => {
  const [activeTab, setActiveTab] = useState('Two-wheeler');
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter(); 

  const { mainCategories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getMainCategories());
  }, [dispatch]);

  const filteredCategories = mainCategories.filter(
    category => category.type === activeTab
  );

  const mappedCategories = filteredCategories.map(category => ({
    id: category._id,
    title: category.name,
    image: category.image || '/home/part1.png',
    bgColor: 'bg-gray-50' 
  }));

  const visibleCategories = showMore ? mappedCategories : mappedCategories.slice(0, 6);

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error loading categories: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('Two-wheeler')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'Two-wheeler' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            TWO WHEELER
          </button>
          <button 
            onClick={() => setActiveTab('Four-wheeler')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'Four-wheeler' 
                ? 'text-gray-900 border-gray-900' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            FOUR WHEELER
          </button>
        </div>
     
      </div>

      {/* Categories Grid */}
      {mappedCategories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
            {visibleCategories.map((category, index) => (
              <div
                key={category.id || index}
                onClick={() => router.push(`/spare/category2/${category.id}`)}
                className="bg-white rounded-lg border border-gray-400 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-3 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center p-2`}>
                      <img 
                        src={`${IMG_URL}/${category.image} `}
                        alt={category.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mappedCategories.length > 6 && (
            <div className="flex justify-center">
              <button 
                onClick={() => setShowMore(!showMore)}
                className="px-6 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {showMore ? 'Load less' : 'Load more'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No categories found for {activeTab}</p>
        </div>
      )}
    </div>
  );
};

export default AutomotivePartsCatalog;
