/* eslint-disable no-unused-vars */
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SimpleDivider from "@/components/SimpleDivider";
import { FaRegUserCircle } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: id,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching blog data:", err);
      setError(err.message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  return (
    <div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data && (
        <div className="blog-post dark:text-white p-5 md:p-6 max-w-4xl mx-auto">
          <div className="mb-4">
            <h3
              className="text-sm bg-opacity-15 font-bold bg-black text-gray-600 dark:text-gray-200 uppercase tracking-wider dark:bg-white dark:bg-opacity-30 inline-block px-2 py-1 rounded-lg"
              title="Category"
            >
              {data.category}
            </h3>
            <h1
              className="text-2xl md:text-4xl font-bold mt-2 mb-4"
              title="Title"
            >
              {data.title}
            </h1>
            <SimpleDivider type="dashed" />
            <h4
              className="text-base sm:text-lg md:text-sm lg:text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-full break-words"
              title="Short Description"
              dangerouslySetInnerHTML={{ __html: data.description }}
            >
              {/* {data.description} */}
            </h4>
          </div>

          <SimpleDivider type="dashed" />

          <div className="flex text-sm text-gray-500 dark:text-gray-400 w-full mb-2">
            <div className="flex items-center font-mono">
              <FaRegUserCircle className="mr-2" />
              <p className="break-words">{data.author}</p>
            </div>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <div className="flex items-center font-mono">
              <p className="break-words">
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </div>

          <div className="my-8">
            <Image
              src={`/${data.image}`}
              alt="Post Image"
              width={800}
              height={500}
              priority={true}
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>

          <SimpleDivider type="gradient" />

          <div className="prose dark:prose-invert max-w-none w-full">
            <p
              className="text-gray-800 dark:text-gray-200 leading-relaxed text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>

          <SimpleDivider type="gradient" />
          <div className="flex justify-center gap-5">
            <div>
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <Bookmark className="w-6 h-6" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Share2 />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Share to:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      window.location.href
                    )}&title=${encodeURIComponent(data?.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-1.5 md:p-2 rounded-xl text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 hover:-rotate-6 group backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-blue-500/20 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Linked In
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(data?.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-1.5 md:p-2 rounded-xl text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 hover:rotate-6 group backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-gray-500/20 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-spin mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.117z" />
                    </svg>
                    X (Twitter)
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      data?.title + " " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-1.5 md:p-2 rounded-xl text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-110 hover:rotate-6 group backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-green-500/20 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.16 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.181-1.238-6.167-3.487-8.415z" />
                    </svg>
                    Whatsapp
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-1.5 md:p-2 rounded-xl text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 hover:rotate-6 group backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-blue-500/20 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
