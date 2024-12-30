"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { MdArticle } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";
import { Bookmark } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div
      id="blogs-section"
      className="bg-white dark:bg-black font-sans p-4 transition-colors duration-300 animate-fadeIn"
    >
      <div className="max-w-7xl max-lg:max-w-3xl max-md:max-w-sm mx-auto">
        <div className="flex-1">
          <div className="py-4 animate-slideDown">
            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 font-['Playfair_Display'] flex items-center justify-center gap-2 relative hover:text-shadow-lg transition-all duration-300 group cursor-help [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">
              <MdArticle className="transition-transform hover:scale-110 duration-300" />
              <span className="relative">
                LATEST BLOGS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 group-hover:w-full transition-all duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"></span>
              </span>
            </h2>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-10">
            {blogs
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 4)
              .map((blog, index) => (
                <div
                  key={blog._id || blog.id}
                  className="flex flex-col bg-white dark:bg-gray-800 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 ease-in-out animate-slideUp"
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
                    opacity: 0
                  }}
                >
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <Image
                      src={`/${blog.image}`}
                      width={500}
                      height={300}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 rounded-lg shadow-lg hover:shadow-xl"
                    />
                  </div>
                  <div className="p-4 sm:p-6 w-full lg:w-full">
                    <h3 className="text-lg sm:text-xl font-['Poppins'] font-bold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-['Roboto'] block text-gray-400 dark:text-gray-500 mt-2 capitalize italic font-mono">
                      {new Date(blog.date).toLocaleString()} | By {blog.author}
                    </span>
                    <p className="text-xs sm:text-sm font-['Open_Sans'] text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="w-full h-px bg-black dark:bg-gray-300 my-4 sm:my-5"></div>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/blogs/${blog._id}`}
                        className="group mt-3 sm:mt-4 inline-flex items-center gap-2 text-black dark:text-white font-['Montserrat'] font-bold text-xs sm:text-sm uppercase transform hover:translate-x-2 transition-transform duration-300 max-w-fit relative cursor-pointer"
                      >
                        <span className="after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                          READ MORE
                        </span>
                        <FaArrowUpRightFromSquare className="text-sm sm:text-base" />
                      </Link>

                      <span className="mt-3 sm:mt-4 hover:text-gray-600 hover:scale-110 transition duration-300 ease-in-out">
                        <Bookmark className="text-sm sm:text-base" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Blogs;