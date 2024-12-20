/* eslint-disable no-unused-vars */
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Added Next Image import

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
      console.error('Error fetching blog data:', err); 
      setError(err.message || 'An unexpected error occurred');
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
        <div className="blog-post dark:text-white p-4 md:p-6 max-w-4xl mx-auto">
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
            <h4
              className="text-lg md:text-sm text-gray-600 dark:text-gray-400 mb-4"
              title="Short Description"
            >
              {data.description}
            </h4>
            <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 dark:text-gray-400 space-y-2 md:space-y-0 md:space-x-4">
              <p>{data.date}</p> &nbsp;&nbsp;&nbsp;•
              <p>by {data.author}</p>
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

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {data.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
