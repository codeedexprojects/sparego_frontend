import Footer from "@/components/landing/Footer";
import Header from "@/components/user/spare/Header";
import React from "react";

const page = () => {
  const blogs = [
    {
      id: 1,
      image: "/about/blog.png",
      title: "How to Choose the Right Engine Oil",
      description:
        "Understand oil grades, types, and what suits your scooter best.",
      time: "4 Min",
      date: "August 19, 2022",
    },
    {
      id: 2,
      image: "/about/blog.png",
      title: "Top 5 Signs Your Brake Pads Need Replacing",
      description:
        "Squeaking or longer stopping distances? Your brakes might need attention.",
      time: "4 Min",
      date: "August 19, 2022",
    },
    {
      id: 3,
      image: "/about/blog.png",
      title: "When to Replace Your Oil Filter",
      description:
        "Learn how often to change oil filters and avoid engine wear.",
      time: "4 Min",
      date: "August 19, 2022",
    },
  ];

  return (
    <div>
        <Header></Header>
        <div className="bg-white py-12 px-6 lg:px-20">
          {/* Section Title */}
          <h2 className="text-lg font-bold text-red-600 mb-8">SpareGo Blog</h2>
    
          {/* Blog Cards */}
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between bg-white border rounded-lg shadow-sm p-4"
              >
                {/* Image + Content */}
                <div className="flex items-center gap-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">
                      “{blog.title}”
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{blog.description}</p>
                    <p className="text-xs text-gray-500">
                      {blog.time} • {blog.date}
                    </p>
                  </div>
                </div>
    
                {/* Read More Button */}
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                  Read More
                </button>
              </div>
            ))}
          </div>
    
          {/* Load More */}
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
