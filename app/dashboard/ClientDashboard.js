// app/dashboard/page.js
import React from "react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes") || "{}");
    const likedBlogIds = Object.keys(likes).filter(
      (blogId) => likes[blogId] > 0
    );
    setLikedBlogs(likedBlogIds);
  }, []);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarkedBlogs(bookmarks);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
        <h1 className="text-center text-xl font-bold p-4 text-gray-900 dark:text-gray-100 sm:text-2xl">
          User Dashboard
        </h1>
      </header>
      <main className="flex justify-center mt-2">
        <div className="w-full max-w-md px-4 sm:px-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th scope="col" className="px-4 py-2 text-center">
                    Liked Blogs
                    <ul>
                      {likedBlogs.map((blogId) => (
                        <li key={blogId}>
                          Blog Title or Content for ID: {blogId}
                        </li>
                      ))}
                    </ul>
                  </th>
                  <th scope="col" className="px-4 py-2 text-center">
                    Bookmarked Blogs
                    <ul>
                      {" "}
                      {bookmarkedBlogs.map((bookmark, index) => (
                        <li key={index}>
                          {" "}
                          <h2>{bookmark.title}</h2>{" "}
                          <a href={bookmark.url} className="text-blue-500">
                            {" "}
                            {bookmark.url}{" "}
                          </a>{" "}
                        </li>
                      ))}{" "}
                    </ul>
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
