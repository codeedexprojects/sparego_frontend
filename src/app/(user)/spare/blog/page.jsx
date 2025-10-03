"use client"
import Footer from "@/components/landing/Footer";
import Header from "@/components/user/homeappliance/Header";
import { IMG_URL } from "@/redux/baseUrl";
import { getBlogs } from "@/redux/slices/blogSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const page = () => {
  const dispatch = useDispatch();
  const{blogs, loading, error}=useSelector((state)=>state.blogs)


  useEffect(()=>{
    dispatch(getBlogs())
  },[dispatch])

  const router = useRouter();

  
   if (loading) return <p>Loading Blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <div>
      <Header></Header>
       <div className="bg-white py-12 px-6 lg:px-20">

  {/* Grid Layout */}
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {blogs.map((blog) => (
      <div
        key={blog._id}
        className="bg-white border rounded-lg shadow-sm p-4 flex flex-col"
      >
        <img
          src={`${IMG_URL}/${blog.image}`}
          alt={blog.title}
          className="w-100 h-100 rounded object-contain mb-4"
        />
        <h3 className="text-gray-900 font-semibold mb-1">“{blog.title}”</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{blog.excerpt}</p>
        <p className="text-xs text-gray-500 mb-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <button
          onClick={() => router.push(`/spare/blog-detail/${blog._id}`)}
          className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Read More
        </button>
      </div>
    ))}
  </div>
</div>

        <Footer></Footer>
    </div>
  );
};

export default page;
