"use client"
import Footer from "@/components/landing/Footer";
import Header from "@/components/user/spare/Header";
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
          <h2 className="text-lg font-bold text-red-600 mb-8">SpareGo Blog</h2>
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-center justify-between bg-white border rounded-lg shadow-sm p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${IMG_URL}/${blog.image}`}
                    alt={blog.title}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">
                      “{blog.title}”
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                    <p className="text-xs text-gray-500">
                     {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button onClick={()=>router.push(`/spare/blog-detail/${blog._id}`)}className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                  Read More
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-2 border text-black border-gray-400 rounded hover:bg-gray-50 transition-colors">
              Load more
            </button>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default page;
