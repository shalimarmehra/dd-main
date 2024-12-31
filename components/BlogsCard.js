"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosTrendingUp } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import SimpleDivider from "./SimpleDivider";
import axios from "axios";

const BlogsCard = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <div className="text-center mt-5" data-aos="fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200 relative inline-flex items-center gap-2 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          <IoIosTrendingUp />
          Top Trending Blogs
        </h2>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 transition-colors duration-200 font-sans p-3">
          Discover the latest trends and insights in our trending blog section.
          Stay updated with fresh, engaging content that keeps you ahead of the
          curve.
        </p>
      </div>
      <SimpleDivider type="gradient" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] md:w-[80%] mx-auto my-10">
        {blogs.slice(1, 3).map((blog) => (
          <Link
            href={`/blogs/${blog._id || blog.id}`}
            key={blog._id || blog.id}
            className="cursor-pointer group"
            data-aos="fade-up"
          >
            <div className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={`/${blog.image}`}
                  width={500}
                  height={300}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 rounded-lg shadow-lg hover:shadow-xl"
                />
                {/* Instagram-like gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Content overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-sm md:text-lg font-bold text-white mb-2 drop-shadow-lg">
                  {blog.title}
                  </h2>
                  <div className="flex items-center text-sm text-white/90">
                    <span className="flex items-center font-mono">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      &nbsp;By {blog.author}
                    </span>
                    <span className="mx-2">•</span>
                    <span
                    className="cursor-pointer border-b border-dashed border-white/50 hover:border-white transition-colors duration-300"
                    >
                    Read More
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsCard;
