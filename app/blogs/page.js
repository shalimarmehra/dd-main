/* eslint-disable no-unused-vars */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import BlogHero from "@/components/BlogHero";
import { SiLibreofficewriter } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { FaEye, FaLayerGroup } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import ScrollToTop from "@/components/ScrollToTop";
import NewsLetterCTA from "@/components/NewsLetterCTA";
import axios from "axios";

const Page = () => {
  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState(1);
  const { menu, setMenu } = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <ScrollToTop />
      <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold tracking-wide text-gray-900 dark:text-gray-100 font-['Playfair_Display'] flex items-center justify-center gap-2 relative hover:text-shadow-lg transition-all duration-300 group cursor-help [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] animate-fadeIn mb-10">
        <MdArticle className="animate-spin transition-transform hover:scale-110" />
        <span className="relative">
          BLOGS
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 group-hover:w-full transition-all duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"></span>
        </span>
      </h1>
      <BlogHero />

      {/* <div className="w-full lg:w-[90%] mx-auto lg:block transform hover:-translate-y-2 hover:scale-80 transition-all duration-300 ease-in-out mt-5 py-4">
        <div className="sticky top-4">
          <div className="bg-white dark:bg-black p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
            <h3 className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300 animate-fadeIn text-center uppercase font-poppins tracking-[0.1em] relative group">
              <FaLayerGroup className="text-xl" />
              <span className="relative">
                Select Category
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 dark:bg-gray-200 group-hover:w-full transition-all duration-300"></span>
              </span>
            </h3>
            <select className="w-full bg-white dark:bg-gray-700 border border-gray-500 dark:border-black rounded-md py-2 px-3 text-gray-600 dark:text-gray-400 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 animate-slideIn">
              <option onClick={() => setMenu("All")} value="">
                All Category
              </option>
              <option onClick={() => setMenu("Technology")} value="technology">
                Technology
              </option>
              <option onClick={() => setMenu("Design")} value="design">
                Design
              </option>
              <option onClick={() => setMenu("Business")} value="business">
                Business
              </option>
              <option onClick={() => setMenu("Lifestyle")} value="lifestyle">
                Lifestyle
              </option>
            </select>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8 transition-colors duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs
            ?.slice((currentPage - 1) * 6, currentPage * 6)
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
            .map((blog) => (
              <div
                key={blog._id || blog.id}
                className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
              >
                <div className="relative overflow-hidden">
                  <span className="absolute top-2 left-2 px-4 py-2 text-xs font-semibold rounded-full z-10 text-black bg-white dark:bg-black dark:text-white bg-opacity-70 dark:bg-opacity-70 transition-all duration-300">
                    {blog.category}
                  </span>
                  <Image
                    src={`/${blog.image}`}
                    width={500}
                    height={300}
                    alt={blog.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 hover:scale-110 rounded-lg shadow-lg hover:shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-30 transition-transform duration-300 hover:rotate-12" />
                </div>
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 transition-colors hover:text-gray-700 dark:hover:text-gray-300 line-clamp-2 cursor-se-resize">
                    {blog.title}
                  </h2>
                  <div className="flex flex-wrap items-center mb-3 text-xs sm:text-sm italic text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors justify-between">
                    <span className="flex items-center">
                      <SiLibreofficewriter className="mr-2" />
                      By {blog.author}
                    </span>
                    <span className="flex items-center font-mono">
                      <FaCalendarDays className="mr-2" />
                      {new Date(blog.date).toLocaleString()}
                    </span>
                  </div>
                  {/* <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 line-clamp-3 transition-colors hover:text-gray-800 dark:hover:text-gray-100 cursor-help">
            {blog.excerpt}
          </p> */}
                  <div className="h-px w-full bg-gray-500 my-6" />
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{blog.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark-blue-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                        <span>{blog.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                    <Link href={`/blogs/${blog._id}`}>
                      <button className="w-full sm:w-auto bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-100">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Pagination className="mt-8 cursor-pointer">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>

            {blogs &&
              Array.from({ length: Math.ceil(blogs.length / 6) }).map(
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => {
                        setCurrentPage(index + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setCurrentPage((prev) =>
                    Math.min(Math.ceil(blogs?.length / 6), prev + 1)
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${
                  currentPage >= Math.ceil(blogs?.length / 6)
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="w-full h-px bg-gray-300 opacity-50 my-5"></div>
      <NewsLetterCTA />
    </div>
  );
};

export default Page;
