"use client"
import React, { useEffect } from "react";
import { Calendar, Clock, Tag, ShoppingCart, Star } from "lucide-react";
import { getBlogById } from "@/redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { IMG_URL } from "@/redux/baseUrl";
import Link from "next/link";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
    }
  }, [id, dispatch]);

  if (loading) return <p className="text-center py-10">Loading blog...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!blog) return <p className="text-center py-10">No blog found</p>;

  const calculateDiscount = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
   <div className="bg-white py-10 px-6 lg:px-20">
  <div className="max-w-8xl mx-auto">
    <div className="mb-6">
     <div className="relative rounded-lg overflow-hidden">
  <img
    src={`${IMG_URL}/${blog.image}`}
    alt={blog.title}
    className="w-full h-80 object-contain bg-black" 
  />
  <h1 className="absolute bottom-4 left-4 text-white text-2xl md:text-3xl font-bold bg-black/50 px-4 py-2 rounded">
    {blog.title}
  </h1>
</div>

    </div>
    <div className="flex items-center gap-6 text-gray-500 text-sm mb-10">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>4 min read</span>
      </div>
    </div>
    <div className="space-y-6 mb-12">
      {blog.contentBlocks.map((block) => {
        if (block.type === "heading") {
          return (
            <h2
              key={block._id}
              className="text-xl md:text-2xl font-semibold text-red-600 mb-3"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={block._id} className="text-gray-700 leading-relaxed">
              {block.text}
            </p>
          );
        }
        return null;
      })}
    </div>
    
    {/* Related Products Section */}
    {blog.relatedProducts && blog.relatedProducts.length > 0 && (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black">
          <Tag className="w-6 h-6 text-red-600" />
          Related Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.relatedProducts.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`${IMG_URL}/${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-contain p-4 bg-white"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-black text-lg line-clamp-2 h-14">
                  {product.name}
                </h3>
                <h3 className="font-normal text-black text-lg  line-clamp-2 ">
                  {product.description}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        fill={i < 4 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(42)</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-xl font-bold text-red-600">
                        ₹{calculateDiscount(product.price, product.discount).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-red-600">
                      ₹{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Link 
                    href={`/spare/product-details/${product._id}`}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default BlogDetail;